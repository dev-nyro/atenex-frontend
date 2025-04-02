// File: lib/hooks/useAuth.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getToken, setToken, removeToken, getUserFromToken, User } from '@/lib/auth/helpers';
import { useRouter } from 'next/navigation'; // Use next/navigation for App Router

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  signIn: (session: any) => void; // Tipo 'any' para la session, adáptalo si tienes un tipo específico
  login: (token: string) => void;
  logout: () => void;
}

const defaultAuthContextValue: AuthContextType = {
    user: null,
    token: null,
    isLoading: true, // Empezar como cargando por defecto si se usa fuera del provider
    signIn: (session: any) => {
        console.error("signIn function called outside of AuthProvider context");
    },
    login: (token: string) => {
        console.error("Login function called outside of AuthProvider context");
    },
    logout: () => {
        console.error("Logout function called outside of AuthProvider context");
    },
};

const AuthContext = createContext<AuthContextType>(defaultAuthContextValue);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setAuthStateToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start loading until token is checked
  const router = useRouter();

  useEffect(() => {
    const storedToken = getToken();
    if (storedToken) {
      const userData = getUserFromToken(storedToken);
      if (userData) {
        setUser(userData);
        setAuthStateToken(storedToken);
      } else {
        removeToken();
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((newToken: string) => {
    setToken(newToken);
    const userData = getUserFromToken(newToken);
    setUser(userData);
    setAuthStateToken(newToken);
    router.push('/');
    console.log("User logged in, token set.");
  }, [router]);

  const signIn = useCallback((session: any) => {
    const newToken = session.access_token;
    setToken(newToken);
    const userData = getUserFromToken(newToken);
    setUser(userData);
    setAuthStateToken(newToken);
    router.push('/');
    console.log("User signed in (via setSession), token set.");
  }, [router]);

  const logout = useCallback(() => {
    removeToken();
    setUser(null);
    setAuthStateToken(null);
    router.push('/login');
    console.log("User logged out.");
  }, [router]);

  const providerValue = {
      user,
      token,
      isLoading,
      signIn,
      login,
      logout
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined || context === defaultAuthContextValue) {
    if (context === defaultAuthContextValue && typeof window !== 'undefined') {
       console.warn("useAuth might be used outside of its Provider or hasn't initialized yet.");
    } else if (context === undefined) {
       throw new Error('useAuth must be used within an AuthProvider');
    }
  }
  return context;
};