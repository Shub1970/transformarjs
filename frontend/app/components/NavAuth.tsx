"use client";
import { useAuthStore } from "@/lib/providers/auth-provider";
import Link from "next/link";

export function NavAuth() {
  const { isAuthenticated, logout, user } = useAuthStore((state) => state);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      if (response.ok) {
        logout();
        window.location.href = "/";
      } else {
        console.error("Logout failed:", response.status);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  if (!isAuthenticated || !user) {
    return "";
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-4">
        <span className="text-sm opacity-70 hidden sm:block">
          Logged in as {user.name ?? "Guest"}
        </span>
        <button
          onClick={handleLogout}
          className="bg-yellow-400 text-black px-4 py-1 rounded-sm text-sm font-bold border-2 border-yellow-400 hover:bg-black hover:text-yellow-400 transition-all"
        >
          LOGOUT
        </button>
      </div>
    </div>
  );
}
