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
import { AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth'; // Importar hook de Auth refactorizado
// import { ApiError } from '@/lib/api'; // Ya no es necesario para errores de login específicos de Supabase
import { AuthError } from '@supabase/supabase-js'; // Importar tipo de error de Supabase

const loginSchema = z.object({
  email: z.string().email({ message: 'Dirección de correo electrónico no válida' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  // --- CORRECCIÓN: Usar signInWithPassword del contexto useAuth ---
  const { signInWithPassword } = useAuth();
  // ----------------------------------------------------------
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("LoginForm: Attempting login with:", data.email);
      // Llamar a la función del contexto que encapsula supabase.auth.signInWithPassword
      await signInWithPassword({
        email: data.email,
        password: data.password,
      });
      // Si la función signInWithPassword tiene éxito, la redirección
      // o actualización de estado será manejada por el AuthProvider o AppLayout.
      // No es necesario hacer nada más aquí en caso de éxito.
      console.log("LoginForm: signInWithPassword call succeeded (further actions handled by AuthProvider).");
      // No detener isLoading aquí, dejar que el cambio de estado lo haga.

    } catch (err) {
      // El hook signInWithPassword debería haber lanzado un error en caso de fallo
      console.error("LoginForm: signInWithPassword failed:", err);
      let errorMessage = 'Login failed. Please check your credentials.';
       // Usar AuthError de Supabase para mensajes específicos
       if (err instanceof AuthError) {
           errorMessage = err.message || errorMessage;
           // Puedes añadir lógica específica para códigos de error si es necesario
           if (err.message.includes("Invalid login credentials")) {
               errorMessage = "Invalid email or password.";
           } else if (err.message.includes("Email not confirmed")) {
               errorMessage = "Please confirm your email address first.";
           }
       } else if (err instanceof Error) {
           // Otros errores (poco probables aquí si el hook maneja bien)
           errorMessage = err.message;
       }
      setError(errorMessage);
      setIsLoading(false); // Detener carga solo en caso de error
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <Alert variant="destructive" role="alert">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Login Failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-1">
        <Label htmlFor="email">Correo electrónico</Label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          autoComplete="email"
          required
          disabled={isLoading}
          {...form.register('email')}
          aria-invalid={form.formState.errors.email ? 'true' : 'false'}
        />
        {form.formState.errors.email && (
          <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          disabled={isLoading}
          {...form.register('password')}
          aria-invalid={form.formState.errors.password ? 'true' : 'false'}
        />
        {form.formState.errors.password && (
          <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Iniciar sesión'}
      </Button>
      <div className="mt-4 text-center text-sm">
        ¿No tienes una cuenta?{" "}
        <Link href="/register" className="underline text-primary hover:text-primary/80">
          Registrarse
        </Link>
      </div>
    </form>
  );
}