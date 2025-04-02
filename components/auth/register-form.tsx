// File: components/auth/register-form.tsx
// Purpose: Handles user registration using the useAuth hook.
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
import { useAuth } from '@/lib/hooks/useAuth'; // Import the CORRECTED hook
import { AuthError } from '@supabase/supabase-js'; // Import Supabase error type

// Zod schema for registration form validation
// REMOVED companyId - it will be handled by the ensure-company flow after login
const registerSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }).optional(), // Make name optional but validated if provided
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long.' }) // Increased minimum length
    // Optional: Add password complexity requirements if desired
    // .regex(/[a-z]/, { message: "Password must contain a lowercase letter." })
    // .regex(/[A-Z]/, { message: "Password must contain an uppercase letter." })
    // .regex(/[0-9]/, { message: "Password must contain a number." })
    // .regex(/[^a-zA-Z0-9]/, { message: "Password must contain a special character." }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  // Get the signUp function from the auth context
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false); // State to show success message

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '' },
    mode: 'onChange', // Validate on change
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false); // Reset success state on new submission
    try {
      console.log("RegisterForm: Attempting registration for:", data.email);

      // Call the signUp function from the context
      // Pass the name in the options.data field for user_metadata
      const { data: responseData, error: responseError } = await signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            // Include name in user_metadata if provided
            // Use 'full_name' or 'name' depending on your Supabase setup preference
            ...(data.name && { name: data.name }),
          },
          // Optional: Specify where the confirmation email should redirect the user
          // emailRedirectTo: `${window.location.origin}/confirm-email`, // Example redirect
        },
      });

      // Check the response from the signUp function
      if (responseError) {
        // Error occurred during signup
        setError(responseError.message || 'Registration failed. Please try again.');
        setIsLoading(false);
      } else if (responseData.user && !responseData.session) {
        // Success: User created, needs email confirmation
        setSuccess(true);
        // Keep isLoading=true to prevent form resubmission while success message is shown
      } else if (responseData.user && responseData.session) {
         // Success: User created AND logged in (e.g., auto-confirm enabled)
         // AuthProvider will handle the session update and redirect/access.
         console.log("RegisterForm: Sign up successful and session created.");
         // You might want to show a brief success message before redirect,
         // but often the redirect itself is sufficient indication.
         // setSuccess(true); // Optionally show success message briefly
         setIsLoading(false); // Allow potential redirect to happen
      } else {
         // Unexpected outcome
         setError("An unexpected issue occurred during registration. Please try again.");
         setIsLoading(false);
      }

    } catch (err) {
      // Catch unexpected errors during the process
      console.error("RegisterForm: Unexpected error during submission:", err);
      let errorMessage = 'An unexpected error occurred. Please try again later.';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  // If registration was successful, show the confirmation message and hide the form
  if (success) {
    return (
       <Alert variant="default" className="border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-900/30">
          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
          <AlertTitle className="text-green-800 dark:text-green-200">Account Created!</AlertTitle>
          <AlertDescription className="text-green-700 dark:text-green-300">
             Success! Please check your email (<span className="font-medium">{form.getValues('email')}</span>) for a confirmation link to activate your account.
          </AlertDescription>
           <div className="mt-4 text-center">
              <Link href="/login" className={cn(buttonVariants({ variant: "link" }), "text-sm")}>
                 Go to Login
              </Link>
           </div>
       </Alert>
    );
  }

  // Render the form if not successful yet
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" role="alert" aria-live="assertive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Registration Failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Name Input (Optional) */}
      <div className="space-y-1">
        <Label htmlFor="name">Full Name (Optional)</Label>
        <Input
          id="name"
          type="text"
          placeholder="Your Name"
          autoComplete="name"
          disabled={isLoading}
          {...form.register('name')}
          aria-invalid={form.formState.errors.name ? 'true' : 'false'}
        />
        {form.formState.errors.name && (
          <p className="text-sm text-destructive" role="alert">{form.formState.errors.name.message}</p>
        )}
      </div>

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
          placeholder="••••••••"
          autoComplete="new-password"
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
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Create Account'}
      </Button>

      {/* Link to Login */}
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline text-primary hover:text-primary/80 focus:outline-none focus:ring-1 focus:ring-ring rounded-sm">
          Log In
        </Link>
      </div>
    </form>
  );
}