// File: components/auth/register-form.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Loader2, CheckCircle } from 'lucide-react';
// (-) QUITAR import { useAuth } from '@/lib/hooks/useAuth';
import { registerUser, ApiError } from '@/lib/api'; // Importar la NUEVA función de API
import { cn } from '@/lib/utils';

// Zod schema (sin companyId)
const registerSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }).optional(),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long.' }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  // (-) QUITAR const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '' },
    mode: 'onChange',
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    try {
      console.log("RegisterForm: Calling backend registration for:", data.email);

      // (+) LLAMAR A LA NUEVA FUNCIÓN DE API
      await registerUser({
        email: data.email,
        password: data.password,
        name: data.name || null, // Use name and null if empty, matching RegisterUserPayload
        // La compañía 'nyrouwu' se maneja en el backend
      });

      // Si la API tiene éxito (devuelve 200 o 201), mostramos el mensaje de éxito
      setSuccess(true);
      // Mantenemos isLoading para mostrar el mensaje de éxito

    } catch (err) {
        // Capturar errores de la llamada a la API del backend
        console.error("RegisterForm: Backend registration failed:", err);
        let errorMessage = 'Registration failed. Please try again.';
        if (err instanceof ApiError) {
            // Usar el mensaje de error detallado de la API Gateway
            errorMessage = err.message;
             // Puedes añadir mensajes más específicos basados en err.status si lo deseas
             // if (err.status === 409) errorMessage = "An account with this email already exists.";
             // if (err.status === 400) errorMessage = "Invalid data provided or company not found.";
        } else if (err instanceof Error) {
            errorMessage = err.message;
        }
        setError(errorMessage);
        setIsLoading(false); // Detener la carga en error
    }
    // No hay 'finally' aquí, el estado de éxito/error maneja si el formulario sigue visible
  };

  // Mensaje de éxito
  if (success) {
    return (
       <Alert variant="default" className="border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-900/30">
          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
          <AlertTitle className="text-green-800 dark:text-green-200">Account Created!</AlertTitle>
          <AlertDescription className="text-green-700 dark:text-green-300">
             Please check your email (<span className="font-medium">{form.getValues('email')}</span>) for a confirmation link to activate your account.
          </AlertDescription>
           <div className="mt-4 text-center">
              <Link href="/login" className={cn(buttonVariants({ variant: "link" }), "text-sm")}>
                 Go to Login
              </Link>
           </div>
       </Alert>
    );
  }

  // Formulario de registro
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <Alert variant="destructive" role="alert" aria-live="assertive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Registration Failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Campos del formulario (sin cambios) */}
      <div className="space-y-1">
        <Label htmlFor="name">Full Name (Optional)</Label>
        <Input id="name" type="text" placeholder="Your Name" autoComplete="name" disabled={isLoading} {...form.register('name')} aria-invalid={form.formState.errors.name ? 'true' : 'false'}/>
        {form.formState.errors.name && (<p className="text-sm text-destructive" role="alert">{form.formState.errors.name.message}</p>)}
      </div>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="name@example.com" autoComplete="email" required disabled={isLoading} aria-required="true" {...form.register('email')} aria-invalid={form.formState.errors.email ? 'true' : 'false'}/>
        {form.formState.errors.email && (<p className="text-sm text-destructive" role="alert">{form.formState.errors.email.message}</p>)}
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="••••••••" autoComplete="new-password" required disabled={isLoading} aria-required="true" {...form.register('password')} aria-invalid={form.formState.errors.password ? 'true' : 'false'}/>
        {form.formState.errors.password && (<p className="text-sm text-destructive" role="alert">{form.formState.errors.password.message}</p>)}
      </div>

      {/* Botón de envío */}
      <Button type="submit" className="w-full" disabled={isLoading || !form.formState.isValid}>
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Create Account'}
      </Button>

      {/* Enlace a Login */}
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline text-primary hover:text-primary/80 focus:outline-none focus:ring-1 focus:ring-ring rounded-sm">
          Log In
        </Link>
      </div>
    </form>
  );
}
