// Example Backend Route (using Next.js Route Handler - BFF pattern)
// In a real app, this might call your actual Auth microservice or handle auth logic.
// For this example, it simulates login and returns a dummy JWT.

import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'; // Use a JWT library like 'jsonwebtoken' or 'jose'
// You'd install this: npm install jsonwebtoken @types/jsonwebtoken

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    console.log(`API Route: Login attempt for ${email}`);

    // --- !!! DUMMY AUTHENTICATION LOGIC !!! ---
    // --- !!! REPLACE WITH ACTUAL AUTHENTICATION AGAINST YOUR BACKEND/DB !!! ---
    if (email === 'user@example.com' && password === 'password') {
      // --- DUMMY JWT GENERATION ---
      // --- REPLACE WITH SECURE JWT SIGNING USING A STRONG SECRET KEY ---
      const DUMMY_SECRET = process.env.JWT_SECRET || 'your-very-strong-secret-key-keep-safe'; // LOAD FROM ENV VARS
      const payload = {
        userId: 'dummy-user-id-from-route',
        email: email,
        companyId: 'dummy-company-id-from-route', // Add relevant claims
        // Add expiry (e.g., '1h', '7d')
        exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour expiry
      };
      const token = jwt.sign(payload, DUMMY_SECRET);

       console.log(`API Route: Login successful for ${email}`);
      return NextResponse.json({ access_token: token });
    } else {
        console.log(`API Route: Login failed for ${email}`);
      return NextResponse.json({ detail: 'Invalid credentials' }, { status: 401 });
    }
    // --- END DUMMY LOGIC ---

  } catch (error) {
    console.error("API Route Login Error:", error);
    return NextResponse.json({ detail: 'An error occurred during login' }, { status: 500 });
  }
}