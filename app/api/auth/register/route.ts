// Example Backend Route for Registration

import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    console.log(`API Route: Registration attempt for ${email}`);

    // --- !!! DUMMY REGISTRATION LOGIC !!! ---
    // --- !!! REPLACE WITH ACTUAL USER CREATION IN YOUR BACKEND/DB !!! ---
    // Check if user already exists, create user, etc.
    // For demo, assume registration is always successful if email/password provided
    if (!email || !password) {
        return NextResponse.json({ detail: 'Email and password are required' }, { status: 400 });
    }

     // --- DUMMY USER CREATION ---
     const newUser = {
        id: `dummy-user-${Date.now()}`,
        email: email,
        name: name || `User ${Date.now()}`,
        companyId: `dummy-company-${Date.now()}` // Assign a dummy company
     }

    // --- DUMMY JWT GENERATION AFTER REGISTRATION ---
    const DUMMY_SECRET = process.env.JWT_SECRET || 'your-very-strong-secret-key-keep-safe';
    const payload = {
        userId: newUser.id,
        email: newUser.email,
        companyId: newUser.companyId,
        exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour expiry
    };
    const token = jwt.sign(payload, DUMMY_SECRET);

    console.log(`API Route: Registration successful for ${email}`);
    // Return token and user info (omit sensitive data like password hash)
    return NextResponse.json({ access_token: token, user: { id: newUser.id, email: newUser.email, name: newUser.name, companyId: newUser.companyId } });
    // --- END DUMMY LOGIC ---

  } catch (error) {
    console.error("API Route Register Error:", error);
    // Handle specific errors like "user already exists" if applicable
    return NextResponse.json({ detail: 'An error occurred during registration' }, { status: 500 });
  }
}