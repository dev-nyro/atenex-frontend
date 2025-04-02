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
import { useAuth } from '@/lib/hooks/useAuth';
import { AuthError } from '@supabase/supabase-js';

// --- Esquema Zod SIMPLIFICADO ---
// Ya no necesitamos companyId aquí, el backend lo asignará.
const registerSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }).optional(),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '' }, // Sin companyId
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    // --- Preparar metadata SOLO con nombre ---
    const userMetaDataForSignUp: { [key: string]: any } = {};
    if (data.name) {
        userMetaDataForSignUp.full_name = data.name;
    }
    // ------------------------------------------

    try {
      console.log("RegisterForm: Attempting Supabase signUp for:", data.email);

      const { error: signUpError } = await signUp({
        email: data.email,
        password: data.password,
        options: {
          data: userMetaDataForSignUp,
          emailRedirectTo: typeof window !== 'undefined' ? window.location.origin : undefined,
        },
      });

      if (signUpError) {
        setError(signUpError.message || 'Registration failed.');
        setIsLoading(false);
        return;
      }

      setSuccess(true);
      setError(null);
      // form.reset(); // Opcional

    } catch (err) {
      console.error("RegisterForm: Unexpected error during registration:", err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      if (!success) setIsLoading(false); // Solo detener si no fue éxito
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {error && !success && (
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

      {/* --- CAMPO Company ID ELIMINADO --- */}

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