import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: number;
  email?: string;
  sessionId?: string;
  type: "guest" | "authenticated";
}

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export async function authMiddlewar(
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
        message: "Authentication required",
      });
    }

    // Verify token based on user type
    let decoded: JwtPayload;

    if (user_type === "guest") {
      const guestSecret = process.env.GUEST_SECRETE;
      if (!guestSecret) {
        return res.status(500).json({
          success: false,
          message: "Server configuration error",
        });
      }
      decoded = jwt.verify(access_token, guestSecret) as JwtPayload;
    } else if (user_type === "authenticated") {
      const userSecret = process.env.USER_SECRET;
      if (!userSecret) {
        return res.status(500).json({
          success: false,
          message: "Server configuration error",
        });
      }
      decoded = jwt.verify(access_token, userSecret) as JwtPayload;
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid user type",
      });
    }

    // Attach user to request
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
