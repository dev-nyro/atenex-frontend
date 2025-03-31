"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquareText, Trash2 } from 'lucide-react'; // Import icons
import { cn } from '@/lib/utils';

// Dummy data - replace with actual chat history fetching
const dummyHistory = [
  { id: 'chat-1', title: 'Q3 Marketing Strategy' },
  { id: 'chat-2', title: 'Competitor Analysis - Project X' },
  { id: 'chat-3', title: 'Onboarding Process Review' },
  { id: 'chat-4', title: 'API Documentation Query' },
  { id: 'chat-5', title: 'Financial Report Summary' },
  { id: 'chat-6', title: 'Long Chat Title That Might Need Truncation Example' },
];

export function ChatHistory() {
  const pathname = usePathname();
  // TODO: Fetch actual chat history, maybe store in state or use a hook
  const [history, setHistory] = useState(dummyHistory);

  const handleDeleteChat = (id: string, event: React.MouseEvent) => {
     event.stopPropagation(); // Prevent link navigation when clicking delete
     event.preventDefault();
     console.log("Deleting chat:", id);
     // TODO: Implement actual deletion logic (API call, update state)
     setHistory(prev => prev.filter(chat => chat.id !== id));
  }

  return (
    <ScrollArea className="h-[300px] flex-1"> {/* Adjust height as needed */}
      <div className="flex flex-col gap-1 p-2">
        {history.length === 0 && (
          <p className="text-sm text-muted-foreground px-2 py-4 text-center">No chat history yet.</p>
        )}
        {history.map((chat) => {
           const isActive = pathname === `/chat/${chat.id}`;
           return (
            <Link key={chat.id} href={`/chat/${chat.id}`} passHref legacyBehavior>
                <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                        "w-full justify-between h-10 group",
                        isActive ? "bg-muted hover:bg-muted" : ""
                    )}
                    title={chat.title}
                >
                    <div className="flex items-center overflow-hidden">
                        <MessageSquareText className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="truncate flex-1 text-sm">{chat.title}</span>
                    </div>
                    <Trash2
                        className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0 hover:text-destructive"
                        onClick={(e) => handleDeleteChat(chat.id, e)}
                        aria-label={`Delete chat: ${chat.title}`}
                    />
                </Button>
            </Link>
           );
        })}
      </div>
    </ScrollArea>
  );
}