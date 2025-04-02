// File: app/(app)/layout.tsx
// Purpose: Layout for authenticated sections, handling route protection.
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { useAuth } from '@/lib/hooks/useAuth'; // Import the CORRECTED hook
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react'; // For loading spinner
// --- CORRECTION: Import toast from sonner ---
import { toast } from 'sonner';
// ------------------------------------------

export default function AppLayout({ children }: { children: React.ReactNode }) {
  // Get auth state from the hook
  const { session, user, isLoading, signOut } = useAuth();
  const router = useRouter();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Determine if authentication bypass is enabled (for local dev)
  const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';

  useEffect(() => {
    // 1. Handle Bypass: If bypass is active, log it and do nothing else.
    if (bypassAuth) {
      console.warn("AppLayout: Auth check SKIPPED due to NEXT_PUBLIC_BYPASS_AUTH=true.");
      return;
    }

    // 2. Handle Loading: If auth state is still loading, do nothing yet.
    if (isLoading) {
      console.log("AppLayout: Waiting for auth state to load...");
      return;
    }

    // 3. Handle No Session: If auth has loaded and there's NO session, redirect to login/home.
    if (!session) {
      console.log("AppLayout: No session found after loading, redirecting to /");
      router.replace('/'); // Use replace to avoid adding to browser history
      return;
    }

    // 4. Handle Session OK, but Missing Critical User Data (e.g., companyId):
    // If a session exists, but the mapped 'user' object is null or lacks essential data
    // (like companyId, if it's strictly required *after* the ensure-company flow),
    // it might indicate an incomplete setup or inconsistent state.
    // The API Gateway requires companyId for most backend calls.
    // The ensure-company flow in useAuth should handle adding it, but if something
    // goes wrong or the user state is invalid, we might need to force a logout.
    if (session && (!user || !user.companyId)) {
        // This condition checks if we have a session, but the user mapping failed OR
        // the user is mapped but explicitly lacks a companyId AFTER the initial auth flow.
        console.error(`AppLayout: Session exists but user data is incomplete (User: ${!!user}, CompanyID: ${user?.companyId}). Forcing logout.`);
        // --- CORRECTION: 'toast' is now defined via import ---
        toast.error("Incomplete Account Setup", {
            description: "Your account setup seems incomplete (missing company association). Please log in again.",
            duration: 7000,
        });
        // ----------------------------------------------------
        signOut(); // Force sign out
        // No need to redirect here, signOut will trigger an auth state change,
        // leading to the !session condition above in the next effect run.
        return;
    }

    // 5. Authenticated and Valid: If we reach here, isLoading is false, session exists,
    // and the user object (with companyId) is valid. Allow rendering.
    console.log("AppLayout: Auth check passed. User is authenticated and valid.");

  // Dependencies: Trigger effect when loading state, session, user, or bypass status changes.
  // Include router and signOut as they are used within the effect.
  }, [isLoading, session, user, bypassAuth, router, signOut]);

  // --- Render Loading State ---
  // Show a full-screen loader ONLY if bypass is OFF AND auth is loading.
  if (!bypassAuth && isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        {/* Optional: Add loading text */}
         <p className="mt-4 text-muted-foreground">Loading session...</p>
      </div>
    );
  }

  // --- Render Auth Wall ---
  // Prevent rendering the protected layout if bypass is OFF AND
  // (auth is still loading OR there's no session OR user data is invalid)
  // This prevents content flashing before redirection or state resolution.
  if (!bypassAuth && (isLoading || !session || !user || !user.companyId)) {
     // We already handle redirection in useEffect. Render null or a minimal loader
     // while waiting for the redirect or state update. Using the same loader
     // as above provides consistency.
     console.log("AppLayout: Auth guard preventing render (isLoading, no session, or invalid user).");
     return (
       <div className="flex h-screen items-center justify-center bg-background">
         <Loader2 className="h-12 w-12 animate-spin text-primary" />
       </div>
     );
  }

  // --- Render Protected Layout ---
  // If we reach here, user is authenticated (or bypass is on).
  console.log("AppLayout: Rendering protected layout...");
  return (
    <div className="flex h-screen bg-secondary/30 dark:bg-muted/30 overflow-hidden">
      <ResizablePanelGroup direction="horizontal" className="h-full items-stretch">
          <ResizablePanel
              collapsible collapsedSize={4} minSize={15} maxSize={25} defaultSize={20}
              onCollapse={() => setIsSidebarCollapsed(true)}
              onExpand={() => setIsSidebarCollapsed(false)}
              className={cn(
                  "transition-all duration-300 ease-in-out bg-background dark:bg-card", // Added background color
                  isSidebarCollapsed ? "min-w-[50px] max-w-[50px]" : "min-w-[200px]"
              )}
              order={1} // Ensure sidebar comes first visually
          >
              {/* Pass isCollapsed state to Sidebar */}
              <Sidebar isCollapsed={isSidebarCollapsed} />
          </ResizablePanel>
          <ResizableHandle withHandle className="bg-border" />
          <ResizablePanel defaultSize={80} minSize={30} order={2}>
              <div className="flex h-full flex-col">
                  {/* Header component - No need to pass props if Header uses useAuth directly */}
                  <Header />
                  <main className="flex-1 overflow-y-auto bg-background p-4 md:p-6 lg:p-8">
                      {/* Render the specific page content */}
                      {children}
                  </main>
              </div>
          </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}