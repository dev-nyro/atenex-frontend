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
import { AlertCircle, Loader2, CheckCircle } from 'lucide-react';
// import { supabase } from '@/lib/supabaseClient'; // Ya no se usa directamente
import { useAuth } from '@/lib/hooks/useAuth'; // Importar hook refactorizado
import { AuthError } from '@supabase/supabase-js'; // Importar tipo de error

// Esquema Zod (sin cambios, companyId sigue siendo opcional aquí)
const registerSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }).optional(),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  companyId: z.string().uuid({ message: "Invalid Company ID format (UUID expected)" }).optional(),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

// Valor por defecto para Company ID (Desarrollo)
const DEFAULT_DEV_COMPANY_ID = process.env.NEXT_PUBLIC_DEV_COMPANY_ID || '';

export function RegisterForm() {
  // --- CORRECCIÓN: Usar signUp del contexto useAuth ---
  const { signUp } = useAuth();
  // -------------------------------------------------
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false); // Para mostrar mensaje de confirmación

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      // Pre-rellenar companyId en desarrollo si está disponible
      companyId: process.env.NODE_ENV === 'development' && DEFAULT_DEV_COMPANY_ID ? DEFAULT_DEV_COMPANY_ID : '',
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    // --- Preparar metadata para user_metadata ---
    // Incluir nombre y, si se proporciona, el companyId como referencia (signup_company_id_ref)
    // Un trigger/función backend en Supabase DEBERÍA leer 'signup_company_id_ref' de user_metadata
    // y copiarlo a app_metadata.company_id de forma segura.
    const userMetaDataForSignUp: { [key: string]: any } = {};
    if (data.name) {
        userMetaDataForSignUp.full_name = data.name;
    }
    if (data.companyId) {
        // ¡Importante! Esto solo sirve como referencia para el backend.
        // NO otorga acceso basado en companyId directamente.
        userMetaDataForSignUp.signup_company_id_ref = data.companyId;
        console.warn(`RegisterForm: Sending companyId (${data.companyId}) in user_metadata.signup_company_id_ref. Ensure backend logic moves it to app_metadata.`);
    }
    // ------------------------------------------

    try {
      console.log("RegisterForm: Attempting Supabase signUp for:", data.email);

      // Llamar a la función signUp del contexto
      const { data: signUpData, error: signUpError } = await signUp({
        email: data.email,
        password: data.password,
        options: {
          // Pasar metadata preparada a user_metadata
          data: userMetaDataForSignUp,
          // Redirección para confirmación de email (si aplica)
          emailRedirectTo: typeof window !== 'undefined' ? window.location.origin : undefined,
        },
      });

      // El hook useAuth ya maneja las notificaciones (toast)
      if (signUpError) {
        // El hook ya mostró el toast, solo actualizamos el estado local de error
        setError(signUpError.message || 'Registration failed.');
        setIsLoading(false); // Detener carga en error
        return;
      }

      // Si no hubo error, asumimos éxito (requiere confirmación o no)
      // El hook useAuth ya mostró el toast de éxito/confirmación
      setSuccess(true); // Mostrar mensaje de éxito/revisar email en el formulario
      setError(null);
      // form.reset(); // Opcional: Limpiar formulario en éxito

    } catch (err) {
      // Capturar errores inesperados si el hook no los maneja completamente
      console.error("RegisterForm: Unexpected error during registration:", err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
      // Asegurar que el toast de error se muestre (aunque el hook debería hacerlo)
      // toast.error("Registration Failed", { description: error || 'An unexpected error occurred.' });
    } finally {
      // Detener carga solo si no fue exitoso (para mantener el mensaje de éxito visible)
      if (!success) setIsLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {error && !success && ( // Mostrar error solo si no hay éxito
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

      {/* Campos del Formulario (deshabilitados en éxito o carga) */}
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
       {/* Campo Company ID (opcional, principalmente para desarrollo/triggers) */}
       <div className="space-y-1">
         <Label htmlFor="companyId">Company ID (Optional)</Label>
         <Input
            id="companyId"
            type="text"
            placeholder="Enter Company UUID (if provided)"
            {...form.register('companyId')}
            disabled={isLoading || success}
         />
         {form.formState.errors.companyId && <p className="text-sm text-destructive">{form.formState.errors.companyId.message}</p>}
         <p className="text-xs text-muted-foreground pt-1">
            Usually assigned automatically. Only fill if instructed.
         </p>
       </div>

      {/* Botón de Envío */}
      <Button type="submit" className="w-full" disabled={isLoading || success}>
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Create Account'}
      </Button>

      {/* Enlace a Login */}
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline text-primary hover:text-primary/80">
          Login
        </Link>
      </div>
    </form>
  );
}