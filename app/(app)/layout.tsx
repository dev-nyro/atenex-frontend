// File: app/(app)/layout.tsx
"use client"; // This layout uses hooks (useAuth, useState)

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { useAuth } from '@/lib/hooks/useAuth';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { cn } from '@/lib/utils';
// (-) ASEGÚRATE DE QUE NO HAYA NINGUNA LÍNEA COMO: import './globals.css';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, token } = useAuth();
  const router = useRouter();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (!isLoading && !token) {
      console.log("AppLayout: No token found, redirecting to login.");
      router.push('/login');
    } else if (!isLoading && token && !user) {
        // Token exists but user data couldn't be derived (e.g., invalid token)
        console.log("AppLayout: Invalid token found, redirecting to login.");
        router.push('/login');
    }
  }, [user, isLoading, token, router]);

  if (isLoading || !user) {
    // Show a loading state or skeleton screen while checking auth / loading user
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-secondary/30 dark:bg-muted/30">
       <ResizablePanelGroup
            direction="horizontal"
            className="h-full items-stretch"
        >
            <ResizablePanel
                collapsible
                collapsedSize={4} // Percentage width when collapsed
                minSize={15}      // Minimum percentage width
                maxSize={25}      // Maximum percentage width
                defaultSize={20}
                onCollapse={() => setIsSidebarCollapsed(true)}
                onExpand={() => setIsSidebarCollapsed(false)}
                className={cn(
                    "transition-all duration-300 ease-in-out",
                    isSidebarCollapsed ? "min-w-[50px] max-w-[50px]" : "min-w-[200px]"
                )}
            >
                <Sidebar isCollapsed={isSidebarCollapsed} />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={80} minSize={30}>
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