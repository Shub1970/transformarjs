//guest button
"use client";
import { useAuthStore } from "@/lib/providers/auth-provider";
export default function GuestButton() {
  const login = useAuthStore((state) => state.login);
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/auth/guest-login`,
        {
          method: "post",
          credentials: "include",
        },
      );
      if (!response.ok) {
        const error = response.text();
        console.error("an error occur on login", error);
        throw new Error("Error occur while login");
      }
    } catch (error) {
      console.error("an error occur on login");
      throw new Error("Error occur while login");
    }
    login();
  };
  return (
    <button
      onClick={handleClick}
      className="bg-black text-yellow-400 px-8 py-4 text-xl font-bold hover:scale-105 transition-transform"
    >
      TRY AS GUEST
    </button>
  );
}
