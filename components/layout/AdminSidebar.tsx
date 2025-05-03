// File: components/layout/AdminSidebar.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { BarChartBig, Users, Building, PanelLeftClose, PanelLeftOpen, Settings, Wrench } from 'lucide-react'; // Iconos para admin, añadido Wrench
import { APP_NAME } from '@/lib/constants';
import AtenexLogo from '@/components/icons/atenex-logo';

interface AdminSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

// Items de navegación del Admin
const adminNavItems = [
  // Usar searchParams para cambiar la vista dentro de /admin
  { href: '/admin?view=stats', label: 'Estadísticas', icon: BarChartBig, view: 'stats' },
  { href: '/admin?view=management', label: 'Gestión', icon: Wrench, view: 'management' }, // Usar Wrench para gestión general
  // Podrías añadir links a la configuración normal si el admin también la necesita
   { href: '/settings', label: 'Configuración', icon: Settings }, // Link a settings normal
];

export function AdminSidebar({ isCollapsed, setIsCollapsed }: AdminSidebarProps) {
  const pathname = usePathname();
  // Leer el parámetro 'view' para determinar la sección activa
  const searchParams = React.useMemo(() => new URLSearchParams(window.location.search), [pathname]);
  const currentView = searchParams.get('view') || 'stats'; // Default a 'stats'

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "flex h-full flex-col border-r bg-card transition-all duration-300 ease-in-out",
          isCollapsed ? "w-[60px] items-center px-2 py-4" : "w-64 p-4" // Ancho fijo cuando expandido
        )}
      >
        {/* Sección Superior: Logo y Toggle */}
        <div
          className={cn(
            "flex items-center mb-6 relative",
            isCollapsed ? "h-10 justify-center" : "h-12 justify-between"
          )}
        >
          <Link
            href="/admin" // Enlaza a la página principal del admin
            className={cn(
              "flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm",
              isCollapsed ? 'justify-center w-full' : ''
            )}
            aria-label={`${APP_NAME} - Admin Dashboard`}
          >
            <AtenexLogo className={cn("h-8 w-auto text-primary", isCollapsed ? "h-7" : "")} />
            {!isCollapsed && (
              <span className="text-xl font-bold text-foreground tracking-tight">{APP_NAME} Admin</span>
            )}
          </Link>
          {/* Botón para colapsar/expandir */}
           {!isCollapsed && (
             <Button
               variant="ghost"
               size="icon"
               className="h-8 w-8 lg:absolute lg:-right-10 lg:top-2 bg-background border shadow-sm hover:bg-accent" // Ajuste posicional
               onClick={() => setIsCollapsed(true)}
               aria-label="Colapsar sidebar"
             >
               <PanelLeftClose className="h-4 w-4" />
             </Button>
           )}
        </div>

         {isCollapsed && (
           <Button
             variant="ghost"
             size="icon"
             className="h-8 w-8 mb-4"
             onClick={() => setIsCollapsed(false)}
             aria-label="Expandir sidebar"
           >
             <PanelLeftOpen className="h-4 w-4" />
           </Button>
         )}

        {/* Navegación Admin */}
        <nav className={cn("flex flex-col gap-1 flex-grow", isCollapsed ? "items-center mt-4" : "mt-2")}>
          {adminNavItems.map((item) => {
             // Determinar si está activo basado en el 'view' o el pathname para /settings
             const isActive = item.href === '/settings'
               ? pathname === item.href
               : item.view === currentView;

            return (
              <Tooltip key={item.href} disableHoverableContent={!isCollapsed}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href} // Usar href para la navegación
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
                    {isActive && !isCollapsed && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 bg-primary rounded-r-md"></span>
                    )}
                    <item.icon
                      className={cn(
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
            );
          })}
        </nav>
        {/* Puedes añadir un footer al sidebar si es necesario */}
      </aside>
    </TooltipProvider>
  );
}