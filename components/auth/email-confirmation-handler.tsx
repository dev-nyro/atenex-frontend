// File: components/auth/email-confirmation-handler.tsx
"use client";

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { toast } from "sonner";

// Este componente se monta en una página (ej. '/') y escucha el evento
// SIGNED_IN que Supabase dispara después de procesar el hash de la URL.
export default function EmailConfirmationHandler() {
    const router = useRouter();
    // Usamos una ref para evitar que el efecto se ejecute múltiples veces innecesariamente
    const processedRef = useRef(false);

    useEffect(() => {
        // Solo procesar una vez
        if (processedRef.current) return;

        console.log("EmailConfirmationHandler mounted. Listening for auth changes.");

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log(`EmailConfirmationHandler: Auth event received: ${event}`);

            // El evento clave después de la confirmación es SIGNED_IN (o USER_UPDATED si ya estaba logueado)
            // Y la sesión debería contener el usuario confirmado.
            if ((event === 'SIGNED_IN' || event === 'USER_UPDATED') && session?.user && !processedRef.current) {
                 // Verificar si el email está confirmado (puede que el evento salte antes de que el flag esté 100% actualizado)
                 // Es mejor confiar en que si hay sesión después del flujo de confirmación, está bien.
                 // const { data: { user } } = await supabase.auth.getUser(); // Opcional: Refrescar datos del usuario

                 console.log("Email confirmed or user updated successfully! Session established:", session);
                 toast.success("Account Confirmed!", {
                    description: "You have successfully confirmed your email address.",
                 });

                 processedRef.current = true; // Marcar como procesado

                 // --- Lógica Opcional Post-Confirmación ---
                 // Aquí es donde idealmente llamarías a una Edge Function para asegurarte
                 // de que el usuario existe en tu tabla pública `users` con los metadatos correctos.
                 // Ejemplo (si tuvieras una función 'ensure-user-profile'):
                 // try {
                 //   const { error: funcError } = await supabase.functions.invoke('ensure-user-profile');
                 //   if (funcError) throw funcError;
                 //   console.log("User profile ensured via Edge Function.");
                 // } catch (funcError) {
                 //   console.error("Error calling Edge Function to ensure profile:", funcError);
                 //   toast.error("Profile Sync Error", { description: "Could not sync profile data." });
                 // }
                 // ------------------------------------------

                 // Redirigir al usuario a la página principal o al chat
                 // Usamos replace para que el usuario no pueda volver a la URL con el hash
                 router.replace('/chat'); // O a '/'
            } else if (event === 'PASSWORD_RECOVERY') {
                 // Supabase también dispara este evento si el hash era para reseteo de contraseña
                 console.log("Password recovery flow detected.");
                 // Aquí podrías redirigir a una página específica para cambiar la contraseña
                 // router.replace('/reset-password');
                 toast.info("Password Recovery", { description: "Please set your new password." });
                 processedRef.current = true; // Marcar como procesado
            }

            // Considera manejar otros eventos si son relevantes (SIGNED_OUT, TOKEN_REFRESHED, etc.)
        });

        // Limpiar suscripción al desmontar
        return () => {
            console.log("EmailConfirmationHandler unmounting. Unsubscribing from auth changes.");
            subscription?.unsubscribe();
        };

    }, [router]); // Dependencia del router para la redirección

    // Este componente no renderiza nada visible
    return null;
}