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
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }), // Updated min to 6 for better security
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
    setError(null); // Clear previous errors
    try {
      console.log("Attempting login with:", data.email);
      const token = await loginUser(data);
      console.log("Login successful, received token.");
      setAuthToken(token); // Update auth state and redirect
      // Redirect happens inside useAuth's login function
    } catch (err) {
      console.error("Login failed:", err);
      let errorMessage = 'Login failed. Please check your credentials.';
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
      {/* *** MEJORADO: Mostrar error de forma más prominente *** */}
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
          autoComplete="email" // Added autocomplete
          required
          disabled={isLoading} // Disable input while loading
          {...form.register('email')}
          aria-invalid={form.formState.errors.email ? 'true' : 'false'}
          aria-describedby={form.formState.errors.email ? 'email-error' : undefined}
        />
        {form.formState.errors.email && (
          <p id="email-error" className="text-sm text-destructive">{form.formState.errors.email.message}</p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password" // Added autocomplete
          required
          disabled={isLoading} // Disable input while loading
          {...form.register('password')}
          aria-invalid={form.formState.errors.password ? 'true' : 'false'}
          aria-describedby={form.formState.errors.password ? 'password-error' : undefined}
        />
        {form.formState.errors.password && (
          <p id="password-error" className="text-sm text-destructive">{form.formState.errors.password.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Login'}
      </Button>
       <div className="mt-4 text-center text-sm">
         Don't have an account?{" "}
         <Link href="/register" className="underline text-primary hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-ring rounded-sm">
           Register
         </Link>
       </div>
    </form>
  );
}