// File: components/layout/sidebar.tsx (MODIFICADO)
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { BotMessageSquare, FileUp, Settings, PlusCircle } from 'lucide-react'; // Quitados iconos no usados
import { APP_NAME } from '@/lib/constants';
import { ChatHistory } from '@/components/chat/chat-history';
import { Separator } from '@/components/ui/separator'; // Importar Separator

interface SidebarProps {
  isCollapsed: boolean;
}

const navItems = [
  { href: '/chat', label: 'Chat', icon: BotMessageSquare },
  { href: '/knowledge', label: 'Base de Conocimiento', icon: FileUp },
  { href: '/settings', label: 'Configuración', icon: Settings },
];

export function Sidebar({ isCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter ? useRouter() : undefined;

  const handleNewChat = React.useCallback(() => {
    if (router) router.push('/chat'); // Simplificado, siempre va a /chat para nuevo
    else window.location.href = '/chat';
  }, [router]);

  return (
    // Ajustamos padding general y gap
    <aside className={cn(
        "flex h-full flex-col border-r bg-muted/40 dark:bg-background", // Fondo más integrado en dark mode
        isCollapsed ? "w-[60px] items-center p-2" : "w-full p-3" // Ancho colapsado y padding ajustados
      )}
      >
      {/* Sección Superior: Logo y Nuevo Chat */}
      <div className={cn(
          "flex flex-col", // Sin gap aquí, el margen se controla abajo
          isCollapsed ? "items-center" : "items-stretch"
        )}
      >
        {/* Logo */}
        <div className={cn(
            "flex items-center mb-4", // Margen inferior
            isCollapsed ? "h-10 justify-center" : "h-12 justify-start pl-1" // Altura y padding ajustados
            )}
        >
          <BotMessageSquare className={cn("h-6 w-6 text-primary", !isCollapsed && "mr-2")} />
          {!isCollapsed && (
            <span className="text-lg font-semibold text-primary">{APP_NAME}</span> // font-semibold
          )}
        </div>

        {/* Botón Nuevo Chat */}
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleNewChat}
                variant="default" // Mantenemos default, pero podríamos crear uno específico
                size={isCollapsed ? "icon" : "default"}
                className={cn(
                  "w-full transition-colors duration-150",
                  isCollapsed ? "h-10 w-10 rounded-lg mb-4" : "justify-start py-2.5 text-base font-medium mb-4", // Tamaño y margen ajustados
                  "shadow-sm" // Sombra más sutil
                )}
                aria-label="Nuevo chat"
              >
                <PlusCircle className={cn("h-5 w-5", !isCollapsed && "mr-2")}/>
                {!isCollapsed && <span>Nuevo chat</span>}
              </Button>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right" sideOffset={5}>Nuevo chat</TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Separador antes de la navegación */}
      {!isCollapsed && <Separator className="my-2" />}

      {/* Navegación Principal */}
      <nav className={cn(
          "flex flex-col gap-1", // Espaciado entre items reducido
          isCollapsed ? "items-center mt-2" : "flex-1 mt-1" // Margen superior ajustado
        )}
      >
        <TooltipProvider delayDuration={0}>
          {navItems.map((item) => {
             // Usar startsWith para que rutas anidadas también activen el ítem
             const isActive = pathname === item.href || (item.href !== '/chat' && pathname.startsWith(item.href));
             return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    <Link
                        href={item.href}
                        className={cn(
                            buttonVariants({ variant: 'ghost', size: isCollapsed ? "icon" : "default" }), // Usar ghost siempre
                            "w-full transition-colors duration-150 ease-in-out relative group", // Añadido group
                            isCollapsed ? "h-10 w-10 rounded-lg" : "justify-start pl-3 py-2 text-sm h-10", // Padding y tamaño
                            isActive
                                ? 'font-medium text-primary bg-primary/10 dark:bg-primary/20' // Estilo activo más claro
                                : 'text-muted-foreground hover:text-foreground hover:bg-accent/50 dark:hover:bg-accent/30' // Estilo inactivo
                        )}
                        aria-label={item.label}
                    >
                      {/* Indicador activo (solo visible si está activo y expandido) */}
                      {isActive && !isCollapsed && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-primary rounded-r-md transition-all duration-200"></span>
                      )}
                      <item.icon className={cn(
                          "h-5 w-5 transition-colors",
                          isCollapsed ? "" : "mr-3",
                          isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground" // Color icono
                          )}
                       />
                      {!isCollapsed && <span className="truncate">{item.label}</span>}
                    </Link>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent side="right" sideOffset={5}>
                      {item.label}
                    </TooltipContent>
                  )}
                </Tooltip>
             )
            })}
        </TooltipProvider>
      </nav>

      {/* Historial de Chats (Solo si no está colapsado) */}
      {!isCollapsed && (
         // Contenedor para el historial con borde superior
         <div className="mt-auto flex flex-col border-t pt-3 -mx-3 px-3"> {/* Padding negativo/positivo para borde completo */}
             {/* Aquí irá el ChatHistory rediseñado en Iteración 2 */}
             {/* Placeholder temporal: */}
              <div className='flex-1 overflow-hidden'>
                 <ChatHistory />
              </div>

         </div>
      )}
    </aside>
  );
}