"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

type AuthResult = {
  decoded: jwt.JwtPayload | null;
  isAuthenticated: boolean;
};

export async function isAuth() {
  const cookieStore = cookies();

  const accessToken = (await cookieStore).get("access_token")?.value;
  const userType = (await cookieStore).get("user_type")?.value;

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
  return (await cookieStore).get("user_type")?.value ?? null;
}

// export async function deleteCookies(){}

/**
 * Check if user is authenticated and fetch user data (client-side)
 * @returns User object if authenticated, null otherwise
 */
export async function checkAuth(): Promise<any | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/api/auth/me`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    if (response.ok) {
      const data = await response.json();
      if (data.success && data.user) {
        return data.user;
      }
    }
    return null;
  } catch (error) {
    console.error("Error checking auth:", error);
    return null;
  }
}
