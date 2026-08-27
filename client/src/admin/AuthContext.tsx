/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { authApi, type AdminUser } from "@/lib/api";

interface AuthState {
  admin: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

async function checkAuth(): Promise<AdminUser | null> {
  const token = localStorage.getItem("admin_token");
  if (!token) return null;
  try {
    const { admin } = await authApi.me();
    return admin;
  } catch {
    localStorage.removeItem("admin_token");
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    checkAuth().then((admin) => {
      if (!cancelled) {
        setAdmin(admin);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, []);

  const login = async (email: string, password: string) => {
    const { token, admin } = await authApi.login(email, password);
    localStorage.setItem("admin_token", token);
    setAdmin(admin);
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AuthProvider");
  return ctx;
}
