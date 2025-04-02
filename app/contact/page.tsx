// File: app/contact/page.tsx
// Purpose: Contact page, fixing the original error by using 'session' instead of 'token'.
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { APP_NAME } from '@/lib/constants';
import { useAuth } from '@/lib/hooks/useAuth'; // Import the CORRECTED hook
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, Linkedin, MessageCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils'; // Import cn for conditional classes
import { toast } from 'sonner';

export default function ContactPage() {
  const router = useRouter();
  // --- CORRECTION: Use 'session' and 'isLoading' from useAuth ---
  // The 'token' is inside session?.access_token if needed,
  // but usually checking for session existence is enough.
  const { session, isLoading: isAuthLoading } = useAuth();
  // -----------------------------------------------------------

  // Determine authentication status based on loading state and session presence
  const isAuthenticated = !isAuthLoading && !!session;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header/Navigation (similar to app/page.tsx) */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b">
        <div className="container flex items-center justify-between h-16 py-4 px-4 md:px-6">
          {/* Use button with onClick for SPA navigation */}
          <button onClick={() => router.push('/')} className="font-bold text-2xl text-primary focus:outline-none focus:ring-2 focus:ring-ring rounded-sm">
            {APP_NAME}
          </button>
          <nav className="flex items-center space-x-2 sm:space-x-4">
            <LinkButton href="/">Home</LinkButton>
            <LinkButton href="/about">About</LinkButton>
            <LinkButton href="/contact" isActive={true}>Contact</LinkButton> {/* Mark Contact as active */}
             <div className="ml-2"> {/* Container for Login/App button */}
                {/* Show loading spinner or appropriate button */}
                {isAuthLoading ? (
                    <Button variant="secondary" disabled={true} size="sm">
                        <Loader2 className="h-4 w-4 animate-spin" />
                    </Button>
                ) : isAuthenticated ? (
                    <Button variant="secondary" onClick={() => router.push('/chat')} size="sm">
                        Go to App
                    </Button>
                ) : (
                    <Button onClick={() => router.push('/login')} size="sm" className="transition-colors duration-150 hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        Login
                    </Button>
                )}
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content - Contact Form */}
      <main className="container mx-auto px-4 py-16 md:py-24 flex-1">
        <section className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you! Reach out using the form below or through our contact channels.
          </p>
        </section>

        <section className="max-w-lg mx-auto">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>
                We typically respond within 1-2 business days.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* ContactForm component remains unchanged */}
              <ContactForm />
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer (similar to app/page.tsx) */}
      <footer className="bg-muted/10 border-t py-8 mt-16">
        <div className="container text-center text-muted-foreground text-sm">
          © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

// Reusable Link Button Component (add isActive prop)
function LinkButton({ href, children, isActive = false }: { href: string; children: React.ReactNode; isActive?: boolean }) {
  const router = useRouter();
  return (
    <Button
        variant="link"
        onClick={() => router.push(href)}
        className={cn(
            "text-sm sm:text-base hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-ring rounded-sm px-1 sm:px-2",
            isActive ? "text-primary font-medium underline underline-offset-4" : "text-muted-foreground" // Style active link
        )}
     >
      {children}
    </Button>
  );
}

// Contact Form Component (remains the same, extracted for clarity)
function ContactForm() {
  // Basic form structure - add state management and submission logic as needed
  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Contact form submitted (implement submission logic)");
      toast.info("Form Submitted (Placeholder)", { description: "Contact form submission logic needs implementation."});
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
            Name:
          </label>
          <input
            type="text"
            id="name"
            required
            className="block w-full rounded-md border-input bg-background shadow-sm focus:border-ring focus:ring-ring/50 sm:text-sm p-2" // Use UI component styles
            placeholder="Your Name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            required
             className="block w-full rounded-md border-input bg-background shadow-sm focus:border-ring focus:ring-ring/50 sm:text-sm p-2"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
            Message:
          </label>
          <textarea
            id="message"
            rows={4}
            required
            className="block w-full rounded-md border-input bg-background shadow-sm focus:border-ring focus:ring-ring/50 sm:text-sm p-2 min-h-[100px]"
            placeholder="Your Message"
          />
        </div>
        <Button type="submit" className="w-full">
          Send Message
        </Button>
      </form>

      {/* Contact Info Section */}
      <div className="space-y-3 pt-6 border-t">
         <h3 className="text-sm font-medium text-muted-foreground mb-2">Other ways to reach us:</h3>
        <ContactInfoItem Icon={Mail} label="Email:" href="mailto:info@atenex.ai" text="info@atenex.ai" />
        <ContactInfoItem Icon={Phone} label="Phone:" href="tel:+15551234567" text="+1 (555) 123-4567" />
        <ContactInfoItem Icon={Linkedin} label="LinkedIn:" href="https://linkedin.com/company/atenex" text="Atenex on LinkedIn" targetBlank={true} />
        <ContactInfoItem Icon={MessageCircle} label="WhatsApp:" href="https://wa.me/15551234567" text="Chat on WhatsApp" targetBlank={true}/>
      </div>
    </div>
  );
}

// Helper component for contact info items
function ContactInfoItem({ Icon, label, href, text, targetBlank = false }: { Icon: React.ElementType, label: string, href: string, text: string, targetBlank?: boolean }) {
    return (
        <div className="flex items-center space-x-2 text-sm">
          <Icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <span className="text-muted-foreground">{label}</span>
          <a
            href={href}
            className="text-primary hover:underline truncate"
            target={targetBlank ? "_blank" : undefined}
            rel={targetBlank ? "noopener noreferrer" : undefined}
          >
            {text}
          </a>
        </div>
    );
}