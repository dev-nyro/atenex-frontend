// File: app/(app)/layout.tsx (CORREGIDO - overflow-y-auto y padding movido a hijos)
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { useAuth } from '@/lib/hooks/useAuth';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';
  const incompleteSetupWarningShown = useRef(false);

  // useEffects de autenticación y redirección (sin cambios)
  useEffect(() => {
    incompleteSetupWarningShown.current = false;
  }, [user?.userId]);

  useEffect(() => {
    if (bypassAuth) return;
    if (isLoading) return;
    if (!user) { router.replace('/'); return; }
    if (user.isAdmin && !pathname.startsWith('/admin')) { router.replace('/admin'); return; }
    if (!user.isAdmin && pathname.startsWith('/admin')) { router.replace('/chat'); return; }
    if (!user.isAdmin && !user.companyId && !incompleteSetupWarningShown.current) {
       toast.error("Incomplete Account Setup", { description: "Falta ID de compañía. Contacta al administrador." });
       incompleteSetupWarningShown.current = true;
    } else if (user.companyId || user.isAdmin) {
        incompleteSetupWarningShown.current = false;
    }
  }, [isLoading, user, bypassAuth, router, pathname, signOut]);

  // --- Render Loading State ---
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Cargando sesión...</p>
      </div>
    );
  }

   // --- Bloqueador si no hay usuario (después de cargar) ---
   if (!user && !bypassAuth) {
        return (
          <div className="flex h-screen items-center justify-center bg-background">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground">Redirigiendo...</p>
          </div>
        );
   }

  // --- Renderizado Condicional ---
  // Layout Admin
  if (user?.isAdmin) {
      return <AdminLayout>{children}</AdminLayout>;
  }
  // Layout Usuario Normal
  else if (user) {
      return (
         <div className="flex h-screen bg-secondary/30 dark:bg-muted/30 overflow-hidden">
          <ResizablePanelGroup direction="horizontal" className="h-full items-stretch">
              <ResizablePanel
                  collapsible collapsedSize={4} minSize={15} maxSize={25} defaultSize={18}
                  onCollapse={() => setIsSidebarCollapsed(true)} onExpand={() => setIsSidebarCollapsed(false)}
                  className={cn(
                      "transition-all duration-300 ease-in-out bg-background dark:bg-card",
                      isSidebarCollapsed ? "min-w-[60px] max-w-[60px]" : "min-w-[220px]"
                  )}
                  order={1}
              >
                  <Sidebar isCollapsed={isSidebarCollapsed} />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={82} minSize={30} order={2}>
                  <div className="flex h-full flex-col">
                      <Header />
                      {/* FLAG_LLM: Cambiado overflow-hidden a overflow-y-auto y quitado padding */}
                      <main className="flex-1 bg-background overflow-y-auto">
                          {/* El padding se aplicará en las páginas hijas */}
                          {children}
                      </main>
                  </div>
              </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      );
  }

  return null;
}