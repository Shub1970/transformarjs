import { SigningOptions } from "crypto";
import "dotenv/config";
import jwt from "jsonwebtoken";

type data = { userId: string; email?: string };
export function createJWT(data: data, expiresIn: string): string {
  const secret = process.env.SECRET;
  if (!secret) {
    throw new Error("SECRET environment variable is not set");
  }
  return jwt.sign(data, secret, { expiresIn: expiresIn, algorithm: "HS256" });
}

