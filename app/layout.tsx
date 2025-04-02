// File: app/layout.tsx
// Purpose: Root layout, sets up global providers (Theme, Auth) and Toaster.
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Import global styles
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider"; // Theme context
import { AuthProvider } from "@/lib/hooks/useAuth"; // CORRECTED Auth context
import { Toaster } from "@/components/ui/sonner"; // Sonner for notifications

// Setup Inter font
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

// Metadata for the application
export const metadata: Metadata = {
  title: "Atenex - AI Knowledge Assistant", // Updated title
  description: "Query your enterprise knowledge base using natural language with Atenex.",
  // Add more metadata: icons, open graph tags, etc.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning> {/* Set language, suppress hydration warning */}
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased", // Base styles
          inter.variable // Apply Inter font variable
        )}
      >
        {/* Wrap entire application in AuthProvider */}
        <AuthProvider>
          {/* ThemeProvider for light/dark/custom themes */}
          <ThemeProvider
            attribute="class" // Use class strategy for theming
            defaultTheme="system" // Default to system preference
            enableSystem // Allow system preference detection
            disableTransitionOnChange // Prevent transitions on theme change
          >
            {/* Render the application content */}
            {children}

            {/* Global Toaster component for notifications */}
            <Toaster richColors position="top-right" closeButton />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}