// File: components/theme-palette-button.tsx (REFACTORIZADO - Temas B2B Final)
"use client";

import * as React from "react";
import { Palette, Check } from "lucide-react"; // Importar Check
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel, // Importar Label
  DropdownMenuSeparator, // Importar Separator
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// Definición de temas B2B disponibles (Final)
const themes = [
    { value: 'system', label: 'Automático (Sistema)' },
    { value: 'light', label: 'Claro Profesional' },
    { value: 'dark', label: 'Oscuro Elegante' },
    { value: 'slate', label: 'Pizarra (Oscuro)' },
    { value: 'indigo', label: 'Índigo (Claro)' },
    { value: 'stone', label: 'Piedra (Claro)' },
    { value: 'zinc', label: 'Zinc (Oscuro)' },
];

export function ThemePaletteButton() {
  const { setTheme, theme: activeTheme, resolvedTheme } = useTheme();

  // El tema resuelto (light o dark) si activeTheme es 'system'
  const currentResolvedTheme = resolvedTheme;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
           <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Cambiar tema">
               <Palette className="h-5 w-5"/>
            </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52"> {/* Ancho ajustado */}
           <DropdownMenuLabel className="px-2 py-1.5 text-xs font-semibold">Apariencia</DropdownMenuLabel>
           <DropdownMenuSeparator />
           {themes.map((theme) => {
               // Determinar si este item es el activo (considerando 'system')
               const isActive = activeTheme === theme.value || (activeTheme === 'system' && currentResolvedTheme === theme.value);
               return (
                 <DropdownMenuItem
                    key={theme.value}
                    onClick={() => setTheme(theme.value)}
                    className={cn(
                        "flex items-center justify-between cursor-pointer text-sm px-2 py-1.5 rounded-sm",
                        isActive
                          ? "font-semibold text-primary bg-accent dark:bg-accent/50"
                          : "hover:bg-accent/50 dark:hover:bg-accent/20"
                    )}
                 >
                    <span>{theme.label}</span>
                    {isActive && ( <Check className="h-4 w-4" /> )}
                 </DropdownMenuItem>
               );
           })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}