// File: components/layout/sidebar.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { BotMessageSquare, FileUp, Settings, BarChartHorizontalBig, CircleHelp, PlusCircle } from 'lucide-react'; // Added Help icon and PlusCircle for New Chat button
import { APP_NAME } from '@/lib/constants';
import { ChatHistory } from '@/components/chat/chat-history'; // Import ChatHistory

interface SidebarProps {
  isCollapsed: boolean;
}

const navItems = [
  { href: '/chat', label: 'Chat', icon: BotMessageSquare },
  { href: '/knowledge', label: 'Base de Conocimiento', icon: FileUp }, // Traducido
//   { href: '/analytics', label: 'Analíticas', icon: BarChartHorizontalBig }, // Example extra item (Traducido)
  { href: '/settings', label: 'Configuración', icon: Settings }, // Traducido
//   { href: '/help', label: 'Ayuda y Soporte', icon: CircleHelp }, // Example extra item (Traducido)
];

export function Sidebar({ isCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter ? useRouter() : undefined;

  // Handler para nuevo chat
  const handleNewChat = React.useCallback(() => {
    if (router) router.push('/chat');
    else window.location.href = '/chat';
  }, [router]);

  return (
    <aside className={cn(
        "flex h-full flex-col border-r bg-muted/40 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[50px] items-center" : "w-full p-4"
      )}
      >
      <div className={cn("flex flex-col gap-2", isCollapsed ? "items-center" : "")}> {/* Logo y botón */}
        <div className={cn("flex items-center", isCollapsed ? "h-16 justify-center" : "h-16 justify-start")}>
          <BotMessageSquare className={cn("h-6 w-6 text-primary", !isCollapsed && "mr-2")} />
          {!isCollapsed && (
            <span className="text-lg font-bold text-primary">{APP_NAME}</span>
          )}
        </div>
        <Button
          onClick={handleNewChat}
          variant="default" // Changed from "accent" to "default" as "accent" is not a valid variant
          size={isCollapsed ? "icon" : "default"}
          className={cn(
            "w-full transition-colors duration-150",
            isCollapsed ? "h-10 w-10 rounded-lg mt-2" : "justify-start mt-2 font-semibold text-base",
            "bg-primary/90 hover:bg-primary text-primary-foreground shadow-sm"
          )}
          // MODIFICADO: aria-label traducido
          aria-label="Nuevo chat"
        >
          <PlusCircle className={cn("h-5 w-5", !isCollapsed && "mr-2")}/>
          {!isCollapsed && <span>Nuevo chat</span>}
        </Button>
      </div>
      {/* Main Navigation */}
      <nav className={cn("flex flex-col gap-2", isCollapsed ? "items-center mt-4" : "flex-1 mt-4")}>
        <TooltipProvider delayDuration={0}>
          {navItems.map((item) => (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                 <Link
                    href={item.href}
                    className={cn(
                        buttonVariants({ variant: pathname.startsWith(item.href) ? 'default' : 'ghost', size: isCollapsed ? "icon" : "default" }),
                        "w-full transition-colors duration-150 ease-in-out",
                        isCollapsed ? "h-10 w-10 rounded-lg" : "justify-start",
                        pathname.startsWith(item.href)
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'hover:bg-muted'
                    )}
                    aria-label={item.label}
                >
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
          ))}
        </TooltipProvider>
      </nav>
      {/* Chat History Section - Conditionally render based on collapse */}
      {!isCollapsed && (
         <div className="mt-auto flex flex-col gap-2 border-t pt-4">
             {/* ELIMINADO: Título duplicado H3 */}
             <ChatHistory />
         </div>
      )}
    </aside>
  );
}