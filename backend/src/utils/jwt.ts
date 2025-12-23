import "dotenv/config";
import jwt, { SignOptions, JwtPayload as JwtLibPayload } from "jsonwebtoken";

export interface AppJwtPayload {
  userId: string;
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
  const decoded = jwt.verify(token, SECRET) as JwtLibPayload;

  return {
    userId: decoded.userId as string,
    email: decoded.email as string | undefined,
  };
}
