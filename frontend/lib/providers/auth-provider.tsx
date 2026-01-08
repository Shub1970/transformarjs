"use client";

import { type ReactNode, useState, createContext, useContext } from "react";
import { useStore } from "zustand";
import { type AuthStore, createAuthStore } from "../stores/auth-store";

export type AuthStoreApi = ReturnType<typeof createAuthStore>;

export const AuthStoreContext = createContext<AuthStoreApi | undefined>(
  undefined,
);

export function AuthStoreProvider({ children }: { children: ReactNode }) {
  const [store] = useState(() => createAuthStore());

  return (
    <AuthStoreContext.Provider value={store}>
      {children}
    </AuthStoreContext.Provider>
  );
}

export function useAuthStore<T>(selector: (store: AuthStore) => T): T {
  const store = useContext(AuthStoreContext);

  if (!store) {
    throw new Error("useAuthStore must be used inside AuthStoreProvider");
  }

  return useStore(store, selector);
}
