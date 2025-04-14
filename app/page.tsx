// File: app/page.tsx
// Purpose: Public home page, shows login/register or go to app based on auth state.
"use client";

import React from 'react';
import { Button, buttonVariants } from '@/components/ui/button'; // Import buttonVariants
import { useRouter } from 'next/navigation';
import { APP_NAME } from '@/lib/constants';
import { useAuth } from '@/lib/hooks/useAuth'; // Import the CORRECTED hook
// --- ELIMINADO: Importación de EmailConfirmationHandler ---
// import EmailConfirmationHandler from '@/components/auth/email-confirmation-handler';
// ------------------------------------------------------
import { cn } from '@/lib/utils';
import { Loader2, Home as HomeIcon, Info, Mail } from 'lucide-react'; // Added icons
import Link from 'next/link'; // Import the Link component

export default function HomePage() {
  const router = useRouter();
  // Get user and loading state from the auth hook
  const { user, isLoading: isAuthLoading } = useAuth();

  // Determine authentication status (only true if not loading AND user exists)
  const isAuthenticated = !isAuthLoading && !!user;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-background to-secondary/30 dark:to-muted/30">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          {/* App Logo/Name */}
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-xl font-bold text-primary focus:outline-none focus:ring-2 focus:ring-ring rounded-sm"
          >
             {/* <img src="/logo.svg" alt={`${APP_NAME} logo`} className="h-6 w-6" /> Optional Logo */}
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                 <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.5a.75.75 0 0 0 .5.707A9.716 9.716 0 0 0 6 21a9.707 9.707 0 0 0 5.25-1.533.75.75 0 0 0 .5-.68V5.213a.75.75 0 0 0-.5-.68ZM12.75 4.533A9.707 9.707 0 0 1 18 3a9.735 9.735 0 0 1 3.25.555.75.75 0 0 1 .5.707v14.5a.75.75 0 0 1-.5.707A9.716 9.716 0 0 1 18 21a9.707 9.707 0 0 1-5.25-1.533.75.75 0 0 1-.5-.68V5.213a.75.75 0 0 1-.5-.68Z" />
             </svg>
            <span>{APP_NAME}</span>
          </button>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <LinkButton href="/" Icon={HomeIcon} isActive={true}>Home</LinkButton>
            <LinkButton href="/about" Icon={Info}>About</LinkButton>
            <LinkButton href="/contact" Icon={Mail}>Contact</LinkButton>

            {/* Auth Button Container */}
            <div className="pl-2 sm:pl-4">
                {isAuthLoading ? (
                    // Show loading spinner while checking auth state
                    <Button variant="secondary" disabled={true} size="sm" className="w-[90px]"> {/* Fixed width */}
                        <Loader2 className="h-4 w-4 animate-spin" />
                    </Button>
                ) : isAuthenticated ? (
                    // Show "Go to App" button if logged in
                    <Button variant="default" onClick={() => router.push('/chat')} size="sm" className="w-[90px]">
                        Go to App
                    </Button>
                ) : (
                    // Show "Login" button if logged out
                    <Button
                        variant="outline" // Use outline for login button on homepage
                        onClick={() => router.push('/login')}
                        size="sm"
                        className="w-[90px] transition-colors duration-150 hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                        Login
                    </Button>
                )}
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 md:py-24 flex-1 flex flex-col items-center justify-center text-center">
         {/* Hero Section */}
         <section>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
                Unlock Your Company's Knowledge with <span className="text-primary">{APP_NAME}</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
                Ask questions in natural language and get instant, accurate answers sourced directly from your organization's documents and data.
            </p>
            {/* Call to Action Button */}
            {isAuthLoading ? (
                 <Button size="lg" disabled={true} className="w-48">
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading...
                 </Button>
            ) : (
              <Button
                  size="lg"
                  onClick={() => isAuthenticated ? router.push('/chat') : router.push('/login')} // Changed '/register' to '/login' as register flow might not exist
                  className={cn(
                      "w-48 transition-all duration-150 ease-in-out transform hover:scale-105",
                      "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus:outline-none"
                  )}
              >
                  {isAuthenticated ? 'Go to Chat' : 'Get Started'} {/* Adjusted button text */}
              </Button>
            )}
            {!isAuthenticated && !isAuthLoading && (
                 <p className="text-xs text-muted-foreground mt-3">
                     Already have an account? <Link href="/login" className="text-primary hover:underline">Log In</Link>
                 </p>
            )}
         </section>

         {/* Feature Section (Optional) */}
         <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
             <FeatureCard
                 title="Intelligent Search"
                 description="Find the exact information you need instantly using natural language queries. No more keyword guessing."
                 icon="Search"
              />
             <FeatureCard
                 title="Centralized Knowledge"
                 description="Break down information silos. Access your entire organization's collective knowledge in one secure place."
                 icon="Library"
             />
             <FeatureCard
                 title="Enhanced Productivity"
                 description="Empower your team with faster access to relevant information, enabling quicker, data-driven decisions."
                  icon="Zap"
             />
         </section>

         {/* --- ELIMINADO: EmailConfirmationHandler ya no es necesario --- */}
         {/* <EmailConfirmationHandler /> */}
         {/* ------------------------------------------------------------- */}
      </main>

      {/* Footer */}
      <footer className="bg-muted/10 border-t py-8 mt-16">
        <div className="container text-center text-muted-foreground text-sm">
          © {new Date().getFullYear()} {APP_NAME}. All rights reserved. | <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link> | <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
        </div>
      </footer>
    </div>
  );
}

// Reusable Link Button Component for Header (sin cambios)
function LinkButton({ href, children, Icon, isActive = false }: { href: string; children: React.ReactNode; Icon: React.ElementType; isActive?: boolean }) {
  const router = useRouter();
  return (
    <Button
        variant="ghost" // Use ghost variant for nav links
        onClick={() => router.push(href)}
        className={cn(
            "text-sm px-2 sm:px-3 py-1 h-8", // Adjust padding/height
            "hover:bg-accent/50 focus:outline-none focus:ring-1 focus:ring-ring rounded",
            isActive ? "text-primary font-medium bg-accent/50" : "text-muted-foreground hover:text-foreground"
        )}
     >
       <Icon className="h-4 w-4 mr-1 hidden sm:inline-block" /> {/* Show icon on larger screens */}
      {children}
    </Button>
  );
}

// Reusable Feature Card Component (sin cambios)
function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
   const IconComponent = ({ name, ...props }: { name: string } & React.SVGProps<SVGSVGElement>) => { /* ... */ };
  return (
    <div className="p-6 rounded-lg bg-card/50 hover:bg-card border border-border/50 hover:shadow-lg transition-all duration-200 text-left">
       <IconComponent name={icon} className="w-8 h-8 mb-3 text-primary" />
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}