// File: components/theme-palette-button.tsx (REFACTORIZADO - Temas B2B)
"use client";

import * as React from "react";
import { Palette, Check } from "lucide-react"; // Importar Check
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel, // Añadir Label si se quiere título
  DropdownMenuSeparator, // Añadir Separator si se quiere
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// Definición de temas B2B disponibles
const themes = [
    { value: 'system', label: 'Automático (Sistema)' },
    { value: 'light', label: 'Claro Profesional' },
    { value: 'dark', label: 'Oscuro Elegante' },
    { value: 'slate', label: 'Pizarra (Oscuro)' },
    { value: 'indigo', label: 'Índigo (Claro)' },
    { value: 'stone', label: 'Piedra (Claro)' },
    { value: 'zinc', label: 'Zinc (Oscuro)' }, // Nuevo tema oscuro
];

export function ThemePaletteButton() {
  const { setTheme, theme: activeTheme } = useTheme();
  // Añadir estado para manejar el tema 'resolved' si se usa 'system'
  const [currentResolvedTheme, setCurrentResolvedTheme] = React.useState<string | undefined>(undefined);

  // Efecto para obtener el tema resuelto cuando se usa 'system'
  React.useEffect(() => {
    // 'resolvedTheme' está disponible después de la hidratación
    const resolved = activeTheme === 'system' ? document.documentElement.classList.contains('dark') ? 'dark' : 'light' : activeTheme;
    setCurrentResolvedTheme(resolved);
  }, [activeTheme]);


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
           <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Cambiar tema">
               <Palette className="h-5 w-5"/>
            </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48"> {/* Ancho ajustado */}
           {/* Opcional: Título */}
           {/* <DropdownMenuLabel>Seleccionar Tema</DropdownMenuLabel>
           <DropdownMenuSeparator /> */}
           {themes.map((theme) => (
               <DropdownMenuItem
                    key={theme.value}
                    onClick={() => setTheme(theme.value)}
                    className={cn(
                        "flex items-center justify-between cursor-pointer text-sm px-2 py-1.5 rounded-sm", // Estilos base
                        // Resaltar si el valor es el tema activo O si el tema activo es 'system' y este es el tema resuelto
                        (activeTheme === theme.value || (activeTheme === 'system' && currentResolvedTheme === theme.value))
                          ? "font-semibold text-primary bg-accent dark:bg-accent/50"
                          : "hover:bg-accent/50 dark:hover:bg-accent/20"
                    )}
               >
                    <span>{theme.label}</span>
                    {(activeTheme === theme.value || (activeTheme === 'system' && currentResolvedTheme === theme.value)) && (
                        <Check className="h-4 w-4" />
                    )}
               </DropdownMenuItem>
           ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}