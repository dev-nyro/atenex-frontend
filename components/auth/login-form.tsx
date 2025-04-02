// File: components/auth/login-form.tsx
// Purpose: Handles user login using email and password via the useAuth hook.
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
import { useAuth } from '@/lib/hooks/useAuth'; // Import the CORRECTED hook
import { AuthError } from '@supabase/supabase-js'; // Import Supabase error type

// Zod schema for login form validation
const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  // Get the signInWithPassword function from the auth context
  const { signInWithPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onChange', // Validate on change for better UX
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("LoginForm: Attempting login for:", data.email);
      // Call the signIn function from the context
      await signInWithPassword({
        email: data.email,
        password: data.password,
      });
      // **Success Handling**: If signInWithPassword succeeds, the AuthProvider's
      // onAuthStateChange listener will detect the SIGNED_IN event, update the
      // session/user state, and AppLayout will handle redirection or allow access.
      // No explicit navigation needed here upon success.
      console.log("LoginForm: signInWithPassword call succeeded. AuthProvider will handle state update.");
      // Keep isLoading true briefly to allow state update and potential redirect.
      // It will be reset by the AuthProvider or if an error occurs below.

    } catch (err) {
      // Catch errors thrown by the signInWithPassword context function
      console.error("LoginForm: signInWithPassword failed:", err);
      let errorMessage = 'Login failed. Please check your credentials and try again.'; // Default error

       // Check if it's a Supabase AuthError for more specific messages
       if (err instanceof AuthError) {
           errorMessage = err.message; // Use Supabase's message
           // Provide more user-friendly messages for common errors
           if (err.message.toLowerCase().includes("invalid login credentials")) {
               errorMessage = "Invalid email or password.";
           } else if (err.message.toLowerCase().includes("email not confirmed")) {
               errorMessage = "Your email address is not confirmed. Please check your inbox.";
           }
           // Add more specific checks if needed (e.g., rate limits)
       } else if (err instanceof Error) {
           // Handle other unexpected errors
           errorMessage = err.message;
       }

      setError(errorMessage);
      setIsLoading(false); // Stop loading indicator on error
    }
     // Removed finally block - isLoading should only be false on error here.
     // On success, let the page transition handle the visual change.
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

      {/* Link to Register */}
      <div className="mt-4 text-center text-sm">
        Don't have an account?{" "}
        <Link href="/register" className="underline text-primary hover:text-primary/80 focus:outline-none focus:ring-1 focus:ring-ring rounded-sm">
          Sign Up
        </Link>
      </div>
       {/* Optional: Forgot Password Link */}
       {/*
       <div className="text-center text-sm mt-2">
         <Link href="/forgot-password" className="underline text-muted-foreground hover:text-primary/90 text-xs">
           Forgot Password?
         </Link>
       </div>
       */}
    </form>
  );
}