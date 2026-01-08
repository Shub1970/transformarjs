import "dotenv/config";
import jwt, { SignOptions, JwtPayload as JwtLibPayload } from "jsonwebtoken";

export interface AppJwtPayload {
  userId: number;
  email?: string;
}

export function createJWT(
  payload: AppJwtPayload,
  expiresIn?: string | "1h",
  options?: SignOptions,
): string {
  const SECRET = process.env.SECRET;
  if (!SECRET) {
    throw new Error("SECRET environment variable is not set");
  }
  return jwt.sign(payload, SECRET, {
    expiresIn,
    algorithm: "HS256",
    ...options,
  });
}

export function verifyJWT(token: string): AppJwtPayload {
  const SECRET = process.env.SECRET;
  if (!SECRET) {
    throw new Error("SECRET environment variable is not set");
  }
  const decoded = jwt.verify(token, SECRET);

  return decoded as AppJwtPayload;
}
