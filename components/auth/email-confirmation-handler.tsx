// File: components/auth/email-confirmation-handler.tsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { createClient } from '@supabase/supabase-js';

export default function EmailConfirmationHandler() {
    const router = useRouter();
    const { signIn } = useAuth();
    const [hasConfirmed, setHasConfirmed] = useState(false);

    useEffect(() => {
        if (hasConfirmed) {
            return;
        }

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
                        process.env.NEXT_PUBLIC_SUPABASE_URL!,
                        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
                     );
                    
                     // Use the access token to get the user and full session
                     const { data: { user, session }, error } = await supabaseClient.auth.setSession({
                         access_token: accessToken!,
                         refresh_token: refreshToken!,
                     })

                     if (error) {
                        console.error("Error setting session:", error);
                        return; // Stop further execution if session setup fails
                     }
                    
                    if (session && user) {
                        try {
                            const { error: insertError } = await supabaseClient
                                .from('users')
                                .insert([
                                    {
                                        id: user.id, // Use user.id from the session
                                        email: user.email,
                                        full_name: session.user.user_metadata?.name as string || null, // Use name from session metadata
                                        company_id: session.user.user_metadata?.companyId as string || null, // Use companyId from session metadata
                                        role: 'user',
                                        is_active: true,
                                    }
                                ]);

                            if (insertError) {
                                console.error("Error inserting user into 'users' table:", insertError);
                                if (insertError.code === '23505') {
                                    console.warn("Duplicate user insertion attempted. Ignoring.");
                                }
                            } else {
                                console.log("User inserted into 'users' table successfully.");
                            }
                        } catch (insertErr: any) {
                            console.error("Error during user insertion:", insertErr);
                        }

                        setHasConfirmed(true);
                        await signIn(session);
                        router.replace('/');
                    }
                }
            }
        };

        handleEmailConfirmation();
    }, [signIn, router, hasConfirmed]);

    return null;
}