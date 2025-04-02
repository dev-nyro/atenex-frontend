// File: lib/hooks/useAuth.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getToken, setToken, removeToken, getUserFromToken, User } from '@/lib/auth/helpers';
import { useRouter } from 'next/navigation';
import { Session } from '@supabase/supabase-js';
import { createClient } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  signIn: (session: Session) => void;
  logout: () => void;
}

const defaultAuthContextValue: AuthContextType = {
    user: null,
    token: null,
    isLoading: true,
    signIn: (session: Session) => {
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
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedToken = getToken(); // Check localStorage for token
      if (storedToken) {
          // Solo establecer el token, no intentar validarlo
          setAuthStateToken(storedToken);
      }
      setIsLoading(false);
  }, []);


  const signIn = useCallback(async (session: Session) => {
    console.log("useAuth: Login called with session:", session);
    if (!session?.access_token) {
        console.error("useAuth: No access token found in session.");
        return;
    }

    const newToken = session.access_token;
    setToken(newToken);

    let userData = getUserFromToken(newToken);
        if (!userData) {
            console.error("useAuth: Failed to get user from token.");
            return;
        }

    // Fetch user name from DB after setting the token and email and other data found in the token has been set
    try {
       const supabaseClient = createClient(
             process.env.NEXT_PUBLIC_SUPABASE_URL,
             process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
         );

        const { data, error } = await supabaseClient
                 .from('users') // Replace 'users' with the name of your table
                 .select('full_name, company_id') // Replace 'name' with the column containing the user's name
                 .eq('id', userData.id)
                 .single();
        if (error) {
           console.error("Error fetching user data", error);
           setUser(userData);
        } else {
           //If you have other data that needs to be fetched, add the other attributes in here as well
           userData = {
                 ...userData,
                 name: data?.full_name || undefined,
                 companyId: data?.company_id || undefined,
               };
           console.log("Updated user data", userData)
           setUser(userData);
        }
    } catch (error) {
        console.error("Error fetching additional user data:", error);
        setUser(userData);
    }

    // Update user.name from session
    if (session?.user?.user_metadata?.name) {
      userData = {
        ...userData,
        name: session.user.user_metadata.name as string,
      };
      setUser(userData);
    }
    setAuthStateToken(newToken);
    router.push('/');
    console.log("useAuth: User logged in, token set, redirecting home.");
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
      signIn, // added
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