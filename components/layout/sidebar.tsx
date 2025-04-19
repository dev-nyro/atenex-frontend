// File: components/layout/sidebar.tsx (REFACTORIZADO - Logo y Navegación v2)
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Quitar useRouter si no se usa aquí
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { BotMessageSquare, Database, Settings, /* Quitamos PlusCircle */ LayoutDashboard } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';
import { ChatHistory } from '@/components/chat/chat-history';
import { Separator } from '@/components/ui/separator';
import AtenexLogo from '@/components/icons/atenex-logo'; // Importar logo

interface SidebarProps {
  isCollapsed: boolean;
}

// Items de navegación actualizados
const navItems = [
  // { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard }, // Ejemplo
  { href: '/chat', label: 'Chat', icon: BotMessageSquare },
  { href: '/knowledge', label: 'Conocimiento', icon: Database }, // Texto más corto
  { href: '/settings', label: 'Configuración', icon: Settings },
];

export function Sidebar({ isCollapsed }: SidebarProps) {
  const pathname = usePathname();
  // const router = useRouter(); // Ya no se necesita aquí

  // Ya no se necesita handleNewChat

  return (
    <aside className={cn(
        "flex h-full flex-col border-r bg-card", // Fondo card para consistencia
        isCollapsed ? "w-[60px] items-center px-2 py-4" : "w-full p-4"
      )}
      >
      {/* Sección Superior: Logo/Nombre como Link */}
      <div className={cn( "flex items-center mb-6", isCollapsed ? "h-10 justify-center" : "h-12 justify-start" )}>
            <Link href="/chat" // Enlaza a la sección principal (Chat)
                className={cn( "flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm", isCollapsed ? 'justify-center w-full' : '' )}
                aria-label={`${APP_NAME} - Inicio`}
            >
                 {/* Ajustar tamaño del logo SVG */}
                 <AtenexLogo className={cn("h-8 w-auto text-primary", isCollapsed ? "h-7" : "")} />
                 {!isCollapsed && (
                     <span className="text-xl font-bold text-foreground tracking-tight">{APP_NAME}</span>
                 )}
            </Link>
       </div>

        {/* SE ELIMINÓ el botón "Nuevo Chat" */}

        {/* Separador solo si no está colapsado y hay historial */}
        {/* {!isCollapsed && <Separator className="my-2" />} */}

        {/* Navegación Principal */}
        <nav className={cn(
            "flex flex-col gap-1 flex-grow", // flex-grow para empujar historial abajo
            isCollapsed ? "items-center mt-4" : "mt-2" // Margen superior ajustado
            )}
        >
          <TooltipProvider delayDuration={0}>
            {navItems.map((item) => {
               // Mejorar lógica isActive para /chat y sus subrutas [[...chatId]]
               const isChatActive = item.href === '/chat' && (pathname === '/chat' || pathname.startsWith('/chat/'));
               const isActive = isChatActive || (item.href !== '/chat' && pathname.startsWith(item.href));
               return (
                  <Tooltip key={item.href} disableHoverableContent={!isCollapsed}>
                    <TooltipTrigger asChild>
                      <Link
                          href={item.href}
                          className={cn(
                              buttonVariants({ variant: 'ghost', size: isCollapsed ? "icon" : "default" }),
                              "w-full transition-colors duration-150 ease-in-out relative group",
                              isCollapsed ? "h-10 w-10 rounded-lg" : "justify-start pl-3 py-2 text-sm h-10",
                              isActive
                                  ? 'font-semibold text-primary bg-primary/10 dark:bg-primary/20'
                                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/50 dark:hover:bg-accent/30'
                          )}
                          aria-label={item.label}
                      >
                        {/* Indicador activo */}
                        {isActive && !isCollapsed && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 bg-primary rounded-r-md transition-all duration-200"></span>
                        )}
                        <item.icon className={cn(
                            "h-5 w-5 transition-colors",
                            isCollapsed ? "" : "mr-3",
                            isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
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
           <div className="mt-4 flex flex-col border-t pt-3 -mx-4 px-4 h-1/3"> {/* Altura limitada para historial */}
               <div className='flex-1 overflow-hidden min-h-0'> {/* Forzar overflow */}
                   <ChatHistory />
               </div>
           </div>
        )}
    </aside>
  );
}