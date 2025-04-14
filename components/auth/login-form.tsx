// File: components/auth/login-form.tsx
// Purpose: Handles user login using email and password via the useAuth hook.
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

// Zod schema for login form validation
const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  // Get the signIn function from the auth context
  const { signIn, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginFormValues) => {
    setError(null);
    try {
      await signIn(data.email, data.password);
      // Success: redirection handled by AuthProvider
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" role="alert" aria-live="assertive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Login Failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {/* Email Input */}
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          autoComplete="email"
          required
          disabled={isLoading}
          aria-required="true"
          {...form.register('email')}
          aria-invalid={form.formState.errors.email ? 'true' : 'false'}
        />
        {form.formState.errors.email && (
          <p className="text-sm text-destructive" role="alert">{form.formState.errors.email.message}</p>
        )}
      </div>
      {/* Password Input */}
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
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
        {form.formState.errors.password && (
          <p className="text-sm text-destructive" role="alert">{form.formState.errors.password.message}</p>
        )}
      </div>
      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={isLoading || !form.formState.isValid}>
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Log In'}
      </Button>
    </form>
  );
}