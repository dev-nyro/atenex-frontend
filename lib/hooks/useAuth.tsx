// File: lib/hooks/useAuth.tsx
// Purpose: Provides authentication state and actions using React Context and Supabase.
"use client";

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    useRef,
    ReactNode,
} from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { User as AppUser } from '@/lib/auth/helpers';
import { Session, User as SupabaseUser, AuthError, SignInWithPasswordCredentials, SignUpWithPasswordCredentials } from '@supabase/supabase-js';
import { toast } from "sonner";
// (-) QUITAR: import { ensureCompanyAssociation, ApiError as EnsureCompanyApiError } from ''lib/api'' (see below for file content);
import { ApiError } from '@/lib/api'; // Mantener ApiError por si acaso

// --- Types ---
interface AuthContextType {
    user: AppUser | null;
    session: Session | null;
    isLoading: boolean; // Tracks if auth state is being determined (initial load or transitions)
    signInWithPassword: (credentials: SignInWithPasswordCredentials) => Promise<void>; // Throws error on failure
    // (+) Modificar tipo signUp para que coincida con la llamada a API (ya no devuelve datos de sesión directamente)
    signUp: (params: SignUpWithPasswordCredentials) => Promise<{ data: { user: SupabaseUser | null; session: Session | null; }; error: AuthError | null; }>; // Mantenemos la firma original por compatibilidad, aunque ahora no la usemos directamente
    signOut: () => Promise<void>;
}

// --- Initial Context State ---
const defaultAuthContextValue: AuthContextType = {
    user: null,
    session: null,
    isLoading: true, // Start true until initial check finishes
    signInWithPassword: async () => { throw new Error("AuthProvider not initialized"); },
    signUp: async () => { return { data: { user: null, session: null }, error: new AuthError("AuthProvider not initialized") }; },
    signOut: async () => { console.error("AuthProvider not initialized"); },
};

// --- Context Definition ---
const AuthContext = createContext<AuthContextType>(defaultAuthContextValue);

// --- Props for Provider ---
interface AuthProviderProps { children: ReactNode; }

// --- Helper to Map Supabase User to App User ---
const mapSupabaseUserToAppUser = (supabaseUser: SupabaseUser | null | undefined): AppUser | null => {
    if (!supabaseUser) return null;

    const companyIdRaw = supabaseUser.app_metadata?.company_id;
    const companyId = companyIdRaw ? String(companyIdRaw) : undefined; // Ensure string or undefined
    const rolesRaw = supabaseUser.app_metadata?.roles;
    const roles = Array.isArray(rolesRaw) && rolesRaw.every(r => typeof r === 'string') ? rolesRaw as string[] : undefined;
    const name = supabaseUser.user_metadata?.full_name || supabaseUser.user_metadata?.name || null;

    return {
        userId: supabaseUser.id,
        email: supabaseUser.email,
        name: name,
        companyId: companyId,
        roles: roles,
    };
};

