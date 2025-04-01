// File: components/auth/email-confirmation-handler.tsx
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
//Se tiene que agregar la función de crear cliente para que esté disponible, de otro forma no se puede usar.
import { createClient } from '@supabase/supabase-js';

interface EmailConfirmationHandlerProps {
    onConfirmationComplete: () => void;
}

export default function EmailConfirmationHandler({ onConfirmationComplete }: EmailConfirmationHandlerProps) {
    const router = useRouter();
    //Ahora se destructura el hook
    const { signIn } = useAuth();

    useEffect(() => {
        const handleEmailConfirmation = async () => {
            if (window.location.hash) {
                const params = new URLSearchParams(window.location.hash.substring(1));
                const accessToken = params.get('access_token');
                const refreshToken = params.get('refresh_token');
                const expiresIn = params.get('expires_in');

                if (accessToken && refreshToken && expiresIn) {
                    console.log("Found access token in URL hash:", accessToken);
                    console.log("Attempting to set session and log in.");

                     // Create the supabaseClient
                     const supabaseClient = createClient(
                        process.env.NEXT_PUBLIC_SUPABASE_URL,
                        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
                     );
                    
                     // Use the access token to get the user and full session
                     const { data: { user, session }, error } = await supabaseClient.auth.setSession({
                         access_token: accessToken,
                         refresh_token: refreshToken,
                     })

                     if (error) {
                        console.error("Error setting session:", error);
                     }
                    
                     // If email confirmation has already been performed, then it's set a correct data format to be use on AuthProvider
                     if(session){
                      await signIn(session);
                      router.replace('/'); // Replace current route to remove hash
                     onConfirmationComplete();
                     }
                }
            }
        };

        handleEmailConfirmation();
    }, [signIn, router, onConfirmationComplete]);

    return null; // This component doesn't render anything
}