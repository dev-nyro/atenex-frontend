// File: app/(app)/layout.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header'; //Added This Line
import { useAuth } from '@/lib/hooks/useAuth';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { cn } from '@/lib/utils';
// (+) AÑADIR ESTA LÍNEA:
import { removeToken } from '@/lib/auth/helpers';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, token } = useAuth();
  const router = useRouter();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (!isLoading && !token) {
      console.log("AppLayout: No token found, redirecting to login.");
      router.push('/'); // Cambiado a '/'
    } else if (!isLoading && token && !user) {
      console.log("AppLayout: Invalid token found, redirecting to login.");
      // Ahora TypeScript sabe qué es removeToken gracias a la importación
      removeToken();
      router.push('/'); // Cambiado a '/'
    }
    // La función removeToken importada es estable, no necesita estar en las dependencias.
  }, [user, isLoading, token, router]);

  // Muestra un spinner mientras se verifica la autenticación
  if (isLoading || (!token && !isLoading)) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );
  }

  // Si no está cargando y no hay usuario/token
  if (!user || !token) {
    console.log("AppLayout: Renderizando null porque no hay usuario/token después de la carga.");
    // Considera redirigir de nuevo aquí como medida extra de seguridad si llega a este punto
    // router.push('/login');
    return null;
  }


  return (
    <div className="flex h-screen bg-secondary/30 dark:bg-muted/30">
      <ResizablePanelGroup
            direction="horizontal"
            className="h-full items-stretch"
        >
          <ResizablePanel
              collapsible
              collapsedSize={4}
              minSize={15}
              maxSize={25}
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