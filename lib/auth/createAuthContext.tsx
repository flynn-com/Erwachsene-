"use client";

import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";
import { MockUser } from "./types";

type AuthContextValue = {
  user: MockUser | null;
  isLoaded: boolean;
  login: (user: MockUser) => void;
  logout: () => void;
};

export function createAuthContext(storageKey: string) {
  const AuthContext = createContext<AuthContextValue | null>(null);

  function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<MockUser | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
      // Hydrates client-only session state from localStorage on mount.
      try {
        const raw = window.localStorage.getItem(storageKey);
        if (raw) setUser(JSON.parse(raw));
      } catch {
        // ignore – private mode / storage unavailable
      }
      setIsLoaded(true);
    }, []);

    const login = useCallback((nextUser: MockUser) => {
      setUser(nextUser);
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(nextUser));
      } catch {
        // ignore
      }
    }, []);

    const logout = useCallback(() => {
      setUser(null);
      try {
        window.localStorage.removeItem(storageKey);
      } catch {
        // ignore
      }
    }, []);

    return <AuthContext.Provider value={{ user, isLoaded, login, logout }}>{children}</AuthContext.Provider>;
  }

  function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
      throw new Error("useAuth must be used within its matching AuthProvider");
    }
    return ctx;
  }

  return { AuthProvider, useAuth };
}
