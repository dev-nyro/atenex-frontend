// File: app/(app)/layout.tsx
// Purpose: Layout for authenticated sections, handling route protection.
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { useAuth } from '@/lib/hooks/useAuth';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { session, user, isLoading, signOut } = useAuth();
  const router = useRouter();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';

  // Ref to track if the "incomplete setup" warning has been shown for this session load
  const incompleteSetupWarningShown = useRef(false);

  useEffect(() => {
    // Reset warning flag if session or user changes significantly (e.g., new login)
    incompleteSetupWarningShown.current = false;
  }, [session?.user.id]); // Reset based on user ID change

  useEffect(() => {
    if (bypassAuth) {
      console.warn("AppLayout: Auth check SKIPPED (Bypass).");
      return;
    }

    // Don't redirect or evaluate further if auth state is still loading
    if (isLoading) {
      console.log("AppLayout: Waiting for auth state...");
      return;
    }

    // If loading is finished and there's no session, redirect to home/login
    if (!session) {
      console.log("AppLayout: No session found after loading, redirecting to /");
      router.replace('/');
      return;
    }

    // If session exists, but user mapping failed OR user lacks companyId
    // *after* the initial loading/association attempt should be complete.
    // This state indicates a problem (e.g., ensure-company failed silently or token didn't update).
    if (session && (!user || !user.companyId)) {
       // Only show the toast ONCE per session load attempt to avoid repetition
       if (!incompleteSetupWarningShown.current) {
          console.error(`AppLayout: Session exists but user data is incomplete (User: ${!!user}, CompanyID: ${user?.companyId}). Showing warning.`);
          toast.error("Incomplete Account Setup", {
             description: "Your account setup seems incomplete (missing company association). Attempting to resolve or please log in again.",
             duration: 8000, // Longer duration
             id: "incomplete-setup-warn", // Prevent duplicates
          });
          incompleteSetupWarningShown.current = true; // Mark as shown for this session instance
       }
       // Optionally force logout immediately:
       // signOut();
       // Or let the user stay but potentially face API errors (depends on desired UX)
       return; // Don't proceed to render children if state is known to be invalid
    }

    // If we reach here: Loading is false, session exists, user exists, user.companyId exists.
    console.log("AppLayout: Auth check passed.");
    // Reset warning flag if we reach a valid state
    incompleteSetupWarningShown.current = false;

  }, [isLoading, session, user, bypassAuth, router, signOut]); // Dependencies

  // --- Render Loading State ---
  if (!bypassAuth && isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading session...</p>
      </div>
    );
  }

  // --- Render Auth Wall / Incomplete State Blocker ---
  // Prevent rendering children if:
  // 1. Auth is NOT bypassed AND
  // 2. EITHER (a) auth is still loading OR (b) loading is done but there's no session OR (c) user data is incomplete
  const shouldBlockRender = !bypassAuth && (isLoading || !session || !user || !user.companyId);

  if (shouldBlockRender) {
      console.log("AppLayout: Auth guard preventing render.");
      // Render a loader or null while waiting for redirect or state resolution
      return (
        <div className="flex h-screen items-center justify-center bg-background">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
           {/* Optionally show a message if blocked due to incomplete setup */}
           {!isLoading && session && (!user || !user.companyId) && (
              <p className="mt-4 text-destructive">Resolving account setup...</p>
           )}
        </div>
      );
  }

  // --- Render Protected Layout ---
  console.log("AppLayout: Rendering protected layout...");
  return (
     <div className="flex h-screen bg-secondary/30 dark:bg-muted/30 overflow-hidden">
      <ResizablePanelGroup direction="horizontal" className="h-full items-stretch">
          <ResizablePanel
              collapsible collapsedSize={4} minSize={15} maxSize={25} defaultSize={20}
              onCollapse={() => setIsSidebarCollapsed(true)}
              onExpand={() => setIsSidebarCollapsed(false)}
              className={cn(
                  "transition-all duration-300 ease-in-out bg-background dark:bg-card",
                  isSidebarCollapsed ? "min-w-[50px] max-w-[50px]" : "min-w-[200px]"
              )}
              order={1}
          >
              <Sidebar isCollapsed={isSidebarCollapsed} />
          </ResizablePanel>
          <ResizableHandle withHandle className="bg-border" />
          <ResizablePanel defaultSize={80} minSize={30} order={2}>
              <div className="flex h-full flex-col">
                  <Header />
                  <main className="flex-1 overflow-y-auto bg-background p-4 md:p-6 lg:p-8">
                      {children}
                  </main>
              </div>
          </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}