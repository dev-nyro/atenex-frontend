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
  signIn: (credentials: { email: string; password: string }) => Promise<void>; // Cambiado de 'login'
  signOut: () => Promise<void>; // Cambiado de 'logout'
  // Podrías añadir otras funciones como signUp si las necesitas centralizadas aquí
}

const defaultAuthContextValue: AuthContextType = {
    user: null,
    session: null,
    isLoading: true,
    signIn: async () => { console.error("signIn function called outside of AuthProvider context"); },
    signOut: async () => { console.error("signOut function called outside of AuthProvider context"); },
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

  // NEW: Check if we should bypass auth based on env variable
  const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';

  useEffect(() => {
    if (bypassAuth) {
      console.warn("AuthProvider: Bypassing authentication checks.");
      setIsLoading(false);
      // Podrías establecer un usuario/sesión dummy si es necesario para desarrollo
      // setUser({ userId: 'bypass-user', email: 'bypass@example.com', companyId: 'bypass-company' });
      // setSession({} as Session); // Dummy session
      return; // No suscribirse a cambios de auth
    }

    // Obtener sesión inicial
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      console.log("AuthProvider: Initial session fetch complete.", initialSession);
      setSession(initialSession);
      setUser(mapSupabaseUserToAppUser(initialSession?.user));
      setIsLoading(false); // Terminar carga inicial después de obtener la sesión
    }).catch(error => {
       console.error("AuthProvider: Error fetching initial session:", error);
       setIsLoading(false); // Terminar carga incluso si hay error
    });

    // Escuchar cambios en el estado de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      console.log(`AuthProvider: Auth state changed. Event: ${_event}`, newSession);
      setSession(newSession);
      setUser(mapSupabaseUserToAppUser(newSession?.user));
       // Ya no necesitamos isLoading aquí porque la carga inicial ya se hizo
       // setIsLoading(false); // <-- Quitar esto de aquí
    });

    // Limpiar suscripción al desmontar
    return () => {
      subscription?.unsubscribe();
    };
  }, [bypassAuth]); // Ejecutar solo una vez o si cambia bypassAuth

  const signIn = useCallback(async (credentials: { email: string; password: string }) => {
    setIsLoading(true); // Indicar carga durante el inicio de sesión
    try {
      const { error } = await supabase.auth.signInWithPassword(credentials);
      if (error) throw error;
      // onAuthStateChange actualizará el estado user/session automáticamente
      console.log("SignIn successful, waiting for auth state change...");
      router.push('/'); // Redirigir a la página principal tras login exitoso
    } catch (error: any) {
      console.error("Error during signIn:", error);
      // Lanzar el error para que el formulario lo capture
      throw new ApiError(error.message || "Sign in failed", error.status || 500);
    } finally {
        // No establecer isLoading(false) aquí, onAuthStateChange lo hará indirectamente
        // setIsLoading(false);
    }
  }, [router]);

  const signOut = useCallback(async () => {
    setIsLoading(true);
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        // onAuthStateChange actualizará user/session a null
        console.log("SignOut successful, waiting for auth state change...");
        router.push('/login'); // Redirigir a login tras cerrar sesión
    } catch (error: any) {
        console.error("Error during signOut:", error);
        // Mostrar error al usuario si es necesario
        // toast.error("Logout failed", { description: error.message });
    } finally {
        // setIsLoading(false); // onAuthStateChange se encargará
    }
  }, [router]);

  const providerValue = {
      user,
      session, // Exponer la sesión completa de Supabase
      isLoading: isLoading && !bypassAuth, // Solo estar cargando si no estamos en modo bypass
      signIn,
      signOut
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};