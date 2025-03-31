import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/lib/hooks/useAuth"; // Import AuthProvider
import { Toaster } from "@/components/ui/toaster"; // For displaying notifications

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Atenex - Enterprise Knowledge Query",
  description: "Query your enterprise knowledge base using natural language.",
  // Add icons later if needed
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <AuthProvider> {/* Wrap with AuthProvider */}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster /> {/* Add Toaster component */}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}