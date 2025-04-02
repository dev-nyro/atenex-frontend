// File: lib/hooks/useAuth.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation'; // Import usePathname
import { supabase } from '@/lib/supabaseClient';
import { User as AppUser } from '@/lib/auth/helpers'; // Nuestra interfaz User frontend
import type { Session, User as SupabaseUser, AuthError, SignInWithPasswordCredentials, SignUpOptions } from '@supabase/supabase-js'; // Tipos de Supabase
import { toast } from "sonner"; // Para notificaciones
import { ensureCompanyAssociation, ApiError as EnsureCompanyApiError } from '@/lib/api'; // Renombrar ApiError para evitar colisión

// --- Interfaz del Contexto de Autenticación ---
interface AuthContextType {
  user: AppUser | null;         // El usuario mapeado de nuestra aplicación
  session: Session | null;      // La sesión completa de Supabase
  isLoading: boolean;         // Indica si la sesión inicial se está cargando
  signInWithPassword: (credentials: SignInWithPasswordCredentials) => Promise<void>;
  signUp: (options: SignUpOptions) => Promise<{ data: { user: SupabaseUser | null; session: Session | null; }; error: AuthError | null; }>;
  signOut: () => Promise<void>;
}

// --- Valor por defecto para el contexto ---
const defaultAuthContextValue: AuthContextType = {
  user: null,
  session: null,
  isLoading: true, // Empieza cargando
  signInWithPassword: async () => { console.error("signInWithPassword called outside of AuthProvider"); throw new Error("Not initialized"); },
  signUp: async () => { console.error("signUp called outside of AuthProvider"); return { data: { user: null, session: null }, error: new Error("Not initialized") as AuthError }; },
  signOut: async () => { console.error("signOut called outside of AuthProvider"); },
};

// --- Creación del Contexto ---
const AuthContext = createContext<AuthContextType>(defaultAuthContextValue);

// --- Props del Provider ---
interface AuthProviderProps {
  children: React.ReactNode;
}

// --- Helper para mapear SupabaseUser a nuestra AppUser ---
const mapSupabaseUserToAppUser = (supabaseUser: SupabaseUser | null | undefined): AppUser | null => {
    if (!supabaseUser) return null;

    const companyIdRaw = supabaseUser.app_metadata?.company_id;
    const companyId = companyIdRaw ? String(companyIdRaw) : undefined; // Asegurar que es string
    const roles = supabaseUser.app_metadata?.roles as string[] | undefined;

    return {
        userId: supabaseUser.id,
        email: supabaseUser.email,
        name: supabaseUser.user_metadata?.full_name || supabaseUser.user_metadata?.name,
        companyId: companyId,
        roles: roles,
    };
};

