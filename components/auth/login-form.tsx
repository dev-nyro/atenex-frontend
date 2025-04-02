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
import { loginUser, ApiError } from '@/lib/api'; // Import ApiError

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }), // Updated min to 6 for better security
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { login: setAuthToken } = useAuth(); // Use the context login function
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
      console.log("LoginForm: Attempting login via API with:", data.email);
      // *** LLAMADA A LA FUNCIÓN loginUser ACTUALIZADA (que apunta al gateway) ***
      const token = await loginUser(data);
      console.log("LoginForm: Login successful, received token.");
      setAuthToken(token); // Update auth state and redirect (redirect happens in useAuth)
      // No necesitas setIsLoading(false) aquí si el redirect tiene éxito
    } catch (err) {
      console.error("LoginForm: Login failed:", err);
      let errorMessage = 'Login failed. Please check your credentials or try again later.'; // Default message
       if (err instanceof ApiError) {
         // Use specific error message from API if available and meaningful
         errorMessage = err.message || errorMessage;
         // Optionally handle specific statuses differently
         if (err.status === 401) {
             errorMessage = "Invalid email or password.";
         } else if (err.status === 0) {
             errorMessage = "Cannot connect to the server. Please check your connection.";
         } else if (err.status >= 500) {
              errorMessage = "Server error during login. Please try again later.";
         }
       } else if (err instanceof Error) {
           // Catch unexpected errors during the process
           errorMessage = err.message || errorMessage;
       }
      setError(errorMessage); // Display the error message to the user
      setIsLoading(false); // Stop loading indicator on error
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