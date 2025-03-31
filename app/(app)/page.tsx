import { redirect } from 'next/navigation';

// This page handles the root '/' ONLY WITHIN the (app) route group context.
// The main app/page.tsx handles the absolute root '/'.
export default function AppPage() {
    // Redirect to the default chat page when accessing '/' after login.
    redirect('/chat');
}