// --- Componente Provider ---
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Empieza cargando
  const router = useRouter();
  const pathname = usePathname(); // Obtener la ruta actual
  const ensureCompanyCallPending = useRef(false);

  // --- Función signOut ---
  const signOut = useCallback(async () => {
    setIsLoading(true); // Opcional: mostrar carga durante logout
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("AuthProvider: signOut error:", error);
        toast.error("Logout Failed", { description: error.message || "Could not sign out." });
      } else {
        console.log("AuthProvider: signOut successful (state update via listener).");
      }
    } catch (error) {
       console.error("AuthProvider: Unexpected signOut error:", error);
       toast.error("Logout Failed", { description: "An unexpected error occurred during sign out." });
    } finally {
        setIsLoading(false);
    }
  }, []);

  // --- Efecto para manejar cambios de autenticación ---
  useEffect(() => {
    console.log("AuthProvider: Setting up auth state listener.");
    setIsLoading(true); // Marcar como cargando al inicio del efecto

    // 1. Intenta obtener la sesión inicial
    supabase.auth.getSession().then(async ({ data: { session: initialSession } }) => {
        console.log("AuthProvider: Initial session fetched.", initialSession ? `User: ${initialSession.user.id}` : "No initial session");
        setSession(initialSession);
        const mappedUser = mapSupabaseUserToAppUser(initialSession?.user);
        setUser(mappedUser);

        // --- NUEVO: Chequeo inicial de companyId ---
        if (initialSession && mappedUser && !mappedUser.companyId && !ensureCompanyCallPending.current) {
            console.log("AuthProvider: Initial session lacks companyId. Triggering ensureCompanyAssociation.");
            ensureCompanyCallPending.current = true; // Marcar que la llamada está en curso
            try {
                await ensureCompanyAssociation();
                console.log("AuthProvider: ensureCompanyAssociation successful. Refreshing session...");
                const { error: refreshError } = await supabase.auth.refreshSession();
                if (refreshError) {
                     console.error("AuthProvider: Error refreshing session after company association:", refreshError);
                     toast.error("Session Refresh Failed", { description: "Could not refresh session after company setup. Please log in again."});
                     await signOut();
                } else {
                    console.log("AuthProvider: Session refreshed. onAuthStateChange should update state soon.");
                }
            } catch (error) {
                 console.error("AuthProvider: ensureCompanyAssociation failed during initial check:", error);
                 toast.error("Company Setup Failed", { description: error instanceof EnsureCompanyApiError ? error.message : "Could not associate company." });
            } finally {
                 ensureCompanyCallPending.current = false; // Marcar que la llamada terminó
            }
        }

        setIsLoading(false); // Terminar carga después de obtener sesión inicial
    }).catch(error => {
        console.error("AuthProvider: Error fetching initial session:", error);
        setIsLoading(false); // Terminar carga incluso si hay error
    });

    // 2. Escucha cambios futuros
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log(`AuthProvider: Auth state changed - Event: ${event}`, newSession ? `New User: ${newSession.user.id}` : "No session");
        setSession(newSession);
        const mappedUser = mapSupabaseUserToAppUser(newSession?.user);
        setUser(mappedUser);

        // --- NUEVO: Chequeo de companyId en SIGNED_IN ---
        if (event === 'SIGNED_IN' && newSession && mappedUser && !mappedUser.companyId && !ensureCompanyCallPending.current) {
             console.log("AuthProvider: SIGNED_IN event lacks companyId. Triggering ensureCompanyAssociation.");
             ensureCompanyCallPending.current = true; // Marcar llamada en curso
             try {
                await ensureCompanyAssociation();
                console.log("AuthProvider: ensureCompanyAssociation successful after SIGNED_IN. Refreshing session...");
                const { error: refreshError } = await supabase.auth.refreshSession();
                 if (refreshError) {
                      console.error("AuthProvider: Error refreshing session after company association (SIGNED_IN):", refreshError);
                      toast.error("Session Refresh Failed", { description: "Could not refresh session after company setup. Please log in again."});
                      await signOut();
                 } else {
                     console.log("AuthProvider: Session refreshed after SIGNED_IN association.");
                 }
             } catch (error) {
                  console.error("AuthProvider: ensureCompanyAssociation failed after SIGNED_IN:", error);
                  toast.error("Company Setup Failed", { description: error instanceof EnsureCompanyApiError ? error.message : "Could not associate company." });
             } finally {
                  ensureCompanyCallPending.current = false; // Marcar llamada terminada
             }
        }

        if (event === 'SIGNED_OUT') {
             if (pathname?.startsWith('/chat') || pathname?.startsWith('/knowledge') || pathname?.startsWith('/settings')) {
                 router.push('/');
             }
        }

        if (isLoading) setIsLoading(false);
      }
    );

    return () => {
      console.log("AuthProvider: Cleaning up auth state listener.");
      authListener?.subscription.unsubscribe();
    };
  }, [isLoading, router, pathname, signOut]);

  // --- Función signInWithPassword ---
  const signInWithPassword = useCallback(async (credentials: SignInWithPasswordCredentials) => {
    setIsLoading(true); // Opcional: mostrar carga durante el login
    try {
      const { error } = await supabase.auth.signInWithPassword(credentials);
      if (error) {
        console.error("AuthProvider: signInWithPassword error:", error);
        toast.error("Login Failed", { description: error.message || "Invalid credentials." });
        throw error;
      }
      console.log("AuthProvider: signInWithPassword successful (state update via listener).");
    } finally {
      setIsLoading(false); // Detener carga
    }
  }, []);

  // --- Función signUp ---
  const signUp = useCallback(async (options: SignUpOptions) => {
    setIsLoading(true); // Opcional: mostrar carga durante el registro
    try {
        const { data, error } = await supabase.auth.signUp(options);

        if (error) {
            console.error("AuthProvider: signUp error:", error);
            toast.error("Registration Failed", { description: error.message || "Could not create account." });
        } else if (data.user && data.user.identities?.length === 0) {
            toast.success("Registration Submitted", { description: `Please check your email (${options.email}) to confirm your account.` });
            console.log("AuthProvider: signUp successful, email confirmation required.");
        } else if (data.user) {
             toast.success("Registration Successful", { description: "Account created successfully." });
             console.log("AuthProvider: signUp successful, user created and potentially signed in.");
        } else {
             toast.warning("Registration Status Unknown", { description: "Account may have been created, but status is unclear. Please try logging in or checking your email." });
             console.warn("AuthProvider: signUp completed with unexpected response data:", data);
        }
        return { data, error };
    } catch (error) {
        console.error("AuthProvider: Unexpected signUp error:", error);
        toast.error("Registration Failed", { description: "An unexpected error occurred." });
        return { data: { user: null, session: null }, error: error as AuthError };
    } finally {
        setIsLoading(false); // Detener carga
    }
  }, []);

  // --- Valor del Contexto a proveer ---
  const providerValue: AuthContextType = {
    user,
    session,
    isLoading,
    signInWithPassword,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

// --- Hook para consumir el contexto ---
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  if (context === defaultAuthContextValue && typeof window !== 'undefined') {
     console.warn("useAuth hook used possibly outside of AuthProvider or before initialization.");
  }
  return context;
};