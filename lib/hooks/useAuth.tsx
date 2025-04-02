// File: lib/hooks/useAuth.tsx
// Purpose: Provides authentication state and actions using React Context and Supabase.
"use client";

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    useRef, // Added useRef
    ReactNode,
} from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { User as AppUser } from '@/lib/auth/helpers'; // Use our defined frontend User type
import type { Session, User as SupabaseUser, AuthError, SignInWithPasswordCredentials, SignUpWithPasswordCredentials } from '@supabase/supabase-js';
import { toast } from "sonner";
import { ensureCompanyAssociation, ApiError as EnsureCompanyApiError } from '@/lib/api'; // Import API function and specific error type

// --- Types ---
interface AuthContextType {
    user: AppUser | null; // Use our application-specific User type
    session: Session | null; // Keep the full Supabase session if needed elsewhere
    isLoading: boolean; // Tracks if auth state is being determined
    signInWithPassword: (credentials: SignInWithPasswordCredentials) => Promise<void>;
    signUp: (params: SignUpWithPasswordCredentials) => Promise<{ data: { user: SupabaseUser | null; session: Session | null; }; error: AuthError | null; }>;
    signOut: () => Promise<void>;
    // No 'token' here - access via session.access_token if needed directly
}

// --- Initial Context State ---
const defaultAuthContextValue: AuthContextType = {
    user: null,
    session: null,
    isLoading: true, // Start as true until initial check completes
    signInWithPassword: async () => {
        console.error("AuthProvider: signInWithPassword called outside of AuthProvider");
        throw new Error("Auth context not initialized");
    },
    signUp: async () => {
        console.error("AuthProvider: signUp called outside of AuthProvider");
        return { data: { user: null, session: null }, error: new AuthError("Auth context not initialized") };
    },
    signOut: async () => {
        console.error("AuthProvider: signOut called outside of AuthProvider");
    },
};

// --- Context Definition ---
const AuthContext = createContext<AuthContextType>(defaultAuthContextValue);

// --- Props for Provider ---
interface AuthProviderProps {
    children: ReactNode;
}

// --- Helper to Map Supabase User to App User ---
const mapSupabaseUserToAppUser = (supabaseUser: SupabaseUser | null | undefined): AppUser | null => {
    if (!supabaseUser) {
        return null;
    }

    // Extract data safely, checking for undefined/null
    const companyIdRaw = supabaseUser.app_metadata?.company_id;
    // Ensure companyId is a string if it exists, otherwise undefined
    const companyId = companyIdRaw ? String(companyIdRaw) : undefined;

    // Extract roles, ensuring it's an array of strings or undefined
    const rolesRaw = supabaseUser.app_metadata?.roles;
    const roles = Array.isArray(rolesRaw) && rolesRaw.every(r => typeof r === 'string')
        ? rolesRaw as string[]
        : undefined;

    // Extract name from user_metadata (common places: 'name' or 'full_name')
    const name = supabaseUser.user_metadata?.full_name || supabaseUser.user_metadata?.name || null;

    return {
        userId: supabaseUser.id,
        email: supabaseUser.email,
        name: name, // Will be string or null
        companyId: companyId, // Will be string or undefined
        roles: roles, // Will be string[] or undefined
    };
};


