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

// --- Esquema Zod (Simplificado, sin companyId) ---
const registerSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }).optional(), // El nombre debe tener al menos 2 caracteres
  email: z.string().email({ message: 'Dirección de correo electrónico no válida' }), // Dirección de correo electrónico no válida
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }), // La contraseña debe tener al menos 6 caracteres
  // (+) AÑADIR company_id
  companyId: z.string().uuid({message: 'ID de empresa no válido'}).optional(), // ID de empresa no válido
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '' },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    try {
      console.log("Attempting registration with:", data.email);

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

     console.log("Supabase client created."); // Add this

     // Try signing up the user
     const { data: authResponse, error: authError } = await supabaseClient.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
           data: {
              name: data.name || null,
           },
        },
     });
     console.log("signUp response:", authResponse, authError); // Add this

     if (authError) {
        console.error("Supabase registration failed:", authError);
        setError(authError.message || 'Error al registrarse. Por favor, inténtalo de nuevo.'); // Error al registrarse. Por favor, inténtalo de nuevo.
        setIsLoading(false);
     } else {
        setSuccess(true); // Registration successful, set success state
     }
    } catch (err: any) {
      console.error("Registration failed:", err);
      let errorMessage = 'Error al registrarse. Por favor, inténtalo de nuevo.'; // Error al registrarse. Por favor, inténtalo de nuevo.
      if (err instanceof ApiError) {
        errorMessage = err.message || errorMessage;
      } else if (err instanceof Error) {
        errorMessage = err.message || errorMessage;
      }
      setError(errorMessage);
    } finally {
      // Do not stop isLoading if success to keep the message visible
      if (!success) {
          setIsLoading(false);
      }
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {error && !success && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle> {/* Error */}
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
       {success && (
        <Alert variant="default" className="bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700">
          <AlertTitle className="text-green-800 dark:text-green-200">Éxito</AlertTitle> {/* Éxito */}
          <AlertDescription className="text-green-700 dark:text-green-300">
            ¡Cuenta creada con éxito! Por favor, revisa tu correo electrónico para verificar tu cuenta.
          </AlertDescription> {/* ¡Cuenta creada con éxito! Por favor, revisa tu correo electrónico para verificar tu cuenta. */}
        </Alert>
      )}

      {/* Campos del Formulario */}
      <div className="space-y-1">
        <Label htmlFor="name">Nombre (Opcional)</Label> {/* Nombre (Opcional) */}
        <Input
          id="name"
          type="text"
          placeholder="Tu Nombre"
          {...form.register('name')}
          aria-invalid={form.formState.errors.name ? 'true' : 'false'}
        />
        {form.formState.errors.name && (
          <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="email">Correo electrónico</Label> {/* Correo electrónico */}
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
        <Label htmlFor="password">Contraseña</Label> {/* Contraseña */}
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
      {/* (+) AÑADIR company_id */}
      <div className="space-y-1">
        <Label htmlFor="companyId">ID de empresa (Opcional)</Label> {/* ID de empresa (Opcional) */}
        <Input
          id="companyId"
          type="text"
          placeholder="ID de la empresa"
          {...form.register('companyId')}
          aria-invalid={form.formState.errors.companyId ? 'true' : 'false'}
        />
        {form.formState.errors.companyId && (
          <p className="text-sm text-destructive">{form.formState.errors.companyId.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Crear cuenta'} {/* Crear cuenta */}
      </Button>
      <div className="mt-4 text-center text-sm">
        ¿Ya tienes una cuenta?{" "} {/* ¿Ya tienes una cuenta? */}
        <Link href="/login" className="underline text-primary hover:text-primary/80">
          Iniciar sesión
        </Link>
      </div>
    </form>
  );
}