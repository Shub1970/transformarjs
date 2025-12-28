"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

type AuthResult = {
  decoded: jwt.JwtPayload | null;
  isAuthenticated: boolean;
};

export async function isAuth() {
  const cookieStore = cookies();

  const accessToken = cookieStore.get("access_token")?.value;
  const userType = cookieStore.get("user_type")?.value;

  if (!accessToken || !userType) {
    return { decoded: null, isAuthenticated: false };
  }

  try {
    const decoded = jwt.verify(
      accessToken,
      process.env.GUEST_SECRET as string, // 🔒 server-only
    ) as jwt.JwtPayload;

    return { decoded, isAuthenticated: true };
  } catch {
    return { decoded: null, isAuthenticated: false };
  }
}

export async function getUserType() {
  const cookieStore = cookies();
  return cookieStore.get("user_type")?.value ?? null;
}

// export async function deleteCookies(){}
