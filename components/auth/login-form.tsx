// File: components/auth/login-form.tsx
"use client";

import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';

// Esquema Zod con mensajes en español
const loginSchema = z.object({
  email: z.string().email({ message: 'Por favor, introduce una dirección de correo válida.' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { signIn, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onChange', // Validar al cambiar
  });

  const onSubmit = async (data: LoginFormValues) => {
    setError(null);
    try {
      await signIn(data.email, data.password);
      // Éxito: redirección manejada por AuthProvider
    } catch (err: any) {
      // Usar el mensaje de error de la API si está disponible, si no, uno genérico en español
      setError(err.message || 'Inicio de sesión fallido. Revisa tus credenciales e inténtalo de nuevo.');
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {/* Alerta de Error */}
      {error && (
        <Alert variant="destructive" role="alert" aria-live="assertive">
          <AlertCircle className="h-4 w-4" />
          {/* Título de Alerta Traducido */}
          <AlertTitle>Inicio de Sesión Fallido</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {/* Campo Email */}
      <div className="space-y-1">
        {/* Label Traducido */}
        <Label htmlFor="email">Correo Electrónico</Label>
        <Input
          id="email"
          type="email"
          placeholder="nombre@ejemplo.com"
          autoComplete="email"
          required
          disabled={isLoading}
          aria-required="true"
          {...form.register('email')}
          aria-invalid={form.formState.errors.email ? 'true' : 'false'}
        />
        {/* Mensaje de error de validación (ya en español por el schema) */}
        {form.formState.errors.email && (
          <p className="text-sm text-destructive" role="alert">{form.formState.errors.email.message}</p>
        )}
      </div>
      {/* Campo Contraseña */}
      <div className="space-y-1">
        {/* Label Traducido */}
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          disabled={isLoading}
          aria-required="true"
          {...form.register('password')}
          aria-invalid={form.formState.errors.password ? 'true' : 'false'}
        />
        {/* Mensaje de error de validación (ya en español por el schema) */}
        {form.formState.errors.password && (
          <p className="text-sm text-destructive" role="alert">{form.formState.errors.password.message}</p>
        )}
      </div>
      {/* Botón de Envío Traducido */}
      <Button type="submit" className="w-full" disabled={isLoading || !form.formState.isValid}>
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Iniciar Sesión'}
      </Button>
    </form>
  );
}