// --- AuthProvider Component ---
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<AppUser | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(true); // Start loading until first check
    const router = useRouter();
    const pathname = usePathname();
    // Ref to prevent multiple ensureCompany calls running concurrently
    const ensureCompanyCallPending = useRef(false);
    // Ref to store the initial session check promise
    const initialCheckPromise = useRef<Promise<void> | null>(null);

    // --- Sign Out Logic ---
    const signOut = useCallback(async () => {
        console.log("AuthProvider: Initiating sign out...");
        // Don't set isLoading true here immediately, let onAuthStateChange handle it
        // to avoid UI flicker if sign out is very fast.
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error("AuthProvider: Sign out error:", error);
                toast.error("Logout Failed", { description: error.message });
            } else {
                console.log("AuthProvider: Sign out successful via Supabase.");
                // Clear local state immediately for faster UI response
                setUser(null);
                setSession(null);
                // Redirect happens via useEffect watching session state change to null
            }
        } catch (error) {
            console.error("AuthProvider: Unexpected sign out error:", error);
            toast.error("Logout Failed", { description: "An unexpected error occurred during sign out." });
            // Still clear local state in case of unexpected error
            setUser(null);
            setSession(null);
        } finally {
             // Ensure loading is false after attempt, though onAuthStateChange might set it again briefly
             setIsLoading(false);
        }
    }, []); // No dependencies needed for signOut itself

    // --- Core Effect for Auth State Changes & Initial Load ---
    useEffect(() => {
        console.log("AuthProvider: useEffect setup running.");

        // Function to handle session updates and potential company association
        const handleSessionUpdate = async (currentSession: Session | null) => {
            console.log("AuthProvider: Handling session update. Session present:", !!currentSession);
            setSession(currentSession);
            const mappedUser = mapSupabaseUserToAppUser(currentSession?.user);
            setUser(mappedUser);

            // --- Ensure Company Association Logic ---
            // Check only if we have a session, a mapped user, but NO companyId,
            // and no call is already pending.
            if (currentSession && mappedUser && !mappedUser.companyId && !ensureCompanyCallPending.current) {
                console.log(`AuthProvider: User ${mappedUser.userId} lacks companyId. Attempting association.`);
                ensureCompanyCallPending.current = true; // Mark as pending
                try {
                    const result = await ensureCompanyAssociation();
                    console.log("AuthProvider: ensureCompanyAssociation API call successful:", result.message);
                    toast.info("Company Association", { description: result.message });
                    // IMPORTANT: Refresh the Supabase session to get the updated token with the new app_metadata
                    console.log("AuthProvider: Refreshing Supabase session after company association...");
                    const { error: refreshError } = await supabase.auth.refreshSession();
                    if (refreshError) {
                        console.error("AuthProvider: Failed to refresh session after company association:", refreshError);
                        toast.error("Session Refresh Failed", { description: "Could not update session after company setup. Please log in again." });
                        // Consider signing out if refresh fails critically
                        // await signOut();
                    } else {
                        console.log("AuthProvider: Session refreshed successfully.");
                        // The onAuthStateChange listener will fire again with the *new* session,
                        // updating user/session state automatically. No need to manually set user/session here.
                    }
                } catch (error) {
                    console.error("AuthProvider: ensureCompanyAssociation API call failed:", error);
                    let errorDesc = "Could not automatically associate your account with a company.";
                    if (error instanceof EnsureCompanyApiError) {
                        errorDesc = error.message || errorDesc;
                         // If the error is 401/403 from the ensure-company endpoint, it implies token issues.
                         if (error.status === 401 || error.status === 403) {
                            errorDesc = "Authentication error during company setup. Please log in again.";
                            await signOut(); // Force sign out on critical auth error
                         }
                    } else if (error instanceof Error) {
                        errorDesc = error.message;
                    }
                    toast.error("Company Setup Failed", { description: errorDesc });
                } finally {
                    ensureCompanyCallPending.current = false; // Mark as no longer pending
                }
            }
             // --- End Ensure Company Logic ---

             // Regardless of company check, ensure loading is false after handling
             setIsLoading(false);
             console.log("AuthProvider: Session update handling complete. isLoading set to false.");
        };


        // 1. Initial Session Check (Only once on mount)
        if (!initialCheckPromise.current) {
            console.log("AuthProvider: Performing initial session check...");
            setIsLoading(true); // Ensure loading is true during initial check
            initialCheckPromise.current = supabase.auth.getSession()
                .then(async ({ data: { session: initialSession }, error: initialError }) => {
                    if (initialError) {
                        console.error("AuthProvider: Error fetching initial session:", initialError);
                        toast.error("Session Load Error", { description: "Could not load your session." });
                    }
                    console.log("AuthProvider: Initial session check complete. Session found:", !!initialSession);
                    await handleSessionUpdate(initialSession); // Handle the initial session
                })
                .catch(error => {
                    console.error("AuthProvider: Unexpected error during initial session check:", error);
                    toast.error("Session Load Error", { description: "An unexpected error occurred." });
                    setIsLoading(false); // Ensure loading stops on unexpected error
                });
        }


        // 2. Auth State Change Listener
        console.log("AuthProvider: Setting up onAuthStateChange listener.");
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, newSession) => {
                console.log(`AuthProvider: onAuthStateChange event: ${event}`, { hasSession: !!newSession });

                // Wait for initial check to complete before processing listener events fully
                if (initialCheckPromise.current) {
                    await initialCheckPromise.current;
                }

                 // Always update state based on the event, but handle company logic specifically on SIGNED_IN
                 // The handleSessionUpdate function now contains the company check logic.
                 await handleSessionUpdate(newSession);

                // Handle redirection on SIGNED_OUT
                if (event === 'SIGNED_OUT') {
                    // Redirect to home if user was in a protected area
                    const protectedPaths = ['/chat', '/knowledge', '/settings'];
                    if (protectedPaths.some(p => pathname?.startsWith(p))) {
                        console.log("AuthProvider: Signed out from protected route, redirecting to /");
                        router.push('/'); // Use push for clearer navigation history
                    }
                }
                // Note: Redirection on SIGNED_IN is usually handled by the login form
                // or components observing the session becoming non-null.
            }
        );

        // Cleanup listener on component unmount
        return () => {
            console.log("AuthProvider: Unmounting, unsubscribing listener.");
            authListener?.subscription.unsubscribe();
            initialCheckPromise.current = null; // Clear the promise ref on unmount
        };
    // Dependencies: router and pathname are needed for redirection logic on signout.
    // signOut is included as it's used within the effect's error handling.
    }, [router, pathname, signOut]); // Rerun if router or pathname changes (for redirection logic)

    // --- Sign In Action ---
    const signInWithPassword = useCallback(async (credentials: SignInWithPasswordCredentials) => {
        console.log("AuthProvider: Attempting sign in...");
        setIsLoading(true); // Indicate loading during sign-in attempt
        try {
            const { error } = await supabase.auth.signInWithPassword(credentials);
            if (error) {
                console.error("AuthProvider: Sign in error:", error);
                // Throw the error so the form can catch it and display specifics
                throw error;
            }
            console.log("AuthProvider: signInWithPassword successful. Waiting for onAuthStateChange.");
            // Don't set loading false here; let onAuthStateChange handle it when the session updates.
        } catch (error) {
            // Ensure loading is set to false if an error is thrown *before* Supabase call returns
            // or if the thrown error needs to be handled immediately.
             setIsLoading(false);
             // Re-throw the error for the form
             throw error;
        }
    }, []);

    // --- Sign Up Action ---
    const signUp = useCallback(async (params: SignUpWithPasswordCredentials) => {
        console.log("AuthProvider: Attempting sign up...");
        setIsLoading(true);
        try {
            // Ensure email and password are provided
            if (!params.email || !params.password) {
                throw new AuthError("Email and password are required for sign up.");
            }

            const { data, error } = await supabase.auth.signUp(params); // Pass params directly

            // Handle Supabase-specific responses
            if (error) {
                 console.error("AuthProvider: Sign up error:", error);
                 toast.error("Registration Failed", { description: error.message || "Could not create account." });
            } else if (data.user && data.session) {
                 // User created AND session started (e.g., auto-confirm enabled)
                 console.log("AuthProvider: Sign up successful and user logged in.");
                 toast.success("Registration Successful!", { description: "You are now logged in." });
                 // onAuthStateChange will handle the session update and company check
            } else if (data.user && !data.session) {
                 // User created but requires confirmation (common case)
                 console.log("AuthProvider: Sign up successful, confirmation required.");
                 toast.success("Registration Submitted", {
                    description: `Please check your email (${params.email}) to confirm your account.`,
                    duration: 10000, // Longer duration for this message
                 });
            } else {
                 // Unexpected case
                 console.warn("AuthProvider: Sign up status unknown.", { data });
                 toast.warning("Registration Status Unknown", { description: "Please try logging in or check your email." });
            }
            setIsLoading(false); // Set loading false after handling response
            return { data, error }; // Return the result for the form

        } catch (error) {
            console.error("AuthProvider: Unexpected sign up error:", error);
            let errorMsg = "An unexpected error occurred during registration.";
            if (error instanceof Error) errorMsg = error.message;
            toast.error("Registration Failed", { description: errorMsg });
            setIsLoading(false);
            // Return an error structure consistent with Supabase response
            return { data: { user: null, session: null }, error: error instanceof AuthError ? error : new AuthError(errorMsg) };
        }
    }, []);

    // --- Context Value ---
    const providerValue: AuthContextType = {
        user,
        session,
        isLoading,
        signInWithPassword,
        signUp,
        signOut,
    };

    // --- Render Provider ---
    return (
        <AuthContext.Provider value={providerValue}>
            {/* Optionally render children only after initial load, or show a global loader */}
            {/* {isLoading ? <GlobalLoader /> : children} */}
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
    // Optional: Add a check if the context is still the default value,
    // which might indicate usage outside the provider or before initialization.
    // This check might be noisy during initial renders.
    // if (context === defaultAuthContextValue && typeof window !== 'undefined') {
    //    console.warn("useAuth hook used possibly outside of AuthProvider or before initialization finished.");
    // }
    return context;
};