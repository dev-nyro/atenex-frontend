// File: components/auth/register-form.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Loader2, CheckCircle } from 'lucide-react'; // Añadir CheckCircle
import { supabase } from '@/lib/supabaseClient'; // Importar cliente Supabase
import { AuthApiError } from '@supabase/supabase-js'; // Tipo de error específico de Supabase Auth

// Esquema Zod incluyendo companyId (opcional por ahora, pero recomendable hacerlo requerido si aplica)
const registerSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }).optional(),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  // Hacer companyId requerido si siempre debe asociarse una compañía al registrarse
  companyId: z.string().uuid({ message: "Invalid Company ID format (UUID expected)" }).optional(),
  // Podrías añadir confirmPassword si quieres validación en el frontend
});

type RegisterFormValues = z.infer<typeof registerSchema>;

// --- VALOR POR DEFECTO PARA COMPANY ID (SOLO PARA DESARROLLO/PRUEBAS) ---
// ¡¡¡IMPORTANTE!!! En un entorno real, este ID debería venir de alguna parte
// (ej. selección del usuario, invitación, URL específica, etc.)
// NO deberías tener un ID fijo quemado aquí en producción.
const DEFAULT_DEV_COMPANY_ID = process.env.NEXT_PUBLIC_DEV_COMPANY_ID || '';
// --------------------------------------------------------------------

export function RegisterForm() {
  // No necesitamos useAuth aquí directamente para el registro inicial
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false); // Para mensaje de confirmación

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      companyId: process.env.NODE_ENV === 'development' && DEFAULT_DEV_COMPANY_ID ? DEFAULT_DEV_COMPANY_ID : '', // Usar valor por defecto en dev
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    // Construir metadata para Supabase
    const userMetaData = { full_name: data.name || null };
    // ¡IMPORTANTE! Datos como company_id o roles van en app_metadata
    const appMetaData = {
        // Si companyId no se proporciona en el form (es opcional), no lo incluimos
        ...(data.companyId && { company_id: data.companyId }),
        // Podrías añadir roles por defecto aquí si aplica
        // roles: ['user'],
    };

    try {
      console.log("RegisterForm: Attempting Supabase signUp for:", data.email);

      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          // Datos que el usuario puede ver/editar (a través de updateUser)
          data: userMetaData,
          // Datos que solo la app/backend debería gestionar (se añaden al token)
          // ¡¡ASEGÚRATE QUE ESTO FUNCIONA!! Supabase puede requerir configuración adicional
          // o que estos datos se añadan post-registro vía backend/trigger.
          // La documentación indica que 'data' en signUp va a user_metadata.
          // Para app_metadata, a menudo se necesita un paso adicional (trigger/función).
          // Vamos a intentar pasarlo aquí, pero verifica que se guarde correctamente.
           app_metadata: appMetaData, // <--- INTENTO de pasar app_metadata

           // --- IMPORTANTE: Redirección para Confirmación ---
           // Especifica a dónde debe redirigir Supabase DESPUÉS de que el usuario
           // haga clic en el enlace de confirmación en su correo.
           // Debe ser una página en tu app que pueda manejar la sesión (usualmente la raíz o login).
           emailRedirectTo: window.location.origin, // Redirige a la página actual (ej. https://tuapp.vercel.app/)
        },
      });

      if (signUpError) {
        // Manejar errores específicos de Supabase
        console.error("Supabase signUp error:", signUpError);
        if (signUpError instanceof AuthApiError && signUpError.message.includes("User already registered")) {
             setError("This email is already registered. Try logging in.");
        } else {
            setError(signUpError.message || 'Registration failed. Please try again.');
        }
        setIsLoading(false);
        return; // Detener si hay error
      }

      console.log("Supabase signUp successful:", signUpData);

      // Verificar si se requiere confirmación por correo (configuración por defecto en Supabase)
      if (signUpData.user && signUpData.user.identities?.length === 0) {
          // Esto indica que el usuario existe pero necesita confirmar su email
          console.log("Registration requires email confirmation.");
          setSuccess(true); // Mostrar mensaje de éxito/confirmación
          setError(null);
      } else if (signUpData.user) {
           // Si la confirmación no está habilitada (o es login con OAuth), el usuario ya está activo
           console.log("User registered and automatically confirmed (or confirmation disabled).");
           // Podrías intentar loguearlo aquí, pero es mejor esperar a onAuthStateChange
           setSuccess(true); // Mostrar mensaje genérico de éxito
           setError("Registration successful! You might be logged in automatically."); // Mensaje informativo
      } else {
           // Caso inesperado
           console.warn("SignUp completed but no user data returned and no confirmation needed?");
           setError("Registration completed with unexpected status. Please try logging in.");
      }

    } catch (err) { // Captura errores generales del proceso
      console.error("Unexpected error during registration:", err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Registration Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
       {success && ( // Mostrar mensaje de éxito/confirmación
        <Alert variant="default" className="bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700">
           <CheckCircle className="h-4 w-4 text-green-700 dark:text-green-300" />
          <AlertTitle className="text-green-800 dark:text-green-200">Registration Submitted</AlertTitle>
          <AlertDescription className="text-green-700 dark:text-green-300">
            Please check your email ({form.getValues("email")}) to confirm your account.
          </AlertDescription>
        </Alert>
      )}
      {/* --- Campos del Formulario --- */}
      <div className="space-y-1">
        <Label htmlFor="name">Name (Optional)</Label>
        <Input id="name" type="text" placeholder="Your Name" {...form.register('name')} disabled={isLoading || success}/>
         {form.formState.errors.name && <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>}
      </div>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="name@example.com" required {...form.register('email')} disabled={isLoading || success}/>
        {form.formState.errors.email && <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>}
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" required {...form.register('password')} disabled={isLoading || success}/>
        {form.formState.errors.password && <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>}
      </div>
      {/* Campo Company ID (Opcional por defecto, basado en schema) */}
      {/* Oculta este campo si no quieres que el usuario lo ingrese manualmente */}
      {/* O hazlo visible y requerido si es necesario */}
       <div className="space-y-1">
         <Label htmlFor="companyId">Company ID (Optional - Dev Only)</Label>
         <Input id="companyId" type="text" placeholder="Enter Company UUID" {...form.register('companyId')} disabled={isLoading || success}/>
         {form.formState.errors.companyId && <p className="text-sm text-destructive">{form.formState.errors.companyId.message}</p>}
       </div>
      {/* ----------------------------- */}
      <Button type="submit" className="w-full" disabled={isLoading || success}>
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Create Account'}
      </Button>
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline text-primary hover:text-primary/80">
          Login
        </Link>
      </div>
    </form>
  );
}