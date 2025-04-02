// File: app/(app)/layout.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { useAuth } from '@/lib/hooks/useAuth'; // Importar hook actualizado
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react'; // Para el spinner

export default function AppLayout({ children }: { children: React.ReactNode }) {
  // --- CORRECCIÓN: Usar session, user, isLoading, signOut del hook useAuth ---
  const { session, user, isLoading, signOut } = useAuth();
  // ----------------------------------------------------------------------
  const router = useRouter();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';

  useEffect(() => {
    // Si el bypass está activo, no hacer nada (permitir acceso)
    if (bypassAuth) {
      console.warn("AppLayout: Autenticación OMITIDA debido a NEXT_PUBLIC_BYPASS_AUTH=true.");
      return;
    }

    // Si NO estamos cargando y NO hay sesión válida, redirigir a la página principal/pública
    if (!isLoading && !session) {
      console.log("AppLayout: No se encontró token, redirigiendo a login.");
      router.replace('/'); // Redirigir a la página principal (o '/login')
      return; // Detener ejecución del efecto
    }

    // --- CORRECCIÓN: Chequeo adicional si companyId es obligatorio ---
    // Si hay sesión pero el usuario mapeado es null (posiblemente por falta de companyId
    // u otro dato requerido en app_metadata), forzar logout.
    // Descomenta y ajusta si `companyId` es estrictamente necesario para acceder al app.
    // if (!isLoading && session && !user) {
    //   console.error("AppLayout: Session exists but user mapping failed (missing required data like companyId?). Forcing logout.");
    //   signOut(); // Forzar logout si el estado del usuario no es válido
    //   // No necesitas redirigir aquí, el signOut provocará un cambio de estado que
    //   // llevará a la condición !session en la próxima ejecución del efecto.
    //   return;
    // }
    // -------------------------------------------------------------

  // --- CORRECCIÓN: Dependencias del useEffect ---
  // Incluir todas las variables usadas: isLoading, session, user, router, bypassAuth, signOut
  }, [isLoading, session, user, router, bypassAuth, signOut]);
  // -------------------------------------------

  // --- Estado de Carga ---
  // Mostrar spinner mientras isLoading es true Y no estamos en modo bypass
  if (isLoading && !bypassAuth) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        {/* Opcional: Añadir texto */}
        {/* <p className="mt-4 text-muted-foreground">Loading session...</p> */}
      </div>
    );
  }
  // --- Fin Estado de Carga ---

  // --- Guardia de Autenticación ---
  // Si NO estamos en bypass Y (aún estamos cargando O no hay sesión O no hay usuario mapeado),
  // no renderizar el layout protegido. Esto evita flashes de contenido.
  // El useEffect se encargará de la redirección si es necesario.
  if (!bypassAuth && (isLoading || !session /* || !user */)) {
     // Descomenta `|| !user` si el chequeo de usuario mapeado es estricto
     console.log("AppLayout: Not rendering protected layout (isLoading, no session, or no valid user). Waiting for redirect or state update.");
     // Renderizar null o un spinner mínimo mientras se redirige o el estado cambia.
     // Usar el mismo spinner que arriba puede ser buena idea para consistencia.
     return (
       <div className="flex h-screen items-center justify-center bg-background">
         <Loader2 className="h-12 w-12 animate-spin text-primary" />
       </div>
     );
  }
  // --- Fin Guardia de Autenticación ---

  // Si llegamos aquí, o estamos en bypass, o estamos autenticados y autorizados.
  console.log("AppLayout: Rendering protected layout.");
  return (
    <div className="flex h-screen bg-secondary/30 dark:bg-muted/30">
      <ResizablePanelGroup direction="horizontal" className="h-full items-stretch">
          <ResizablePanel
              collapsible collapsedSize={4} minSize={15} maxSize={25} defaultSize={20}
              onCollapse={() => setIsSidebarCollapsed(true)}
              onExpand={() => setIsSidebarCollapsed(false)}
              className={cn("transition-all duration-300 ease-in-out", isSidebarCollapsed ? "min-w-[50px] max-w-[50px]" : "min-w-[200px]")}
          >
              {/* Pasar user al Sidebar si necesita mostrar info del usuario */}
              <Sidebar isCollapsed={isSidebarCollapsed} />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={80} minSize={30}>
              <div className="flex h-full flex-col">
                   {/* Pasar user y signOut al Header */}
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