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
import { useAuth } from '@/lib/hooks/useAuth'; // Importar hook de Auth
import { ApiError } from '@/lib/api'; // ApiError sigue siendo útil para errores generales

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { signIn } = useAuth(); // <-- Usar signIn del contexto
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
      console.log("LoginForm: Calling signIn with:", data.email);
      await signIn(data); // <-- Llamar a la función signIn del hook
      // La redirección ocurrirá dentro del hook si tiene éxito
      // No necesitas hacer nada más aquí en caso de éxito
      console.log("LoginForm: signIn initiated successfully.");
    } catch (err) {
      // El hook signIn debería lanzar un error en caso de fallo
      console.error("LoginForm: signIn failed:", err);
      let errorMessage = 'Login failed. Please check your credentials.';
       // Usar ApiError para mostrar el mensaje específico si viene del hook
       if (err instanceof ApiError) {
         errorMessage = err.message || errorMessage;
         if (err.status === 400) { // Supabase suele usar 400 para credenciales inválidas
             errorMessage = "Invalid email or password.";
         }
       } else if (err instanceof Error) {
         errorMessage = err.message;
       }
      setError(errorMessage);
      setIsLoading(false); // Detener carga solo en caso de error
    }
    // No poner setIsLoading(false) aquí, el estado de carga se maneja en el hook/página
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
        <Label htmlFor="email">Email</Label>
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
        <Label htmlFor="password">Password</Label>
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
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Login'}
      </Button>
       <div className="mt-4 text-center text-sm">
         Don't have an account?{" "}
         <Link href="/register" className="underline text-primary hover:text-primary/80">
           Register
         </Link>
       </div>
    </form>
  );
}