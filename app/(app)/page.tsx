// File: app/(app)/page.tsx
import { redirect } from 'next/navigation';

// This page handles the root '/' ONLY WITHIN the (app) route group context.
// When a logged-in user navigates to '/app' or '/', they should land here first.
export default function AppPage() {
    // Redirect to the default chat page when accessing '/' after login.
    redirect('/chat');
}