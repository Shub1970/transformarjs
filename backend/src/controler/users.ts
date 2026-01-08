import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import prisma from "../utils/connect";
import { getTime } from "../utils/times";
import { GuestSessionCreateInput } from "../../prisma/generated/models";
import {
  getGoogleAuthURL,
  getGoogleTokens,
  getGoogleUserInfo,
} from "../utils/googleOAuth";

export async function createGuestSession(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const ip_address = req?.ip || "";
  const user_agent = req.headers["user-agent"] || "";
  const unique_id = uuidv4();
  const guest: GuestSessionCreateInput = {
    ipAddress: ip_address,
    userAgent: user_agent,
    sessionId: unique_id,
  };

  try {
    const response = await prisma.guestSession.create({
      data: guest,
    });

    const secrete = process.env.GUEST_SECRETE;
    const expirein = process.env.GUEST_ACCESS_TOKEN_EXPIRE || "1h";
    const maxAge = getTime(expirein);
    if (!secrete) {
      const error = new Error("secrete key now found");
      error.status = 400;
      error.message = "secrete not fetch";
      error.details = { reason: "secrete not fetch", fiels: "" };
      next(error);
    }

    const access_token = jwt.sign(
      {
        userId: response.id,
        sessionId: response.sessionId,
        type: "guest",
      },
      secrete,
      { expiresIn: expirein },
    );

    res.cookie("access_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE === "production",
      sameSite: "lax",
      maxAge: maxAge,
    });

    res.cookie("user_type", "guest", {
      httpOnly: true,
      secure: process.env.NODE === "production",
      sameSite: "lax",
      maxAge: maxAge,
    });

    res.json({
      success: true,
      message: "guest is created",
    });
  } catch (err) {
    next(err);
  }
}

// Google OAuth: Initiate authentication
export async function googleAuthInit(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const authUrl = getGoogleAuthURL();
    res.redirect(authUrl);
  } catch (err) {
    console.error("Error initiating Google auth:", err);
    next(err);
  }
}

// Google OAuth: Handle callback
export async function googleAuthCallback(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const code = req.query.code as string;

  if (!code) {
    console.error("No authorization code received from Google");
    return res.redirect(`${process.env.FRONTEND_URL}?error=no_code`);
  }

  try {
    // Exchange code for tokens
    const tokens = await getGoogleTokens(code);

    // Get user info from Google
    const googleUser = await getGoogleUserInfo(tokens.access_token);

    // Find or create user in database
    const user = await prisma.user.upsert({
      where: { googleId: googleUser.id },
      update: {
        email: googleUser.email,
        name: googleUser.name,
        profilePicture: googleUser.picture,
      },
      create: {
        googleId: googleUser.id,
        email: googleUser.email,
        name: googleUser.name,
        profilePicture: googleUser.picture,
        userType: "AUTHENTICATED",
      },
    });

    // Generate JWT token
    const userSecret = process.env.USER_SECRET;
    const expireIn = process.env.USER_ACCESS_TOKEN_EXPIRE || "7d";
    const maxAge = getTime(expireIn);

    if (!userSecret) {
      const error = new Error("User secret key not found");
      error.status = 500;
      error.message = "Authentication configuration error";
      return next(error);
    }

    const access_token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        type: "authenticated",
      },
      userSecret,
      { expiresIn: expireIn },
    );

    // Set cookies
    res.cookie("access_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: maxAge,
    });

    res.cookie("user_type", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: maxAge,
    });

    // Redirect to frontend success page
    res.redirect(`${process.env.FRONTEND_URL}/auth/success`);
  } catch (err) {
    console.error("Error during Google OAuth callback:", err);
    res.redirect(`${process.env.FRONTEND_URL}?error=auth_failed`);
  }
}

// Get current authenticated user info
export async function getCurrentUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const access_token = req.cookies.access_token;
    const user_type = req.cookies.user_type;

    if (!access_token) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    // Verify token based on user type
    let decoded: any;
    if (user_type === "guest") {
      const guestSecret = process.env.GUEST_SECRETE;
      if (!guestSecret) {
        return res.status(500).json({
          success: false,
          message: "Server configuration error",
        });
      }
      decoded = jwt.verify(access_token, guestSecret);

      // Fetch guest session
      const guestSession = await prisma.guestSession.findUnique({
        where: { id: decoded.userId },
      });

      if (!guestSession) {
        return res.status(404).json({
          success: false,
          message: "Guest session not found",
        });
      }

      return res.json({
        success: true,
        user: {
          id: guestSession.id,
          userType: "guest",
          usageCount: guestSession.usageCount,
          sessionId: guestSession.sessionId,
        },
      });
    } else if (user_type === "authenticated") {
      const userSecret = process.env.USER_SECRET;
      if (!userSecret) {
        return res.status(500).json({
          success: false,
          message: "Server configuration error",
        });
      }
      decoded = jwt.verify(access_token, userSecret);

      // Fetch user from database
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      return res.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          profilePicture: user.profilePicture,
          userType: "authenticated",
        },
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid user type",
      });
    }
  } catch (err) {
    console.error("Error getting current user:", err);
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
    next(err);
  }
}

// Logout user
export async function logout(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    // Clear cookies
    res.clearCookie("access_token");
    res.clearCookie("user_type");

    res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    console.error("Error during logout:", err);
    next(err);
  }
}
