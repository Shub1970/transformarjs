"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/providers/auth-provider";

export default function AuthSuccessPage() {
  const router = useRouter();

  const { setUser } = useAuthStore((state) => state);

  // 🔒 guard to ensure one-time execution

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/api/auth/me`,
          { credentials: "include" },
        );

        if (!response.ok) {
          router.push("/?error=auth_failed");
          return;
        }

        const data = await response.json();
        console.log("user data", data);

        if (!data?.success || !data?.user) {
          router.push("/?error=auth_failed");
          return;
        }

        setUser(data.user);
        router.push("/models");
      } catch {
        router.push("/?error=auth_failed");
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        <p className="mt-4 text-xl font-bold">Completing authentication...</p>
      </div>
    </div>
  );
}
