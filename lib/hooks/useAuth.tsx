// File: lib/hooks/useAuth.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation'; // Import usePathname
import { supabase } from '@/lib/supabaseClient';
import { User as AppUser } from '@/lib/auth/helpers'; // Nuestra interfaz User frontend
import type { Session, User as SupabaseUser, AuthError, SignInWithPasswordCredentials, SignUpOptions } from '@supabase/supabase-js'; // Tipos de Supabase
import { toast } from "sonner"; // Para notificaciones

// --- Interfaz del Contexto de Autenticación ---
interface AuthContextType {
  user: AppUser | null;         // El usuario mapeado de nuestra aplicación
  session: Session | null;      // La sesión completa de Supabase
  isLoading: boolean;         // Indica si la sesión inicial se está cargando
  signInWithPassword: (credentials: SignInWithPasswordCredentials) => Promise<void>;
  signUp: (options: SignUpOptions) => Promise<{ data: { user: SupabaseUser | null; session: Session | null; }; error: AuthError | null; }>;
  signOut: () => Promise<void>;
  // login y signIn ya no son necesarios como funciones separadas
}

// --- Valor por defecto para el contexto ---
// Usado si se intenta acceder fuera del Provider o antes de la inicialización
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

    // --- CORRECCIÓN: Extraer companyId y roles de app_metadata ---
    // El README del Gateway especifica que company_id está en app_metadata
    const companyIdRaw = supabaseUser.app_metadata?.company_id;
    const companyId = companyIdRaw ? String(companyIdRaw) : undefined; // Asegurar que es string
    const roles = supabaseUser.app_metadata?.roles as string[] | undefined; // Asumir que roles también está en app_metadata
    // -----------------------------------------------------------

    // --- Validación Opcional de companyId ---
    // Descomenta esto si un usuario SIN companyId NO debe considerarse válido en el frontend
    // if (!companyId) {
    //     console.warn("AuthProvider: Supabase user is missing required 'company_id' in app_metadata. User considered invalid.", supabaseUser.id, supabaseUser.app_metadata);
    //     // Podrías forzar un logout aquí o simplemente devolver null
    //     // supabase.auth.signOut().catch(console.error); // Ejemplo: Forzar logout
    //     return null; // Considerar usuario inválido
    // }
    // ----------------------------------------

    return {
        userId: supabaseUser.id,
        email: supabaseUser.email,
        // Intentar obtener nombre de user_metadata (full_name o name)
        name: supabaseUser.user_metadata?.full_name || supabaseUser.user_metadata?.name,
        companyId: companyId, // Usar el companyId extraído de app_metadata
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

  // --- Efecto para manejar cambios de autenticación ---
  useEffect(() => {
    console.log("AuthProvider: Setting up auth state listener.");
    setIsLoading(true); // Marcar como cargando al inicio del efecto

    // 1. Intenta obtener la sesión inicial
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
        console.log("AuthProvider: Initial session fetched.", initialSession ? `User: ${initialSession.user.id}` : "No initial session");
        setSession(initialSession);
        setUser(mapSupabaseUserToAppUser(initialSession?.user));
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

        // Si el usuario ya no es válido (ej. falta companyId después de mapear), forzar logout
        // if (newSession && !mappedUser) {
        //    console.warn("AuthProvider: User became invalid after auth change, forcing sign out.");
        //    await signOut();
        // }

        // Manejar redirecciones post-evento si es necesario
        if (event === 'SIGNED_IN') {
            // No redirigir automáticamente aquí, dejar que AppLayout maneje la protección
            // o que la página específica (ej. login) redirija.
            // router.push('/chat'); // Evitar redirección automática general
        } else if (event === 'SIGNED_OUT') {
             // Redirigir a la página de inicio o login solo si estamos en una ruta protegida
             if (pathname?.startsWith('/chat') || pathname?.startsWith('/knowledge') || pathname?.startsWith('/settings')) {
                 router.push('/'); // O '/login' si prefieres
             }
        }

        // Asegurar que isLoading sea false después del primer evento recibido
        if (isLoading) setIsLoading(false);
      }
    );

    // Limpieza del listener al desmontar
    return () => {
      console.log("AuthProvider: Cleaning up auth state listener.");
      authListener?.subscription.unsubscribe();
    };
  }, [isLoading, router, pathname]); // Añadir pathname a dependencias

  // --- Función signInWithPassword ---
  const signInWithPassword = useCallback(async (credentials: SignInWithPasswordCredentials) => {
    setIsLoading(true); // Opcional: mostrar carga durante el login
    try {
      const { error } = await supabase.auth.signInWithPassword(credentials);
      if (error) {
        console.error("AuthProvider: signInWithPassword error:", error);
        toast.error("Login Failed", { description: error.message || "Invalid credentials." });
        throw error; // Re-lanzar para que el form lo maneje
      }
      // El onAuthStateChange se encargará de actualizar el estado y redirigir si es necesario
      console.log("AuthProvider: signInWithPassword successful (state update via listener).");
      // No necesitas redirigir aquí, AppLayout o la página de origen lo harán.
      // router.push('/chat');
    } catch (error) {
       // El error ya fue notificado, solo asegurar que isLoading se detenga
    } finally {
      setIsLoading(false); // Detener carga
    }
  }, []);

  // --- Función signUp ---
  const signUp = useCallback(async (options: SignUpOptions) => {
    setIsLoading(true); // Opcional: mostrar carga durante el registro
    try {
        // Nota: app_metadata NO se puede pasar aquí directamente desde el cliente.
        // Debe configurarse mediante triggers/funciones en Supabase.
        const { data, error } = await supabase.auth.signUp(options);

        if (error) {
            console.error("AuthProvider: signUp error:", error);
            toast.error("Registration Failed", { description: error.message || "Could not create account." });
        } else if (data.user && data.user.identities?.length === 0) {
            // Caso común: requiere confirmación por email
            toast.success("Registration Submitted", { description: `Please check your email (${options.email}) to confirm your account.` });
            console.log("AuthProvider: signUp successful, email confirmation required.");
        } else if (data.user) {
            // Caso menos común: usuario creado y sesión iniciada (ej. email/pass deshabilitado)
             toast.success("Registration Successful", { description: "Account created successfully." });
             console.log("AuthProvider: signUp successful, user created and potentially signed in.");
             // El onAuthStateChange manejará la actualización del estado si hay sesión
        } else {
             toast.warning("Registration Status Unknown", { description: "Account may have been created, but status is unclear. Please try logging in or checking your email." });
             console.warn("AuthProvider: signUp completed with unexpected response data:", data);
        }
        return { data, error }; // Devolver resultado para el form
    } catch (error) {
        console.error("AuthProvider: Unexpected signUp error:", error);
        toast.error("Registration Failed", { description: "An unexpected error occurred." });
        return { data: { user: null, session: null }, error: error as AuthError };
    } finally {
        setIsLoading(false); // Detener carga
    }
  }, []);

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
        // El onAuthStateChange limpiará user/session y redirigirá si es necesario
        // router.push('/'); // Redirección manejada por listener o AppLayout
      }
    } catch (error) {
       // Manejar errores inesperados si los hubiera
       console.error("AuthProvider: Unexpected signOut error:", error);
       toast.error("Logout Failed", { description: "An unexpected error occurred during sign out." });
    } finally {
        setIsLoading(false);
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

  // Renderizar Provider con el valor calculado
  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

// --- Hook para consumir el contexto ---
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  // Comprobación para asegurar que se usa dentro del Provider
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  // Advertencia si se usa el valor por defecto (podría indicar uso fuera o antes de inicializar)
  if (context === defaultAuthContextValue && typeof window !== 'undefined') {
     console.warn("useAuth hook used possibly outside of AuthProvider or before initialization.");
  }
  return context;
};