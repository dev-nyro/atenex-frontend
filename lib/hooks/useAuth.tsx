// File: lib/hooks/useAuth.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { User as AppUser } from '@/lib/auth/helpers';
// --- MODIFICACIÓN: Quitar SignUpOptions ---
import type { Session, User as SupabaseUser, AuthError, SignInWithPasswordCredentials } from '@supabase/supabase-js';
// ------------------------------------------
import { toast } from "sonner";
import { ensureCompanyAssociation, ApiError as EnsureCompanyApiError } from '@/lib/api';

// --- Interfaz del Contexto de Autenticación (Firma de signUp modificada) ---
interface AuthContextType {
  user: AppUser | null;
  session: Session | null;
  isLoading: boolean;
  signInWithPassword: (credentials: SignInWithPasswordCredentials) => Promise<void>;
  // --- MODIFICACIÓN: Cambiar firma de signUp ---
  // Acepta credenciales y un objeto de opciones opcional
  signUp: (
    credentials: Pick<SignInWithPasswordCredentials, 'email' | 'password'>, // Solo email/pass requeridos
    options?: { data?: object; emailRedirectTo?: string; } // Opciones son opcionales
   ) => Promise<{ data: { user: SupabaseUser | null; session: Session | null; }; error: AuthError | null; }>;
  // ------------------------------------------
  signOut: () => Promise<void>;
}

// --- Valor por defecto (firma de signUp modificada) ---
const defaultAuthContextValue: AuthContextType = {
  user: null,
  session: null,
  isLoading: true,
  signInWithPassword: async () => { console.error("signInWithPassword called outside of AuthProvider"); throw new Error("Not initialized"); },
  // --- MODIFICACIÓN: Ajustar valor por defecto de signUp ---
  signUp: async () => { console.error("signUp called outside of AuthProvider"); return { data: { user: null, session: null }, error: new Error("Not initialized") as AuthError }; },
  // ---------------------------------------------------
  signOut: async () => { console.error("signOut called outside of AuthProvider"); },
};

// --- Creación del Contexto (sin cambios) ---
const AuthContext = createContext<AuthContextType>(defaultAuthContextValue);
// --- Props del Provider (sin cambios) ---
interface AuthProviderProps { /* ... */ }
// --- Helper mapSupabaseUserToAppUser (sin cambios) ---
const mapSupabaseUserToAppUser = (supabaseUser: SupabaseUser | null | undefined): AppUser | null => { /* ... */ };

