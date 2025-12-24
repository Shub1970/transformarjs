import "dotenv/config";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import prisma from "../utils/connect";
import { GuestSessionCreateInput } from "../../prisma/generated/models";

export async function createGuestSession(req: Request, res: Response) {
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

    const secrete = process.env.SECRETE;
    if (!secrete) {
      throw new Error("secrete not accessible");
    }

    const access_token = jwt.sign(
      {
        userId: response.id,
        sessionId: response.sessionId,
        type: "guest",
      },
      secrete,
      { expiresIn: "1h" },
    );

    res.cookie("access_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });

    res.cookie("user_type", "guest", {
      httpOnly: true,
      secure: process.env.NODE === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });

    res.json({
      success: true,
      message: "guest is created",
    });
  } catch (err) {
    res.send(401).json({
      success: false,
      error: err,
      message: "guest not created",
    });
  }
}
