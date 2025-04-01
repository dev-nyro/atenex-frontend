    // File: components/layout/header.tsx
    "use client";

    import React from 'react';
    import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
    import { Button } from "@/components/ui/button";
    import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
    import { LogOut, Settings, User as UserIcon, Menu, Home } from "lucide-react";
    import { useAuth } from '@/lib/hooks/useAuth';
    import { APP_NAME } from '@/lib/constants';
    import { ThemePaletteButton } from '@/components/theme-palette-button';
    import { useRouter } from 'next/navigation';

    export function Header() {
      const { user, logout } = useAuth();
        const router = useRouter();
        const getInitials = (name?: string) => {
          if (!name) return '?';
          return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
        };

        return (
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
            {/* Left side - Home Link */}
            <div className="flex items-center">
                <Button variant="ghost" size="icon" onClick={() => router.push('/')}>
                    <Home className="h-5 w-5" />
                    <span className="sr-only">Home</span>
                </Button>
                <span className="text-lg font-semibold hidden md:inline">{APP_NAME}</span>
                {/* Add Breadcrumbs or dynamic title here */}
            </div>


            {/* Right side - Theme toggle and User menu */}
            <div className="flex items-center space-x-4">
              <ThemePaletteButton />
              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                      <Avatar className="h-9 w-9">
                        {/* Add AvatarImage if user has profile picture URL */}
                        {/* <AvatarImage src="/avatars/01.png" alt={user.name || user.email} /> */}
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name || 'User'}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {/* Add links to settings or profile page */}
                    <DropdownMenuItem onClick={() => router.push('/settings')}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                      {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
                    </DropdownMenuItem>
                    {/* Remove Profile DropDown Option
                    <DropdownMenuItem>
                      <UserIcon className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                      {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem> */}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </header>
        );
      }