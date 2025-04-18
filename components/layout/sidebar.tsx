// File: components/layout/sidebar.tsx (MODIFICADO)
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { BotMessageSquare, FileUp, Settings, BarChartHorizontalBig, CircleHelp, PlusCircle } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';
import { ChatHistory } from '@/components/chat/chat-history';

interface SidebarProps {
  isCollapsed: boolean;
}

const navItems = [
  { href: '/chat', label: 'Chat', icon: BotMessageSquare },
  { href: '/knowledge', label: 'Base de Conocimiento', icon: FileUp },
  { href: '/settings', label: 'Configuración', icon: Settings },
  // { href: '/analytics', label: 'Analíticas', icon: BarChartHorizontalBig },
  // { href: '/help', label: 'Ayuda y Soporte', icon: CircleHelp },
];

export function Sidebar({ isCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter ? useRouter() : undefined;

  const handleNewChat = React.useCallback(() => {
    if (router) router.push('/chat');
    else window.location.href = '/chat';
  }, [router]);

  return (
    <aside className={cn(
        "flex h-full flex-col border-r bg-muted/40 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[50px] items-center pt-4" : "w-full p-4" // Añadido padding top cuando colapsado
      )}
      >
      {/* Sección Superior: Logo y Nuevo Chat */}
      <div className={cn("flex flex-col gap-2", isCollapsed ? "items-center" : "")}>
        <div className={cn("flex items-center", isCollapsed ? "h-12 justify-center" : "h-16 justify-start")}> {/* Altura ajustada */}
          <BotMessageSquare className={cn("h-6 w-6 text-primary", !isCollapsed && "mr-2")} />
          {!isCollapsed && (
            <span className="text-lg font-bold text-primary">{APP_NAME}</span>
          )}
        </div>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleNewChat}
                variant="default"
                size={isCollapsed ? "icon" : "default"}
                className={cn(
                  "w-full transition-colors duration-150",
                  isCollapsed ? "h-10 w-10 rounded-lg" : "justify-start mt-1 font-semibold text-base", // Ajustado margen
                  "bg-primary hover:bg-primary/90 text-primary-foreground shadow" // Sombra ligeramente más suave
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

      {/* Navegación Principal */}
      <nav className={cn(
          "flex flex-col gap-1 mt-6", // Aumentado margen superior, reducido gap
          isCollapsed ? "items-center" : "flex-1"
        )}
        >
        <TooltipProvider delayDuration={0}>
          {navItems.map((item) => {
             const isActive = pathname.startsWith(item.href);
             return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    <Link
                        href={item.href}
                        className={cn(
                            buttonVariants({ variant: isActive ? 'secondary' : 'ghost', size: isCollapsed ? "icon" : "default" }),
                            "w-full transition-colors duration-150 ease-in-out relative", // Añadido relative
                            isCollapsed ? "h-10 w-10 rounded-lg" : "justify-start pl-3 py-2 text-sm", // Ajustado padding/tamaño
                            isActive ? 'font-semibold text-primary' : 'text-muted-foreground hover:text-foreground'
                        )}
                        aria-label={item.label}
                    >
                      {/* Indicador activo como borde izquierdo */}
                      {isActive && !isCollapsed && (
                        <span className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full"></span>
                      )}
                      <item.icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
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
         <div className="mt-auto flex flex-col gap-2 border-t pt-4">
             <ChatHistory />
         </div>
      )}
    </aside>
  );
}