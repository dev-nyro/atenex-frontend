"use client"; // Needed for hooks like useEffect and useRouter

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth'; // Assuming useAuth handles loading state and token check

export default function RootPage() {
  const { token, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (token) {
        // User is likely logged in, redirect to the main app page (e.g., chat)
        router.replace('/chat'); // Or router.replace('/app'); if you have a dedicated dashboard landing
      } else {
        // User is not logged in, redirect to login page
        router.replace('/login');
      }
    }
  }, [token, isLoading, router]);

  // Render a loading indicator while checking auth status
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p className="ml-4 text-muted-foreground">Loading Atenex...</p>
    </div>
  );
}