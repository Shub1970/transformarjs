import { createStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";

export type User = {
  id?: number;
  email?: string;
  name?: string;
  profilePicture?: string;
  userType: "guest" | "authenticated";
  usageCount?: number;
  sessionId?: string;
};

export type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
};

export type AuthAction = {
  login: () => void;
  logout: () => void;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  incrementUserCount: () => void;
};

export type AuthStore = AuthState & AuthAction;

const defautState: AuthState = {
  isAuthenticated: false,
  user: null,
};

export const createAuthStore = (initialState: AuthState = defautState) => {
  return createStore<AuthStore>()(
    persist(
      (set) => ({
        ...initialState,
        login: () =>
          set((state) => ({ isAuthenticated: true, user: state.user })),
        logout: () => set((state) => ({ isAuthenticated: false, user: null })),
        setUser: (user: User | null) =>
          set((state) => ({ user: user, isAuthenticated: true })),
        clearUser: () => set(() => ({ user: null, isAuthenticated: false })),
        incrementUserCount: () =>
          set((state) => {
            if (!state.user) return state;
            return {
              user: {
                ...state.user,
                usageCount: state!.user!.usageCount! + 1,
              },
            };
          }),
      }),
      {
        name: "auth-storage",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  );
};
