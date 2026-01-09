"use client";

import { type ReactNode, useState, createContext, useContext, useEffect } from "react";
import { useStore } from "zustand";
import { type AuthStore, createAuthStore } from "../stores/auth-store";

export type AuthStoreApi = ReturnType<typeof createAuthStore>;

export const AuthStoreContext = createContext<AuthStoreApi | undefined>(
  undefined,
);
type AuthStoreContextPops = {
  children: ReactNode;
};

export function AuthStoreProvider({ children }: AuthStoreContextPops) {
  const [store] = useState(() => createAuthStore());
  const [isHydrated, setIsHydrated] = useState(false);

  // Handle hydration from localStorage
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <AuthStoreContext.Provider value={store}>
      {isHydrated ? children : null}
    </AuthStoreContext.Provider>
  );
}

export function useAuthStore<T>(selector: (store: AuthStore) => T): T {
  const authStoreContext = useContext(AuthStoreContext);

  if (!authStoreContext) {
    throw new Error("useAuthStore must be used inside AuthStoreProvider");
  }

  return useStore(authStoreContext, selector);
}
