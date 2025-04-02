// File: app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/lib/hooks/useAuth";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Atenex - Consulta de Conocimiento Empresarial",
  description: "Consulta tu base de conocimiento empresarial usando lenguaje natural.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system" // Or your preferred default
            enableSystem
            disableTransitionOnChange
          >
            {children}
            {/* (*) Ensure this Toaster component is rendered */}
            <Toaster richColors position="top-right" /> {/* Added richColors and position */}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}