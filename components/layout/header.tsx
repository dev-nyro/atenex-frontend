// File: components/layout/header.tsx
// Purpose: Displays the top header bar with theme toggle and user menu.
"use client";

import React from 'react';
import { Avatar, AvatarFallback /*, AvatarImage */ } from "@/components/ui/avatar"; // Image commented out if not used
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, /* User as UserIcon, */ Home, HelpCircle } from "lucide-react"; // Added Home, HelpCircle
import { useAuth } from '@/lib/hooks/useAuth'; // Import the CORRECTED hook
import { APP_NAME } from '@/lib/constants';
import { ThemePaletteButton } from '@/components/theme-palette-button'; // Use the palette button
import { useRouter } from 'next/navigation';
import { toast } from 'sonner'; // For logout feedback

export function Header() {
  // Get user and signOut function directly from the hook
  const { user, signOut } = useAuth();
  const router = useRouter();

  // Helper to get initials from name
  const getInitials = (name?: string | null): string => {
    if (!name) return '?'; // Handle null or empty name
    // Basic initials logic (e.g., "John Doe" -> "JD")
    const parts = name.split(' ').filter(Boolean); // Split by space and remove empty parts
    if (parts.length === 0) return '?';
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  // Logout handler using the signOut function from context
  const handleLogout = async () => {
      console.log("Header: Initiating logout...");
      try {
          await signOut();
          // Redirection is handled by AuthProvider/AppLayout observing the state change
          toast.success("Logged Out", { description: "You have been successfully logged out." });
      } catch (error) {
          // Error handling is likely within signOut itself, but catch here just in case
          console.error("Header: Logout failed unexpectedly.", error);
          toast.error("Logout Failed", { description: "Could not log you out." });
      }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur-sm px-4 md:px-6 shrink-0">
      {/* Left Side - Optional: Breadcrumbs or Title could go here */}
       <div className="flex items-center gap-2">
         {/* Example: Link back to the main app page or dashboard */}
         <Button variant="ghost" size="icon" onClick={() => router.push('/chat')} aria-label="Go to Chat">
             <Home className="h-5 w-5" />
         </Button>
          {/* <span className="text-lg font-semibold hidden md:inline">{APP_NAME}</span> */}
      </div>


      {/* Right Side - Controls */}
      <div className="flex items-center space-x-2 md:space-x-4">
        {/* Theme Palette Button */}
        <ThemePaletteButton />

         {/* Help Button (Example) */}
         <Button variant="ghost" size="icon" onClick={() => router.push('/help')} aria-label="Help & Support">
             <HelpCircle className="h-5 w-5" />
         </Button>

        {/* User Menu Dropdown (only shown if user exists) */}
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <Avatar className="h-9 w-9 border">
                  {/* Add AvatarImage if you have user profile pictures */}
                  {/* <AvatarImage src={user.avatarUrl || undefined} alt={user.name || 'User Avatar'} /> */}
                  <AvatarFallback className="bg-secondary text-secondary-foreground font-medium text-sm">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="sr-only">Open user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60" align="end" forceMount>
              {/* User Info Section */}
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none truncate" title={user.name || 'User'}>
                    {user.name || 'User'} {/* Display name or 'User' */}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground truncate" title={user.email}>
                    {user.email}
                  </p>
                  {/* Display Company ID if available */}
                  {user.companyId && (
                    <p className="text-xs leading-none text-muted-foreground/80 mt-1 flex items-center gap-1" title={`Company ID: ${user.companyId}`}>
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
                           <path fillRule="evenodd" d="M4 1.75A2.25 2.25 0 0 0 1.75 4v1.5a.75.75 0 0 0 1.5 0V4c0-.414.336-.75.75-.75h8.5c.414 0 .75.336.75.75v1.5a.75.75 0 0 0 1.5 0V4A2.25 2.25 0 0 0 12 1.75H4ZM1.75 8.5A.75.75 0 0 0 1 9.25v2.25A2.25 2.25 0 0 0 3.25 14h9.5A2.25 2.25 0 0 0 15 11.5V9.25a.75.75 0 0 0-1.5 0v2.25c0 .414-.336.75-.75.75h-9.5c-.414 0-.75-.336-.75-.75V9.25a.75.75 0 0 0-.75-.75Z" clipRule="evenodd" />
                       </svg>
                      <span className="truncate">Company: {user.companyId.substring(0, 8)}...</span>
                    </p>
                  )}
                   {/* Display Roles if available */}
                   {user.roles && user.roles.length > 0 && (
                     <p className="text-xs leading-none text-muted-foreground/80 mt-1" title={`Roles: ${user.roles.join(', ')}`}>
                       Role(s): {user.roles.join(', ')}
                     </p>
                   )}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {/* Menu Items */}
              <DropdownMenuItem onClick={() => router.push('/settings')} className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              {/* Add other items like Profile, Billing etc. if needed */}
              {/*
              <DropdownMenuItem onClick={() => router.push('/profile')} className="cursor-pointer">
                 <UserIcon className="mr-2 h-4 w-4" />
                 <span>Profile</span>
              </DropdownMenuItem>
              */}
              <DropdownMenuSeparator />
              {/* Logout Item */}
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
           // Optional: Show Login button if user is not logged in (though usually handled elsewhere)
           // <Button variant="outline" size="sm" onClick={() => router.push('/login')}>Login</Button>
           null // Usually header assumes user is logged in within AppLayout
        )}
        {/* End User Menu Dropdown */}
      </div>
    </header>
  );
}
