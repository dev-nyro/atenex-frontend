import { redirect } from 'next/navigation';

// This page will likely just redirect to the main chat interface
export default function AppPage() {
    // Redirect to the default chat page or the first chat in history
    redirect('/chat');

    // Or render a welcome message/dashboard overview
    // return (
    //    <div>
    //      <h1>Welcome to Atenex</h1>
    //      <p>Select a chat or start a new one.</p>
    //    </div>
    // );
}