// File: app/(app)/layout.tsx (MODIFICADO - Renderizado Condicional Admin)
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation'; // Añadido usePathname
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { AdminLayout } from '@/components/layout/AdminLayout'; // Importar AdminLayout
import { useAuth } from '@/lib/hooks/useAuth';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname(); // Obtener ruta actual
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';
  const incompleteSetupWarningShown = useRef(false);

  useEffect(() => {
    incompleteSetupWarningShown.current = false;
  }, [user?.userId]);

  useEffect(() => {
    if (bypassAuth) {
      console.warn("AppLayout: Auth check SKIPPED (Bypass).");
      return;
    }
    if (isLoading) {
      console.log("AppLayout: Waiting for auth state...");
      return;
    }
    if (!user) {
      console.log("AppLayout: No user found after loading, redirecting to /");
      router.replace('/');
      return;
    }

    // --- REDIRECCIÓN ADMIN ---
    // Si es admin y NO está en una ruta /admin, redirigir
    if (user.isAdmin && !pathname.startsWith('/admin')) {
        console.log("AppLayout: Admin user detected outside /admin, redirecting to /admin");
        router.replace('/admin');
        return; // Detener ejecución para evitar renderizado incorrecto
    }
    // Si NO es admin y está intentando acceder a /admin, redirigir
    if (!user.isAdmin && pathname.startsWith('/admin')) {
        console.log("AppLayout: Non-admin user detected in /admin, redirecting to /chat");
        router.replace('/chat'); // O a la página principal para usuarios normales
        return; // Detener ejecución
    }
    // --- FIN REDIRECCIÓN ADMIN ---

    // Check de Company ID (solo para no-admins)
    if (!user.isAdmin && !user.companyId) {
       if (!incompleteSetupWarningShown.current) {
          console.error(`AppLayout: User data is incomplete (CompanyID: ${user?.companyId}). Showing warning.`);
          toast.error("Incomplete Account Setup", { /* ... */ });
          incompleteSetupWarningShown.current = true;
       }
       // No bloquear, pero mostrar warning. La API debería manejar los errores si intenta operar.
       // return; // Podría bloquear si se requiere companyId obligatoriamente para operar
    }

    console.log("AppLayout: Auth check passed for current route.");
    incompleteSetupWarningShown.current = false;

  }, [isLoading, user, bypassAuth, router, pathname, signOut]); // Añadir pathname a dependencias

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
       // Ya se hizo redirect en el useEffect, pero por seguridad renderizamos null o un loader
       console.log("AppLayout: No user, rendering minimal or null.");
        return (
          <div className="flex h-screen items-center justify-center bg-background">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground">Redirigiendo...</p>
          </div>
        ); // O return null;
   }


  // --- Renderizado Condicional ---
  // Si es admin, renderiza AdminLayout (ya comprobado que está en /admin)
  if (user?.isAdmin) {
      console.log("AppLayout: Rendering Admin Layout...");
      return <AdminLayout>{children}</AdminLayout>;
  }
  // Si no es admin, renderiza el layout normal (ya comprobado que no está en /admin)
  else if (user) {
      console.log("AppLayout: Rendering standard user layout...");
      // Comprobar si falta companyId para mostrar un estado bloqueado específico si es necesario
      if (!user.companyId && !bypassAuth) {
           console.log("AppLayout: Non-admin user without companyId, potentially blocked state.");
           // Puedes mostrar un estado específico aquí o dejar que la lógica de las páginas maneje la falta de companyId
           // Por ahora, se permite renderizar el layout, pero las páginas internas deberían verificar companyId
      }

      return (
         <div className="flex h-screen bg-secondary/30 dark:bg-muted/30 overflow-hidden">
          <ResizablePanelGroup direction="horizontal" className="h-full items-stretch">
              <ResizablePanel
                  collapsible collapsedSize={4} minSize={15} maxSize={25} defaultSize={18}
                  onCollapse={() => setIsSidebarCollapsed(true)} onExpand={() => setIsSidebarCollapsed(false)}
                  className={cn("transition-all duration-300 ease-in-out bg-background dark:bg-card", isSidebarCollapsed ? "min-w-[60px] max-w-[60px]" : "min-w-[220px]")}
                  order={1}
              >
                  <Sidebar isCollapsed={isSidebarCollapsed} />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={82} minSize={30} order={2}>
                  <div className="flex h-full flex-col">
                      <Header />
                      <main className="flex-1 overflow-y-auto bg-background p-6 lg:p-8">
                          {children} {/* Contenido de /chat, /knowledge, /settings */}
                      </main>
                  </div>
              </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      );
  }

  // Fallback por si algo falla (aunque no debería llegar aquí si la lógica anterior es correcta)
  console.error("AppLayout: Reached unexpected render state.");
  return null;
}