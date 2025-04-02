// File: lib/hooks/useAuth.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { User as AppUser } from '@/lib/auth/helpers';
import type { Session, User as SupabaseUser, AuthError, SignInWithPasswordCredentials } from '@supabase/supabase-js';
import { toast } from "sonner";
import { ensureCompanyAssociation, ApiError as EnsureCompanyApiError } from '@/lib/api';

interface AuthContextType {
  user: AppUser | null;
  session: Session | null;
  isLoading: boolean;
  signInWithPassword: (credentials: SignInWithPasswordCredentials) => Promise<void>;
  signUp: (params: {
    email: string;
    password: string;
    options?: {
      data?: object;
      emailRedirectTo?: string;
    };
  }) => Promise<{ data: { user: SupabaseUser | null; session: Session | null; }; error: AuthError | null; }>;
  signOut: () => Promise<void>;
}

const defaultAuthContextValue: AuthContextType = {
  user: null,
  session: null,
  isLoading: true,
  signInWithPassword: async () => { console.error("signInWithPassword called outside of AuthProvider"); throw new Error("Not initialized"); },
  signUp: async () => { console.error("signUp called outside of AuthProvider"); return { data: { user: null, session: null }, error: new Error("Not initialized") as AuthError }; },
  signOut: async () => { console.error("signOut called outside of AuthProvider"); },
};

const AuthContext = createContext<AuthContextType>(defaultAuthContextValue);

interface AuthProviderProps {
  children: React.ReactNode;
}

const mapSupabaseUserToAppUser = (supabaseUser: SupabaseUser | null | undefined): AppUser | null => {
    if (!supabaseUser) return null;
    const companyIdRaw = supabaseUser.app_metadata?.company_id;
    const companyId = companyIdRaw ? String(companyIdRaw) : undefined;
    const roles = supabaseUser.app_metadata?.roles as string[] | undefined;
    return {
        userId: supabaseUser.id, email: supabaseUser.email,
        name: supabaseUser.user_metadata?.full_name || supabaseUser.user_metadata?.name,
        companyId: companyId, roles: roles,
    };
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const ensureCompanyCallPending = useRef(false);

  const signOut = useCallback(async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) { toast.error("Logout Failed", { description: error.message }); }
      else { console.log("AuthProvider: signOut successful."); }
    } catch (error) { toast.error("Logout Failed", { description: "An unexpected error occurred." }); }
    finally { /* Dejar que onAuthStateChange maneje isLoading */ }
  }, []);

  useEffect(() => {
    console.log("AuthProvider: Setting up auth state listener.");
    setIsLoading(true);
    supabase.auth.getSession().then(async ({ data: { session: initialSession } }) => {
        setSession(initialSession);
        const mappedUser = mapSupabaseUserToAppUser(initialSession?.user);
        setUser(mappedUser);
        if (initialSession && mappedUser && !mappedUser.companyId && !ensureCompanyCallPending.current) {
            ensureCompanyCallPending.current = true;
            try {
                await ensureCompanyAssociation(); await supabase.auth.refreshSession();
            } catch (error) { toast.error("Company Setup Failed", { description: error instanceof EnsureCompanyApiError ? error.message : "Could not associate company." }); }
            finally { ensureCompanyCallPending.current = false; }
        }
        setIsLoading(false);
    }).catch(error => { console.error("AuthProvider: Error fetching initial session:", error); setIsLoading(false); });
    const { data: authListener } = supabase.auth.onAuthStateChange( async (event, newSession) => {
        setSession(newSession); const mappedUser = mapSupabaseUserToAppUser(newSession?.user); setUser(mappedUser);
        if (event === 'SIGNED_IN' && newSession && mappedUser && !mappedUser.companyId && !ensureCompanyCallPending.current) {
            ensureCompanyCallPending.current = true;
            try {
                await ensureCompanyAssociation(); await supabase.auth.refreshSession();
            } catch (error) { toast.error("Company Setup Failed", { description: error instanceof EnsureCompanyApiError ? error.message : "Could not associate company." }); }
            finally { ensureCompanyCallPending.current = false; }
        }
        if (event === 'SIGNED_OUT') { if (pathname?.startsWith('/chat') || pathname?.startsWith('/knowledge') || pathname?.startsWith('/settings')) { router.push('/'); } }
        if (isLoading) setIsLoading(false);
    });
    return () => { authListener?.subscription.unsubscribe(); };
  }, [isLoading, router, pathname, signOut]);

  const signInWithPassword = useCallback(async (credentials: SignInWithPasswordCredentials) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword(credentials);
      if (error) { throw error; }
    } finally { setIsLoading(false); }
  }, []);

  const signUp = useCallback(async (params: {
    email: string;
    password: string;
    options?: {
      data?: object;
      emailRedirectTo?: string;
    };
  }) => {
    setIsLoading(true);
    try {
      const { email, password, options } = params;
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        ...options,
      });
      if (error) {
        toast.error("Registration Failed", { description: error.message || "Could not create account." });
      } else if (data.user && data.user.identities?.length === 0) {
        toast.success("Registration Submitted", { description: `Please check your email (${email}) to confirm.` });
      } else if (data.user) {
        toast.success("Registration Successful");
      } else {
        toast.warning("Registration Status Unknown");
      }
      return { data, error };
    } catch (error) {
      toast.error("Registration Failed", { description: "An unexpected error occurred." });
      return { data: { user: null, session: null }, error: error as AuthError };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const providerValue: AuthContextType = {
    user, session, isLoading, signInWithPassword, signUp, signOut,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) { throw new Error('useAuth must be used within an AuthProvider'); }
    if (context === defaultAuthContextValue && typeof window !== 'undefined') { console.warn("useAuth hook used possibly outside of AuthProvider or before initialization."); }
    return context;
};