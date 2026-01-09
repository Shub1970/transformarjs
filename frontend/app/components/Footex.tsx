"use client";

import { useAuthStore } from "@/lib/providers/auth-provider";
import { useEffect } from "react";

export default function Footer() {
  const { isAuthenticated, user } = useAuthStore((state) => state);
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-black text-white p-2 text-center text-sm z-50">
      {isAuthenticated && user?.userType === "guest" && (
        <span className="opacity-70">
          {`Guest Mode : ${user.usageCount} / 5 transformations credit.`}
        </span>
      )}
      {isAuthenticated && user?.userType == "authenticated" && (
        <span className="opacity-70">
          {`Authenticate Mode : ${user.usageCount} / ∞ transformations credit.`}
        </span>
      )}
    </footer>
  );
}
