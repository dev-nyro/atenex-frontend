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
import { useAuth } from '@/lib/hooks/useAuth';
import { ApiError } from '@/lib/api';
import { createClient } from '@supabase/supabase-js';

const loginSchema = z.object({
  email: z.string().email({ message: 'Dirección de correo electrónico no válida' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("Attempting login with:", data.email);

      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        console.error("Supabase URL or Anon Key not set in environment variables.");
        setError("Error de configuración de Supabase. Por favor, comprueba tus variables de entorno.");
        setIsLoading(false);
        return;
      }

      const supabaseClient = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
      const { data: authResponse, error: authError } = await supabaseClient.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (authError) {
        console.error("Supabase login failed:", authError);
        setError(authError.message || 'Error al iniciar sesión. Por favor, verifica tus credenciales.');
      } else if (authResponse.session) {
        console.log("Supabase login successful:", authResponse);
        login(authResponse.session.access_token);
      } else {
        console.error("Supabase login: No session returned");
        setError('Error al iniciar sesión. Por favor, verifica tus credenciales.');
      }
    } catch (err) {
      console.error("Login failed:", err);
      let errorMessage = 'Error al iniciar sesión. Por favor, verifica tus credenciales.';
      if (err instanceof ApiError) {
        errorMessage = err.message || errorMessage;
      } else if (err instanceof Error) {
        errorMessage = err.message || errorMessage;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-1">
        <Label htmlFor="email">Correo electrónico</Label>
        <Input
          id="email"
          type="email"
          placeholder="nombre@ejemplo.com"
          required
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
          required
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