// File: lib/hooks/useAuth.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient'; // Importar cliente Supabase
import { User as AppUser } from '@/lib/auth/helpers'; // Importar nuestra interfaz User frontend
import type { Session, User as SupabaseUser } from '@supabase/supabase-js'; // Tipos de Supabase

interface AuthContextType {
  user: AppUser | null; // Nuestra interfaz User
  session: Session | null; // La sesión completa de Supabase
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

// Helper para mapear SupabaseUser a nuestra AppUser
const mapSupabaseUserToAppUser = (supabaseUser: SupabaseUser | null | undefined): AppUser | null => {
    if (!supabaseUser) return null;

    // Extraer companyId y roles de app_metadata (¡Ajusta las claves si son diferentes!)
    const companyIdRaw = supabaseUser.app_metadata?.company_id;
    const companyId = companyIdRaw ? String(companyIdRaw) : undefined;
    const roles = supabaseUser.app_metadata?.roles as string[] | undefined;

    // Validar que companyId exista si es obligatorio para tu app
    if (!companyId) {
        console.warn("Supabase user is missing 'company_id' in app_metadata.", supabaseUser.app_metadata);
        // Decide cómo manejar esto: ¿permitir usuario sin companyId o considerarlo inválido?
        // return null; // Ejemplo: considerar inválido si companyId es mandatorio
    }

    return {
        userId: supabaseUser.id,
        email: supabaseUser.email,
        name: supabaseUser.user_metadata?.full_name || supabaseUser.user_metadata?.name, // Intentar con full_name o name
        companyId: companyId, // Usar el companyId extraído
        roles: roles,
    };
};


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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