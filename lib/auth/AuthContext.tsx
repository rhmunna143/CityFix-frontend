"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { getRoleHome } from "@/lib/auth/roles";
import type { Role, User } from "@/types/api";

export interface AuthState {
  user: User | null;
  role: Role | null;
  isLoading: boolean;
}

export interface AuthActions {
  login: (credentials: { email: string; password: string }) => Promise<void>;
  googleLogin: (idToken: string) => Promise<void>;
  demoLogin: (role: Role) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

const StateContext = createContext<AuthState | undefined>(undefined);
const ActionsContext = createContext<AuthActions | undefined>(undefined);

async function postAuth(url: string, body: unknown): Promise<User> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message ?? "Authentication failed");
  return json.data.user as User;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch("/api/proxy/users/me");
      if (res.ok) {
        const json = await res.json();
        setUser(json.data as User);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchUser();
  }, [fetchUser]);

  const redirectAfterAuth = useCallback(
    (role: Role) => {
      const next = typeof window !== "undefined"
        ? new URLSearchParams(window.location.search).get("next")
        : null;
      // only same-origin relative paths (prevents open redirect)
      const safeNext = next && next.startsWith("/") && !next.startsWith("//") ? next : null;
      router.push(safeNext ?? getRoleHome(role));
    },
    [router]
  );

  const authenticate = useCallback(
    async (url: string, body: unknown) => {
      const u = await postAuth(url, body);
      await fetchUser();
      redirectAfterAuth(u.role);
    },
    [fetchUser, redirectAfterAuth]
  );

  const actions = useMemo<AuthActions>(
    () => ({
      fetchUser,
      login: (credentials) => authenticate("/api/auth/login", credentials),
      googleLogin: (idToken) => authenticate("/api/auth/google", { idToken }),
      demoLogin: (role) => authenticate("/api/auth/demo", { role }),
      logout: async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        setUser(null);
        router.push("/login");
      },
    }),
    [authenticate, fetchUser, router]
  );

  const state = useMemo<AuthState>(
    () => ({
      user,
      role: user?.role ?? null,
      isLoading,
    }),
    [user, isLoading]
  );

  return (
    <ActionsContext.Provider value={actions}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </ActionsContext.Provider>
  );
}

export function useAuthState(): AuthState {
  const ctx = useContext(StateContext);
  if (!ctx) throw new Error("useAuthState must be used within AuthProvider");
  return ctx;
}

export function useAuthActions(): AuthActions {
  const ctx = useContext(ActionsContext);
  if (!ctx) throw new Error("useAuthActions must be used within AuthProvider");
  return ctx;
}

/** Back-compat for existing call sites; prefer the narrow hooks. */
export const useAuth = () => {
  const state = useAuthState();
  const actions = useAuthActions();
  return { ...state, ...actions };
};
