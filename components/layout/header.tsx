// File: components/layout/header.tsx (MODIFICADO)
"use client";

import React from 'react';
import { APP_NAME } from '@/lib/constants';
import { useRouter } from 'next/navigation';

export function Header() {
  const router = useRouter();

  // User menu, theme, and help are now in the sidebar footer.

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background/95 backdrop-blur-sm px-4 md:px-6 shrink-0">
      {/* Placeholder for future breadcrumbs or page title */}
      <div className="flex items-center gap-2">
        {/* <h1 className="text-lg font-semibold text-foreground">Chat</h1> */}
      </div>
    </header>
  );
}