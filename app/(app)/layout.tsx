// File: app/(app)/layout.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { useAuth } from '@/lib/hooks/useAuth'; // Importar hook actualizado
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { cn } from '@/lib/utils';
// removeToken ya no se usa aquí directamente, signOut se encarga
// import { removeToken } from '@/lib/auth/helpers';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  // Usar session y user del hook actualizado
  const { user, session, isLoading, signOut } = useAuth();
  const router = useRouter();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';

  useEffect(() => {
    if (bypassAuth) {
      console.warn("AppLayout: Auth checks bypassed.");
      return; // No hacer nada si el bypass está activo
    }

    // Si no está cargando y NO hay sesión válida, redirigir a login (o a '/')
    if (!isLoading && !session) {
      console.log("AppLayout: No active session found, redirecting to login page.");
      router.push('/'); // Redirigir a la página principal/pública
    }
    // Opcional: Si hay sesión pero el mapeo a 'user' falló (ej. falta companyId)
    // podrías forzar un logout o mostrar un error específico aquí.
    // else if (!isLoading && session && !user) {
    //   console.error("AppLayout: Session exists but user mapping failed (missing required data?). Forcing logout.");
    //   signOut(); // Forzar logout si el estado del usuario no es válido
    // }

  }, [isLoading, session, user, router, bypassAuth, signOut]); // Añadir signOut a dependencias si se usa

  // Mostrar spinner mientras carga Y no estamos en modo bypass
  if (isLoading && !bypassAuth) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Si NO estamos en bypass Y (estamos cargando o no hay sesión o no hay usuario mapeado), no renderizar el layout protegido.
  // Esto evita flashes de contenido protegido.
  if (!bypassAuth && (isLoading || !session || !user)) {
     // No renderizar nada mientras se redirige o si el estado no es válido
     // El useEffect se encargará de la redirección.
     console.log("AppLayout: Not rendering protected layout (isLoading, no session, or no mapped user).");
     return null;
  }

  // Si llegamos aquí, o estamos en bypass, o estamos autenticados y autorizados (user mapeado existe)
  return (
    <div className="flex h-screen bg-secondary/30 dark:bg-muted/30">
      <ResizablePanelGroup direction="horizontal" className="h-full items-stretch">
          <ResizablePanel
              collapsible collapsedSize={4} minSize={15} maxSize={25} defaultSize={20}
              onCollapse={() => setIsSidebarCollapsed(true)}
              onExpand={() => setIsSidebarCollapsed(false)}
              className={cn("transition-all duration-300 ease-in-out", isSidebarCollapsed ? "min-w-[50px] max-w-[50px]" : "min-w-[200px]")}
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