// --- Componente Provider ---
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const ensureCompanyCallPending = useRef(false);

  // --- Función signOut (movida aquí para usarla en useEffect) ---
  const signOut = useCallback(async () => {
    // ... (código de signOut sin cambios) ...
    setIsLoading(true);
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
       // Dejar que onAuthStateChange maneje isLoading = false
    }
  }, []); // Sin dependencias externas

  // --- Efecto para manejar cambios de autenticación (sin cambios internos) ---
  useEffect(() => {
    // ... (código del listener onAuthStateChange y chequeo de companyId sin cambios) ...
    console.log("AuthProvider: Setting up auth state listener.");
    setIsLoading(true);

    supabase.auth.getSession().then(async ({ data: { session: initialSession } }) => {
        console.log("AuthProvider: Initial session fetched.", initialSession ? `User: ${initialSession.user.id}` : "No initial session");
        setSession(initialSession);
        const mappedUser = mapSupabaseUserToAppUser(initialSession?.user);
        setUser(mappedUser);
        if (initialSession && mappedUser && !mappedUser.companyId && !ensureCompanyCallPending.current) {
            console.log("AuthProvider: Initial session lacks companyId. Triggering ensureCompanyAssociation.");
            ensureCompanyCallPending.current = true;
            try {
                await ensureCompanyAssociation();
                console.log("AuthProvider: ensureCompanyAssociation successful. Refreshing session...");
                const { error: refreshError } = await supabase.auth.refreshSession();
                if (refreshError) {
                     console.error("AuthProvider: Error refreshing session after company association:", refreshError);
                     toast.error("Session Refresh Failed", { description: "Could not refresh session after company setup. Please log in again."});
                     await signOut();
                } else { console.log("AuthProvider: Session refreshed."); }
            } catch (error) {
                 console.error("AuthProvider: ensureCompanyAssociation failed during initial check:", error);
                 toast.error("Company Setup Failed", { description: error instanceof EnsureCompanyApiError ? error.message : "Could not associate company." });
            } finally { ensureCompanyCallPending.current = false; }
        }
        setIsLoading(false);
    }).catch(error => {
        console.error("AuthProvider: Error fetching initial session:", error);
        setIsLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log(`AuthProvider: Auth state changed - Event: ${event}`, newSession ? `New User: ${newSession.user.id}` : "No session");
        setSession(newSession);
        const mappedUser = mapSupabaseUserToAppUser(newSession?.user);
        setUser(mappedUser);
        if (event === 'SIGNED_IN' && newSession && mappedUser && !mappedUser.companyId && !ensureCompanyCallPending.current) {
             console.log("AuthProvider: SIGNED_IN event lacks companyId. Triggering ensureCompanyAssociation.");
             ensureCompanyCallPending.current = true;
             try {
                await ensureCompanyAssociation();
                console.log("AuthProvider: ensureCompanyAssociation successful after SIGNED_IN. Refreshing session...");
                const { error: refreshError } = await supabase.auth.refreshSession();
                 if (refreshError) {
                      console.error("AuthProvider: Error refreshing session after company association (SIGNED_IN):", refreshError);
                      toast.error("Session Refresh Failed", { description: "Could not refresh session after company setup. Please log in again."});
                      await signOut();
                 } else { console.log("AuthProvider: Session refreshed after SIGNED_IN association."); }
             } catch (error) {
                  console.error("AuthProvider: ensureCompanyAssociation failed after SIGNED_IN:", error);
                  toast.error("Company Setup Failed", { description: error instanceof EnsureCompanyApiError ? error.message : "Could not associate company." });
             } finally { ensureCompanyCallPending.current = false; }
        }
        if (event === 'SIGNED_OUT') { if (pathname?.startsWith('/chat') || pathname?.startsWith('/knowledge') || pathname?.startsWith('/settings')) { router.push('/'); } }
        if (isLoading) setIsLoading(false);
      }
    );
    return () => { authListener?.subscription.unsubscribe(); };
  }, [isLoading, router, pathname, signOut]); // Añadir signOut a dependencias

  // --- Función signInWithPassword (sin cambios internos) ---
  const signInWithPassword = useCallback(async (credentials: SignInWithPasswordCredentials) => {
    // ... (código existente) ...
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword(credentials);
      if (error) { throw error; } // Re-lanzar para el form
    } finally { setIsLoading(false); }
  }, []);

  // --- Función signUp (MODIFICADA) ---
  const signUp = useCallback(async (
      credentials: Pick<SignInWithPasswordCredentials, 'email' | 'password'>,
      options?: { data?: object; emailRedirectTo?: string; } // Tipado correcto para options
    ) => {
    setIsLoading(true);
    try {
        // --- MODIFICACIÓN: Llamar con credentials y options separados ---
        const { data, error } = await supabase.auth.signUp(credentials, options);
        // -----------------------------------------------------------

        // Manejo de toasts (sin cambios)
        if (error) { toast.error("Registration Failed", { description: error.message || "Could not create account." }); }
        else if (data.user && data.user.identities?.length === 0) { toast.success("Registration Submitted", { description: `Please check your email (${credentials.email}) to confirm.` }); }
        else if (data.user) { toast.success("Registration Successful"); }
        else { toast.warning("Registration Status Unknown"); }
        return { data, error };
    } catch (error) {
        console.error("AuthProvider: Unexpected signUp error:", error);
        toast.error("Registration Failed", { description: "An unexpected error occurred." });
        return { data: { user: null, session: null }, error: error as AuthError };
    } finally {
        setIsLoading(false);
    }
  }, []); // Sin dependencias externas que cambien

  // --- Valor del Contexto (sin cambios) ---
  const providerValue: AuthContextType = {
    user, session, isLoading, signInWithPassword, signUp, signOut,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

// --- Hook useAuth (sin cambios) ---
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) { throw new Error('useAuth must be used within an AuthProvider'); }
    if (context === defaultAuthContextValue && typeof window !== 'undefined') { console.warn("useAuth hook used possibly outside of AuthProvider or before initialization."); }
    return context;
};