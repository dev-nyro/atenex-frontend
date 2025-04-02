// File: app/page.tsx
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { APP_NAME } from '@/lib/constants';
import { useAuth } from '@/lib/hooks/useAuth';
import EmailConfirmationHandler from '@/components/auth/email-confirmation-handler';

export default function HomePage() {
  const router = useRouter();
  const { token } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b">
        <div className="container flex items-center justify-between h-16 py-4 px-4">
          <a href="/" className="font-bold text-2xl text-primary">{APP_NAME}</a>
          <nav className="flex items-center space-x-4 sm:space-x-6 lg:space-x-8">
            <LinkButton href="/">Home</LinkButton>
            <LinkButton href="/about">About Us</LinkButton>
            <LinkButton href="/contact">Contact Us</LinkButton>
            {token ?
              <Button variant="secondary" onClick={() => router.push('/chat')} className="ml-2">
                Go to App
              </Button>
              :
              <Button onClick={() => router.push('/login')}>
                Login
              </Button>
            }

          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 md:py-24 flex-1">
        <section className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
            Unlock Your Enterprise Knowledge with <span className="text-primary">{APP_NAME}</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Ask questions in natural language and get instant answers based on your organization's collective knowledge.
          </p>
          <Button size="lg" onClick={() => token ? router.push('/chat') : router.push('/register')}>
            {token ? 'Go to Chat' : 'Get Started'}
          </Button>
        </section>

        <section className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature Cards - replace with actual feature descriptions */}
          <FeatureCard title="Intelligent Search" description="Find the information you need quickly and easily using natural language queries." />
          <FeatureCard title="Centralized Knowledge" description="Access all your organization's collective knowledge in one place, eliminating information silos." />
          <FeatureCard title="Improved Productivity" description="Empower your team to make better decisions with faster access to relevant insights." />
        </section>
           <EmailConfirmationHandler />
      </main>

      {/* Footer (optional) */}
      <footer className="bg-secondary/10 border-t py-8">
        <div className="container text-center text-muted-foreground">
          © {new Date().getFullYear()} Atenex. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

// Reusable Button Component
function LinkButton({ href, children }: { href: string; children: React.ReactNode }) {
  const router = useRouter();
  return (
    <Button variant="link" onClick={() => router.push(href)}>
      {children}
    </Button>
  );
}

// Reusable Feature Card Component
function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6 rounded-lg shadow-md bg-card hover:shadow-xl transition-shadow duration-200">
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}