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
import { supabase } from '@/lib/supabaseClient';
import { AuthApiError } from '@supabase/supabase-js';

// Esquema Zod
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      companyId: process.env.NODE_ENV === 'development' && DEFAULT_DEV_COMPANY_ID ? DEFAULT_DEV_COMPANY_ID : '',
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    // Metadata para user_metadata (lo que el usuario puede gestionar)
    const userMetaData = { full_name: data.name || null };

    // --- IMPORTANTE ---
    // El companyId (y roles) idealmente van en app_metadata, pero NO se pueden
    // establecer directamente desde el cliente con signUp.
    // Se debe usar un TRIGGER en la base de datos Supabase (en la tabla auth.users)
    // o una Edge Function llamada después para copiar esta información
    // (posiblemente desde user_metadata o una tabla intermedia) a app_metadata
    // o a tu tabla pública de perfiles.
    //
    // Por ahora, si recogemos companyId en el form, podríamos pasarlo en 'data'
    // para que el trigger lo pueda leer desde user_metadata, o ignorarlo aquí
    // si el trigger lo obtiene de otra fuente.
    //
    // Opción 1: Pasar companyId DENTRO de 'data' (user_metadata) para que un trigger lo lea
    // const userMetaDataWithCompany = { ...userMetaData, dev_company_id_ref: data.companyId };

    // Opción 2: No pasar companyId aquí y confiar en que el trigger/backend lo obtendrá
    // (por ejemplo, si el usuario se registra a través de una URL de invitación específica de la compañía)

    // Usaremos la Opción 1 por ahora como ejemplo, asumiendo un trigger leerá dev_company_id_ref
    const userMetaDataForSignUp = {
        ...userMetaData,
        // Añadimos companyId aquí temporalmente para que un trigger lo pueda leer
        // ¡CUIDADO! Esto es visible/editable por el usuario via updateUser.
        // Una solución más segura es usar un endpoint backend o Edge Function post-registro.
        company_id_signup_ref: data.companyId || null,
    };
    // ------------------

    try {
      console.log("RegisterForm: Attempting Supabase signUp for:", data.email);

      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          // Pasar metadata a user_metadata
          data: userMetaDataForSignUp, // <-- Usar los datos preparados

          // --- NO SE PUEDE PASAR app_metadata DESDE EL CLIENTE ---
          // app_metadata: appMetaData, // <-- ESTA LÍNEA CAUSABA EL ERROR Y SE ELIMINA

          // Redirección para confirmación de email
          emailRedirectTo: window.location.origin,
        },
      });

      if (signUpError) {
        console.error("Supabase signUp error:", signUpError);
        if (signUpError instanceof AuthApiError && signUpError.message.includes("User already registered")) {
             setError("This email is already registered. Try logging in.");
        } else {
            setError(signUpError.message || 'Registration failed. Please try again.');
        }
        setIsLoading(false);
        return;
      }

      console.log("Supabase signUp successful:", signUpData);

      // Manejo de éxito y confirmación de email
      if (signUpData.user && signUpData.user.identities?.length === 0) {
          setSuccess(true); setError(null);
      } else if (signUpData.user) {
           setSuccess(true); setError("Registration successful! You might be logged in automatically.");
      } else {
           setError("Registration completed with unexpected status. Please try logging in.");
      }

    } catch (err) {
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
       {success && (
        <Alert variant="default" className="bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700">
           <CheckCircle className="h-4 w-4 text-green-700 dark:text-green-300" />
          <AlertTitle className="text-green-800 dark:text-green-200">Registration Submitted</AlertTitle>
          <AlertDescription className="text-green-700 dark:text-green-300">
            Please check your email ({form.getValues("email")}) to confirm your account.
          </AlertDescription>
        </Alert>
      )}
      {/* Campos del Formulario */}
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
       <div className="space-y-1">
         <Label htmlFor="companyId">Company ID (Optional - Dev Only)</Label>
         <Input id="companyId" type="text" placeholder="Enter Company UUID" {...form.register('companyId')} disabled={isLoading || success}/>
         {form.formState.errors.companyId && <p className="text-sm text-destructive">{form.formState.errors.companyId.message}</p>}
       </div>
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