// File: app/(app)/layout.tsx
"use client"; // Necesario por los hooks

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { useAuth } from '@/lib/hooks/useAuth'; // Importa el hook de autenticación
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { cn } from '@/lib/utils';
// --- NO hay importación de './globals.css' aquí ---
// --- NO hay importación de 'Toaster' aquí ---

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, token } = useAuth();
  const router = useRouter();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // Estado para la barra lateral

  // Efecto para verificar autenticación y redirigir si es necesario
  useEffect(() => {
    if (!isLoading && !token) {
      console.log("AppLayout: No token found, redirecting to login.");
      router.push('/login');
    } else if (!isLoading && token && !user) {
      // Token inválido o no se pudo obtener usuario
      console.log("AppLayout: Invalid token found, redirecting to login.");
      removeToken(); // Opcional: Limpiar token inválido
      router.push('/login');
    }
  }, [user, isLoading, token, router]); // Añadir removeToken si se usa arriba

  // Muestra un spinner mientras se verifica la autenticación
  if (isLoading || (!token && !isLoading)) { // Muestra loading si está cargando O si ya terminó y no hay token
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Si no está cargando y no hay usuario/token (ya debería haber redirigido, pero como fallback)
  if (!user || !token) {
     // O puedes mostrar un mensaje en lugar de null
     console.log("AppLayout: Renderizando null porque no hay usuario/token después de la carga.");
     return null;
  }

  // Renderiza el layout principal de la aplicación autenticada
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
                {/* Renderiza la barra lateral */}
                <Sidebar isCollapsed={isSidebarCollapsed} />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={80} minSize={30}>
                <div className="flex h-full flex-col">
                    {/* Renderiza la cabecera */}
                    <Header />
                    {/* Renderiza el contenido de la página específica (e.g., ChatPage, KnowledgePage) */}
                    <main className="flex-1 overflow-y-auto bg-background p-4 md:p-6 lg:p-8">
                        {children}
                    </main>
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    </div>
  );
}