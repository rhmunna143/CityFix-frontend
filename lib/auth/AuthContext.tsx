"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User, Role } from "@/types/api";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
  user: User | null;
  role: Role | null;
  isLoading: boolean;
  login: (credentials: any) => Promise<void>;
  demoLogin: (role: Role) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/proxy/users/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data.data);
        setRole(data.data.role);
      } else {
        setUser(null);
        setRole(null);
      }
    } catch (error) {
      setUser(null);
      setRole(null);
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleHome = (r: string) => {
    if (r === "ADMIN" || r === "SUPER_ADMIN") return "/admin";
    if (r === "STAFF") return "/staff";
    return "/dashboard";
  };

  const demoLogin = async (selectedRole: Role) => {
    const res = await fetch("/api/auth/demo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: selectedRole }),
    });
    const data = await res.json();
    if (res.ok) {
      await fetchUser();
      const searchParams = new URLSearchParams(window.location.search);
      const next = searchParams.get("next");
      router.push(next || getRoleHome(data.data.user.role));
    } else {
      throw new Error(data.message || "Demo login failed");
    }
  };

  const login = async (credentials: any) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    if (res.ok) {
      await fetchUser();
      const searchParams = new URLSearchParams(window.location.search);
      const next = searchParams.get("next");
      router.push(next || getRoleHome(data.data.user.role));
    } else {
      throw new Error(data.message || "Login failed");
    }
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setRole(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, role, isLoading, login, demoLogin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