// --- AuthProvider Component ---
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<AppUser | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();
    // (-) QUITAR: const ensureCompanyCallPending = useRef(false);
    const initialLoadComplete = useRef(false); // Track if the initial getSession has completed

    // --- Sign Out Logic ---
    const signOut = useCallback(async () => {
        console.log("AuthProvider: Initiating sign out...");
        // Don't set isLoading true here, let onAuthStateChange handle the transition
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error("AuthProvider: Sign out error:", error);
                toast.error("Logout Failed", { description: error.message, id: "logout-error" });
            } else {
                console.log("AuthProvider: Sign out successful via Supabase.");
                // State cleared by onAuthStateChange listener receiving null session
            }
        } catch (error) {
            console.error("AuthProvider: Unexpected sign out error:", error);
            toast.error("Logout Failed", { description: "An unexpected error occurred.", id: "logout-error" });
            // Manually clear state as a fallback
            setSession(null);
            setUser(null);
            setIsLoading(false);
        }
    }, []);

    // --- Core Effect for Auth State Changes & Initial Load ---
    useEffect(() => {
        let isMounted = true; // Track mount status for async operations
        console.log("AuthProvider: useEffect setup running.");

        // --- Function to process session (SIMPLIFICADA) ---
        const processSession = (currentSession: Session | null) => {
            if (!isMounted) return;

            console.log(`AuthProvider: Processing session. Present: ${!!currentSession}`);
            setSession(currentSession);
            const mappedUser = mapSupabaseUserToAppUser(currentSession?.user);
            setUser(mappedUser);

            // (-) YA NO HAY LLAMADA A ensureCompanyAssociation
            // Ahora sólo verificamos si el usuario está incompleto DESPUÉS del login
            if (currentSession && mappedUser && !mappedUser.companyId) {
                // Esto sólo debería ocurrir si el flujo de registro falló en asignar company_id
                // O si un usuario antiguo existente intenta loguearse
                console.error(`AuthProvider: User ${mappedUser.userId} logged in BUT lacks companyId in token! Potential setup issue or old user.`);
                toast.error("Account Issue", {
                    description: "Your account is missing essential information (company association). Please contact support.",
                    duration: 10000,
                    id: "missing-company-id-error"
                });
                 // Considerar forzar logout aquí si el companyId es absolutamente esencial
                 // signOut();
            }

            if (isMounted) setIsLoading(false); // Terminar la carga una vez procesada la sesión
        };


        // --- Initial Session Load ---
        const performInitialCheck = async () => {
            if (initialLoadComplete.current) return; // Already done

            console.log("AuthProvider: Performing initial session check...");
            setIsLoading(true);
            try {
                const { data: { session: initialSession }, error: initialError } = await supabase.auth.getSession();
                if (initialError) {
                    console.error("AuthProvider: Error fetching initial session:", initialError);
                    toast.error("Session Load Error", { description: "Could not load initial session.", id:"init-session-err"});
                }
                console.log("AuthProvider: Initial session check complete. Session found:", !!initialSession);
                // Process the initial session AFTER marking initial load complete
                initialLoadComplete.current = true;
                processSession(initialSession); // Llamar a la versión simplificada

            } catch (error) {
                console.error("AuthProvider: Unexpected error during initial session check:", error);
                toast.error("Session Load Error", { description: "An unexpected error occurred.", id:"init-session-err"});
                initialLoadComplete.current = true; // Mark complete even on error
                if (isMounted) setIsLoading(false);
            }
        };

        performInitialCheck(); // Run the initial check

        // --- Auth State Change Listener ---
        console.log("AuthProvider: Setting up onAuthStateChange listener.");
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, newSession) => {
                if (!isMounted) return;

                console.log(`AuthProvider: onAuthStateChange event: ${event}`, { hasSession: !!newSession });

                 // Wait if initial load isn't marked complete yet (should be quick)
                 while (!initialLoadComplete.current) {
                     console.log("AuthProvider listener: Waiting for initial load...");
                     await new Promise(resolve => setTimeout(resolve, 50)); // Short delay
                 }

                // Procesar la nueva sesión (simplificado, sin ensureCompany)
                processSession(newSession);

                // Lógica de redirección (sin cambios)
                if (event === 'SIGNED_OUT') {
                    const protectedPaths = ['/chat', '/knowledge', '/settings'];
                    if (protectedPaths.some(p => pathname?.startsWith(p))) {
                        console.log("AuthProvider: Signed out from protected route, redirecting to /");
                        router.replace('/'); // Use replace to avoid history clutter
                    }
                } else if (event === 'SIGNED_IN') {
                     // Redirect to /chat if user signs in while on a public page like /login or /register
                     // or if they just confirmed their email (might land on '/')
                     const publicAuthPaths = ['/login', '/register'];
                     if (publicAuthPaths.includes(pathname || '') || pathname === '/') {
                         console.log(`AuthProvider: Signed in on ${pathname}, redirecting to /chat`);
                         router.replace('/chat'); // Use replace
                     }
                 }
            }
        );

        // Cleanup
        return () => {
            isMounted = false; // Mark as unmounted
            console.log("AuthProvider: Unmounting, unsubscribing listener.");
            authListener?.subscription.unsubscribe();
        };
    // Dependencies: router, pathname for redirection. signOut added because it's used.
    }, [router, pathname, signOut]); // Effect setup depends on these

    // --- Actions ---
    const signInWithPassword = useCallback(async (credentials: SignInWithPasswordCredentials) => {
        console.log("AuthProvider: Attempting sign in...");
        setIsLoading(true);
        try {
            const { error } = await supabase.auth.signInWithPassword(credentials);
            if (error) throw error; // Throw Supabase error for the form to catch
            console.log("AuthProvider: signInWithPassword successful trigger. Waiting for onAuthStateChange.");
            // isLoading will be set to false by processSession via the listener
        } catch (error) {
            setIsLoading(false); // Stop loading on direct error
            console.error("AuthProvider: Sign in failed:", error);
            throw error; // Re-throw for the form
        }
    }, []);

    // (-) QUITAR EL signUp original que llamaba a supabase.auth.signUp
    // (+) Dejar una función placeholder o eliminarla si no se usa en ningún otro sitio
     const signUp = useCallback(async (params: SignUpWithPasswordCredentials) => {
         // Esta función ya no debería ser llamada directamente por RegisterForm
         console.warn("AuthProvider: supabase.auth.signUp called directly, should use backend registration.");
         // Devolvemos una estructura compatible pero con error para evitar romper otros posibles usos
         return { data: { user: null, session: null }, error: new AuthError("Direct Supabase signUp is deprecated, use backend API.") };
     }, []);

    // --- Context Value ---
    const providerValue: AuthContextType = {
        user, session, isLoading, signInWithPassword, signUp, signOut
    };

    // --- Render Provider ---
    return (
        <AuthContext.Provider value={providerValue}>
            {children}
        </AuthContext.Provider>
    );
};

// --- Hook to Use Auth Context ---
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    // Avoid the warning for default value check as it can be noisy.
    // Ensure the provider wraps the necessary parts of the application tree.
    return context;
};
