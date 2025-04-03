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
import { ensureCompanyAssociation, ApiError as EnsureCompanyApiError, ApiError } from '@/lib/api'; // Import API function and error types

// --- Types ---
interface AuthContextType {
    user: AppUser | null;
    session: Session | null;
    isLoading: boolean; // Tracks if auth state is being determined (initial load or transitions)
    signInWithPassword: (credentials: SignInWithPasswordCredentials) => Promise<void>; // Throws error on failure
    signUp: (params: SignUpWithPasswordCredentials) => Promise<{ data: { user: SupabaseUser | null; session: Session | null; }; error: AuthError | null; }>;
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
    const ensureCompanyCallPending = useRef(false);
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

        // --- Function to handle session updates and company association ---
        const processSession = async (currentSession: Session | null) => {
            if (!isMounted) return; // Don't process if unmounted

            console.log(`AuthProvider: Processing session. Present: ${!!currentSession}`);
            setSession(currentSession); // Update session state
            const mappedUser = mapSupabaseUserToAppUser(currentSession?.user);
            setUser(mappedUser); // Update user state

            // --- Ensure Company Logic ---
            if (currentSession && mappedUser && !mappedUser.companyId && !ensureCompanyCallPending.current) {
                console.log(`AuthProvider: User ${mappedUser.userId} lacks companyId. Attempting association.`);
                ensureCompanyCallPending.current = true;
                setIsLoading(true); // Indicate loading during this critical step

                try {
                    console.log("AuthProvider: Calling ensure-company association endpoint...");
                    const result = await ensureCompanyAssociation();
                    console.log("AuthProvider: ensureCompanyAssociation API call successful:", result.message);
                    // --- MODIFICACIÓN: Evitar toast duplicados ---
                    toast.success("Company Association Check", { description: result.message, id: "company-assoc-check" }); // Use ID to prevent duplicates

                    // Refresh session to get updated token
                    console.log("AuthProvider: Refreshing Supabase session after company association check...");
                    const { error: refreshError } = await supabase.auth.refreshSession();
                    if (refreshError) {
                        console.error("AuthProvider: Failed to refresh session:", refreshError);
                        toast.error("Session Sync Failed", { description: "Could not update session after setup. Please log in again.", id: "session-refresh-fail" });
                        await signOut(); // Force sign out if refresh fails
                    } else {
                        console.log("AuthProvider: Session refresh triggered. onAuthStateChange will handle update.");
                        // The listener will receive the updated session and re-process.
                    }
                } catch (error) {
                    console.error("AuthProvider: ensureCompanyAssociation API call failed:", error);
                    let errorDesc = "Could not complete company setup.";
                     // Handle specific ApiError vs generic Error
                     if (error instanceof ApiError) {
                        errorDesc = error.message || errorDesc;
                        // Network error is status 0 in our api client
                        if (error.status === 0) {
                             errorDesc = "Network Error: Failed to connect for company setup.";
                        } else if (error.status === 401 || error.status === 403) {
                            errorDesc = "Authentication error during setup. Please log in again.";
                            await signOut(); // Force sign out
                        } else if (error.status === 400) { // Handle specific 400 from backend (config error)
                            errorDesc = error.message; // Use the specific message from backend
                        }
                    } else if (error instanceof Error) { errorDesc = error.message; }
                    // --- MODIFICACIÓN: Evitar toast duplicados ---
                    toast.error("Company Setup Failed", { description: errorDesc, duration: 7000, id: "company-setup-fail" });
                } finally {
                     if (isMounted) {
                         ensureCompanyCallPending.current = false;
                         setIsLoading(false); // Ensure loading stops after attempt
                         console.log("AuthProvider: Company association attempt finished.");
                     }
                }
            } else {
                 // If no company check needed, ensure loading is false
                 if (isMounted) setIsLoading(false);
                 console.log("AuthProvider: No company association check needed or call already pending.");
            }
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
                await processSession(initialSession);

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

                // Process the session update from the listener
                await processSession(newSession);

                // Handle redirection logic based on event and path
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

    const signUp = useCallback(async (params: SignUpWithPasswordCredentials) => {
        console.log("AuthProvider: Attempting sign up...");
        setIsLoading(true);
        try {
            const hasEmail = 'email' in params && params.email;
            const hasPhone = 'phone' in params && params.phone;
            if (!params.password || (!hasEmail && !hasPhone)) {
                throw new AuthError("Password and either Email or Phone are required.");
            }
            const { data, error } = await supabase.auth.signUp(params);

            // Process result immediately for UI feedback
            if (error) {
                toast.error("Registration Failed", { description: error.message, id:"signup-fail" });
            } else if (data.user && !data.session) { // Confirmation needed
                 const contact = hasEmail ? `email (${params.email})` : 'phone';
                 toast.success("Registration Submitted", { description: `Please check your ${contact} to confirm.`, duration: 10000, id:"signup-confirm" });
            } else if (data.user && data.session) { // Auto-confirmed/logged in
                toast.success("Registration Successful!", { description: "You are now logged in.", id:"signup-success" });
                // Listener will handle session update
            } else {
                 toast.warning("Registration Status Unknown", { description: "Please try logging in.", id:"signup-unknown" });
            }
            setIsLoading(false); // Stop loading after handling
            return { data, error }; // Return Supabase result

        } catch (error) {
            console.error("AuthProvider: Unexpected sign up error:", error);
            const errorMsg = error instanceof Error ? error.message : "An unexpected error occurred.";
            toast.error("Registration Failed", { description: errorMsg, id:"signup-fail" });
            setIsLoading(false);
            return { data: { user: null, session: null }, error: error instanceof AuthError ? error : new AuthError(errorMsg) };
        }
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