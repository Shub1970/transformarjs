//guest button
"use client";
import { useAuthStore } from "@/lib/providers/auth-provider";
export default function GuestButton() {
  const login = useAuthStore((state) => state.login);

  return (
    <button
      onClick={() =>
        (window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_API}/api/auth/guest-login`)
      }
      className="bg-black text-yellow-400 px-8 py-4 text-xl font-bold hover:scale-105 transition-transform"
    >
      <p>Explore as Guest</p>
    </button>
  );
}
