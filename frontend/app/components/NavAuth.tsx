"use client";
import { useAuthStore } from "@/lib/providers/auth-provider";
import Link from "next/link";

export function NavAuth() {
  const { isAuthenticated, user, logout, clearUser } = useAuthStore(
    (state) => ({
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      logout: state.logout,
      clearUser: state.clearUser,
    }),
  );

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
        clearUser();
        window.location.href = "/";
      } else {
        console.error("Logout failed:", response.status);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="flex items-center gap-4">
      {isAuthenticated && user ? (
        <div className="flex items-center gap-4">
          <span className="text-sm opacity-70 hidden sm:block">
            Logged in as {user.name || user.email}
          </span>
          <button
            onClick={handleLogout}
            className="bg-yellow-400 text-black px-4 py-1 rounded-sm text-sm font-bold border-2 border-yellow-400 hover:bg-black hover:text-yellow-400 transition-all"
          >
            LOGOUT
          </button>
        </div>
      ) : (
        <Link href="/">
          <button className="bg-yellow-400 text-black px-4 py-1 rounded-sm text-sm font-bold border-2 border-yellow-400 hover:bg-black hover:text-yellow-400 transition-all">
            LOGIN
          </button>
        </Link>
      )}
    </div>
  );
}
