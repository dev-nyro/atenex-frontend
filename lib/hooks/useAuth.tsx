// File: lib/hooks/useAuth.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getToken, setToken, removeToken, getUserFromToken, User } from '@/lib/auth/helpers';
import { useRouter } from 'next/navigation'; // Use next/navigation for App Router

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  // (+) AÑADIR 'signIn' a la definición de AuthContextType
  signIn: (session: any) => void; // Tipo 'any' para la session, adáptalo si tienes un tipo específico
  logout: () => void;
}

// (+) Define un valor por defecto que coincide con la estructura de AuthContextType
const defaultAuthContextValue: AuthContextType = {
    user: null,
    token: null,
    isLoading: true, // Empezar como cargando por defecto si se usa fuera del provider
    signIn: (session: any) => {
        // Función vacía o lanza error si se llama fuera del provider
        console.error("signIn function called outside of AuthProvider context");
        // throw new Error("Login function called outside AuthProvider");
    },
    login: (token: string) => {
        // Función vacía o lanza error si se llama fuera del provider
        console.error("Login function called outside of AuthProvider context");
        // throw new Error("Login function called outside AuthProvider");
    },
    logout: () => {
        // Función vacía o lanza error si se llama fuera del provider
        console.error("Logout function called outside of AuthProvider context");
        // throw new Error("Logout function called outside AuthProvider");
    },
};

// (+) Modifica createContext para usar el valor por defecto y el tipo AuthContextType (sin | undefined)
const AuthContext = createContext<AuthContextType>(defaultAuthContextValue);

// Explicitly type the props for the component, including children
interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setAuthStateToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start loading until token is checked
  const router = useRouter();

  // Check for token on initial load
  useEffect(() => {
    const storedToken = getToken();
    if (storedToken) {
      const userData = getUserFromToken(storedToken);
      if (userData) {
        setUser(userData);
        setAuthStateToken(storedToken);
      } else {
        // Invalid token found
        removeToken();
      }
    }
    setIsLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Nota: getUserFromToken debería ser estable o incluido si no lo es

  const login = useCallback((newToken: string) => {
    setToken(newToken);
    const userData = getUserFromToken(newToken); // Asegúrate que esta función es segura/pura
    setUser(userData);
    setAuthStateToken(newToken);
    // (+) Cambiado a '/' para ir a la página principal después del login
    router.push('/');
    console.log("User logged in, token set.");
  }, [router]); // getUserFromToken no suele necesitar estar aquí si es pura

  const signIn = useCallback((session: any) => {
        // (+) Implementa la lógica de signIn (ej: guardar info de session)
        const newToken = session.access_token; // Asume que session tiene access_token
        setToken(newToken);
        const userData = getUserFromToken(newToken); // Asegúrate que esta función es segura/pura
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

  // El valor proporcionado por el Provider ahora siempre coincide con AuthContextType
  const providerValue = {
      user,
      token,
      isLoading,
      // (+) Asegúrate de que 'signIn' está incluido en el valor del provider
      signIn,
      login,
      logout
  };

  return (
    // Pasa el objeto calculado
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  // La comprobación de undefined ya no es estrictamente necesaria porque
  // createContext ahora tiene un valor por defecto válido, pero
  // mantenerla puede ser útil para detectar errores de configuración inesperados.
  if (context === undefined || context === defaultAuthContextValue) { // (+) Check against default value too
    // Only throw error if it's truly used outside and hasn't received the real value
    if (context === defaultAuthContextValue && typeof window !== 'undefined') { // Avoid throwing during SSR/build if possible
       console.warn("useAuth might be used outside of its Provider or hasn't initialized yet.");
    } else if (context === undefined) {
       throw new Error('useAuth must be used within an AuthProvider');
    }
  }
  return context;
};