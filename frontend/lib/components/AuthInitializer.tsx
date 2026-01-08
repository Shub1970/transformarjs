"use client";

import { useEffect } from "react";
import { useAuthStore } from "../providers/auth-provider";
import { checkAuth } from "../isAuth";

export function AuthInitializer() {
  const { login, setUser } = useAuthStore((state) => ({
    login: state.login,
    setUser: state.setUser,
  }));

  useEffect(() => {
    const initializeAuth = async () => {
      const user = await checkAuth();
      if (user) {
        login();
        setUser(user);
      }
    };

    initializeAuth();
  }, [login, setUser]);

  return null;
}
