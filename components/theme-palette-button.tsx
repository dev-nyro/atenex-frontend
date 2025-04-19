// File: components/theme-palette-button.tsx (MODIFICADO - Nuevos Temas)
"use client";

import * as React from "react";
import { Palette, Check } from "lucide-react"; // Importar Check
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils"; // Importar cn

// Definición de temas disponibles
const themes = [
    { value: 'system', label: 'Sistema' },
    { value: 'light', label: 'Claro' },
    { value: 'dark', label: 'Oscuro' },
    { value: 'slate', label: 'Pizarra (Oscuro)' }, // Nuevo
    { value: 'indigo', label: 'Índigo (Claro)' },   // Nuevo
    { value: 'stone', label: 'Piedra (Claro)' },  // Nuevo
    // { value: 'blue', label: 'Blue Oasis' }, // Mantener si se desea
    // { value: 'green', label: 'Emerald Depths' }, // Mantener si se desea
];

export function ThemePaletteButton() {
  const { setTheme, theme: activeTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
           <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Cambiar tema">
               <Palette className="h-5 w-5"/>
            </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
           {themes.map((theme) => (
               <DropdownMenuItem
                    key={theme.value}
                    onClick={() => setTheme(theme.value)}
                    className={cn(
                        "flex items-center justify-between cursor-pointer",
                        activeTheme === theme.value && "font-semibold text-primary" // Resaltar tema activo
                    )}
                    // Evitar cierre automático al seleccionar para ver el check
                    // onSelect={(event) => event.preventDefault()}
               >
                    {theme.label}
                    {activeTheme === theme.value && <Check className="h-4 w-4 ml-2" />} {/* Checkmark para activo */}
               </DropdownMenuItem>
           ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}