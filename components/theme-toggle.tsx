// File: components/theme-toggle.tsx
"use client";

import * as React from "react";
import { Moon, Sun, Palette } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const colorPalettes = [
    'system',
    'light',
    'dark',
    'blue',
    'green',
];

const themeToPalette: { [key: string]: string } = {
   'system': 'Default',
   'light': 'Light',
   'dark': 'Dark',
   'blue': 'Blue Oasis',
   'green': 'Emerald Depths'
}

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [currentPaletteIndex, setCurrentPaletteIndex] = React.useState(0);

  const handlePaletteChange = () => {
    setCurrentPaletteIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % colorPalettes.length;
      setTheme(colorPalettes[newIndex]);
      return newIndex;
    });
  };


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className={cn("h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0", theme === "dark" || theme === "blue" || theme === "green" ? "hidden" : "" )} />
          <Moon className={cn("absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100", theme !== "dark" && theme !== "blue" && theme !== "green" ? "hidden" : "")} />
          <Palette className={cn("absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:rotate-0 dark:scale-100", theme === "blue" || theme === "green" ? "" : "hidden")} />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
           {colorPalettes.map((palette) => (
               <DropdownMenuItem key={palette} onClick={() => setTheme(palette)}>
                   {themeToPalette[palette] || palette}
               </DropdownMenuItem>
           ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}