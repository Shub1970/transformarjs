import "dotenv/config";
import jwt, { SignOptions } from "jsonwebtoken";

export interface JwtPayload {
  userId: string;
  email?: string;
}

export function createJWT(
  payload: JwtPayload,
  expiresIn: string,
  options?: SignOptions,
): string {
  const secret = process.env.SECRET;

  if (!secret) {
    throw new Error("SECRET environment variable is not set");
  }

  return jwt.sign(payload, secret, {
    expiresIn,
    algorithm: "HS256",
    ...options,
  } as any);
}
