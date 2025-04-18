// File: components/layout/header.tsx (MODIFICADO)
"use client";

import React from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, Home, HelpCircle } from "lucide-react";
import { useAuth } from '@/lib/hooks/useAuth';
import { APP_NAME } from '@/lib/constants';
import { ThemePaletteButton } from '@/components/theme-palette-button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function Header() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const getInitials = (name?: string | null): string => {
    if (!name) return '?';
    const parts = name.split(' ').filter(Boolean);
    if (parts.length === 0) return '?';
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  const handleLogout = async () => {
      console.log("Header: Initiating logout...");
      try {
          await signOut();
      } catch (error) {
          console.error("Header: Logout failed unexpectedly.", error);
      }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur-sm px-4 md:px-6 shrink-0">
       {/* Espacio Izquierdo (Podría tener Breadcrumbs o Título de página en el futuro) */}
       <div className="flex items-center gap-2">
         {/* Eliminamos el botón Home aquí, ya que está en el Sidebar */}
         {/* <Button variant="ghost" size="icon" onClick={() => router.push('/chat')} aria-label="Ir al Chat">
             <Home className="h-5 w-5" />
         </Button> */}
         {/* Placeholder para título de página si se necesita */}
         {/* <h1 className="text-lg font-semibold text-foreground">Chat</h1> */}
      </div>

      {/* Iconos y Menú de Usuario a la Derecha */}
      {/* Ajustado espaciado a space-x-1 y padding en botones icon */}
      <div className="flex items-center space-x-1">
        {/* Botón de Tema */}
        <ThemePaletteButton />

         {/* Botón de Ayuda */}
         <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => router.push('/help')} aria-label="Ayuda y Soporte">
             <HelpCircle className="h-5 w-5" />
         </Button>

        {/* Menú de Usuario */}
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <Avatar className="h-9 w-9 border">
                  {/* Fuente ligeramente más pequeña para iniciales */}
                  <AvatarFallback className="bg-secondary text-secondary-foreground font-medium text-xs">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="sr-only">Abrir menú de usuario</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60" align="end" forceMount>
              <DropdownMenuLabel className="font-normal p-2"> {/* Añadido padding */}
                <div className="flex flex-col space-y-1.5"> {/* Aumentado space-y */}
                  <p className="text-sm font-medium leading-none truncate" title={user.name || 'Usuario'}>
                    {user.name || 'Usuario'}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground truncate" title={user.email}>
                    {user.email}
                  </p>
                  {/* Info Empresa y Rol con iconos */}
                  {user.companyId && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground/80 pt-1" title={`ID Empresa: ${user.companyId}`}>
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 flex-shrink-0">
                         <path fillRule="evenodd" d="M4 1.75A2.25 2.25 0 0 0 1.75 4v1.5a.75.75 0 0 0 1.5 0V4c0-.414.336-.75.75-.75h8.5c.414 0 .75.336.75.75v1.5a.75.75 0 0 0 1.5 0V4A2.25 2.25 0 0 0 12 1.75H4ZM1.75 8.5A.75.75 0 0 0 1 9.25v2.25A2.25 2.25 0 0 0 3.25 14h9.5A2.25 2.25 0 0 0 15 11.5V9.25a.75.75 0 0 0-1.5 0v2.25c0 .414-.336.75-.75.75h-9.5c-.414 0-.75-.336-.75-.75V9.25a.75.75 0 0 0-.75-.75Z" clipRule="evenodd" />
                       </svg>
                      <span className="truncate">Empresa: {user.companyId.substring(0, 8)}...</span>
                    </div>
                  )}
                   {user.roles && user.roles.length > 0 && (
                     <div className="flex items-center gap-1.5 text-xs text-muted-foreground/80" title={`Roles: ${user.roles.join(', ')}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 flex-shrink-0">
                         <path fillRule="evenodd" d="M8 1a.75.75 0 0 1 .75.75V3h3.75A1.75 1.75 0 0 1 14.25 4.75v3.51a.75.75 0 0 1-1.5 0V5.76L8 8.41l-4.75-2.65v6.01c0 .17.02.338.059.497l1.49-.497a.75.75 0 1 1 .502 1.414l-2.08 1.04A2.25 2.25 0 0 1 3.25 11H.75a.75.75 0 0 1 0-1.5h1.77a.75.75 0 0 0 .75-.75V4.75A1.75 1.75 0 0 1 5 3h3V1.75A.75.75 0 0 1 8 1Z" clipRule="evenodd" />
                       </svg>
                       <span className="truncate">Rol(es): {user.roles.join(', ')}</span>
                     </div>
                   )}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/settings')} className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Configuración</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {/* Estilo destructivo más claro */}
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 dark:focus:bg-destructive/20">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          // Placeholder si no hay usuario (aunque no debería pasar en este layout)
          <Skeleton className="h-9 w-9 rounded-full" />
        )}
      </div>
    </header>
  );
}