"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/providers/auth-provider";

export default function AuthSuccessPage() {
  const router = useRouter();
  const { login, setUser } = useAuthStore((state) => ({
    login: state.login,
    setUser: state.setUser,
  }));

  useEffect(() => {
    const fetchUserData = async () => {
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
            // Update auth store
            login();
            setUser(data.user);

            // Redirect to models page
            router.push("/models");
          } else {
            console.error("Failed to fetch user data:", data);
            router.push("/?error=auth_failed");
          }
        } else {
          console.error("Failed to fetch user data:", response.status);
          router.push("/?error=auth_failed");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        router.push("/?error=auth_failed");
      }
    };

    fetchUserData();
  }, [login, setUser, router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        <p className="mt-4 text-xl font-bold">Completing authentication...</p>
      </div>
    </div>
  );
}
