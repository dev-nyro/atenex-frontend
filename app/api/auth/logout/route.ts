// Example Backend Route for Logout (Optional)
// Often, logout is handled purely client-side by clearing the token.
// This route could be used for server-side session invalidation if needed.

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    console.log("API Route: Logout request received");
    // --- SERVER-SIDE LOGOUT LOGIC (IF ANY) ---
    // e.g., Invalidate refresh tokens, clear server-side session state.
    // For simple JWT, there might be nothing to do here.
    // --- END SERVER-SIDE LOGIC ---

    // Respond with success
    return NextResponse.json({ message: 'Logout successful' });

  } catch (error) {
    console.error("API Route Logout Error:", error);
    return NextResponse.json({ detail: 'An error occurred during logout' }, { status: 500 });
  }
}

// Note: You might also need a GET route or similar to check auth status
// e.g., /api/auth/session which verifies the token and returns user info.