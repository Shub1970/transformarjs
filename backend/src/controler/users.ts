import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import prisma from "../utils/connect";
import { getTime } from "../utils/times";
import { GuestSessionCreateInput } from "../../prisma/generated/models";

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
