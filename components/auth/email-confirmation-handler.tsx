// File: components/auth/email-confirmation-handler.tsx
"use client";

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient'; // Usar el cliente global
import { toast } from "sonner";

// Este componente se monta en una página pública (ej. '/')
// y escucha el evento SIGNED_IN que Supabase dispara después
// de procesar el hash de la URL de confirmación.
export default function EmailConfirmationHandler() {
    const router = useRouter();
    // Usamos una ref para evitar que el efecto se ejecute múltiples veces
    // si el componente se re-renderiza por otras razones.
    const processedAuthEvent = useRef(false);

    useEffect(() => {
        // Si ya hemos procesado un evento, no hacer nada más.
        if (processedAuthEvent.current) {
            return;
        }

        console.log("EmailConfirmationHandler: Mounted. Setting up listener.");

        // Escuchar cambios de autenticación. El evento clave es SIGNED_IN
        // que ocurre después de que Supabase procesa el hash de la URL.
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                // Solo actuar en el evento SIGNED_IN y si no lo hemos procesado ya.
                if (event === 'SIGNED_IN' && session && !processedAuthEvent.current) {
                    console.log("EmailConfirmationHandler: Detected SIGNED_IN event after email confirmation.");
                    processedAuthEvent.current = true; // Marcar como procesado

                    // Mostrar notificación de éxito
                    toast.success("Email Confirmed", {
                        description: "Your email address has been successfully confirmed. You are now logged in.",
                    });

                    // Redirigir al usuario a la aplicación principal (ej. /chat)
                    // Usamos replace para no añadir la URL de confirmación al historial
                    router.replace('/chat');

                } else if (event === 'PASSWORD_RECOVERY') {
                     // Manejar evento de recuperación de contraseña si es necesario
                     console.log("EmailConfirmationHandler: Detected PASSWORD_RECOVERY event.");
                     // Podrías redirigir a una página de cambio de contraseña o mostrar un mensaje.
                     // Por ahora, solo lo logueamos.
                     toast.info("Password Recovery", { description: "Please follow the instructions to set a new password." });
                     // router.push('/update-password'); // Ejemplo de redirección
                }
            }
        );

        // Limpieza del listener al desmontar el componente
        return () => {
            console.log("EmailConfirmationHandler: Unmounting. Unsubscribing listener.");
            authListener?.subscription.unsubscribe();
        };

    // Solo ejecutar este efecto una vez al montar el componente
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Dependencias vacías para ejecutar solo al montar

    // Este componente no renderiza nada visible
    return null;
}