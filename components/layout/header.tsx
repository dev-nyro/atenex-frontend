// File: components/layout/header.tsx
"use client";

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User as UserIcon, Home } from "lucide-react"; // Quitado Menu, añadido Home
import { useAuth } from '@/lib/hooks/useAuth'; // Hook refactorizado
import { APP_NAME } from '@/lib/constants';
import { ThemePaletteButton } from '@/components/theme-palette-button';
import { useRouter } from 'next/navigation';

export function Header() {
  // --- CORRECCIÓN: Usar user y signOut del hook useAuth ---
  const { user, signOut } = useAuth();
  // -----------------------------------------------------
  const router = useRouter();

  // Helper para obtener iniciales (sin cambios)
  const getInitials = (name?: string | null) => { // Permitir null
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  };

  const handleLogout = async () => {
      console.log("Header: Initiating logout...");
      await signOut(); // Llamar a signOut del contexto
      // La redirección será manejada por el AuthProvider o AppLayout al detectar el cambio de estado
      console.log("Header: signOut called.");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur-sm px-4 md:px-6">
      {/* Lado Izquierdo - Enlace a Home y Título (opcional) */}
      <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.push('/')} aria-label="Go to Homepage">
              <Home className="h-5 w-5" />
          </Button>
          {/* Opcional: Mostrar nombre de la app o título de la página actual */}
          {/* <span className="text-lg font-semibold hidden md:inline">{APP_NAME}</span> */}
      </div>

      {/* Lado Derecho - Controles (Tema y Menú de Usuario) */}
      <div className="flex items-center space-x-2 md:space-x-4">
        <ThemePaletteButton />

        {/* Menú de Usuario (solo si hay usuario) */}
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <Avatar className="h-9 w-9 border">
                  {/* <AvatarImage src="/path/to/user-image.jpg" alt={user.name || 'User Avatar'} /> */}
                  <AvatarFallback className="bg-secondary text-secondary-foreground font-medium">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="sr-only">Open user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              {/* Información del Usuario */}
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none truncate" title={user.name || 'User'}>
                    {user.name || 'User'}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground truncate" title={user.email}>
                    {user.email}
                  </p>
                  {/* Mostrar Company ID si existe */}
                  {user.companyId && (
                    <p className="text-xs leading-none text-muted-foreground/80 mt-1" title={`Company ID: ${user.companyId}`}>
                      Company: {user.companyId.substring(0,8)}...
                    </p>
                  )}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {/* Opciones del Menú */}
              <DropdownMenuItem onClick={() => router.push('/settings')} className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              {/* Podrías añadir más items aquí (ej. Profile, Billing, etc.) */}
              {/*
              <DropdownMenuItem onClick={() => router.push('/profile')} className="cursor-pointer">
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              */}
              <DropdownMenuSeparator />
              {/* Logout */}
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {/* Fin Menú de Usuario */}
      </div>
    </header>
  );
}