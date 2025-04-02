// File: app/api/auth/login/route.ts
// *** DESACTIVADO: Ya no usaremos esta ruta simulada. ***
// *** La autenticación real se hará llamando a /api/v1/auth/login del gateway ***

import { NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
    console.error("ERROR: Attempted to use the SIMULATED /api/auth/login route. This route should be disabled or removed. Configure the frontend to call the real API Gateway endpoint (/api/v1/auth/login).");
    return NextResponse.json(
        { detail: 'This simulated login route is disabled. Use the real API Gateway endpoint.' },
        { status: 500 } // Return an error status to indicate misconfiguration
    );

/* // --- CÓDIGO SIMULADO COMENTADO ---
  try {
    const { email, password } = await request.json();
    console.log(`SIMULATED API Route: Login attempt for ${email}`);
    if (email === 'user@example.com' && password === 'password') {
      const DUMMY_SECRET = process.env.JWT_SECRET || 'your-very-strong-secret-key-keep-safe';
      const payload = {
        // *** ESTE PAYLOAD ES INCORRECTO - Faltan user_id, company_id ***
        userId: 'dummy-user-id-from-route', // Nombre incorrecto del claim
        email: email,
        companyId: 'dummy-company-id-from-route', // Nombre incorrecto del claim
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
      };
      const token = jwt.sign(payload, DUMMY_SECRET);
      console.log(`SIMULATED API Route: Login successful for ${email}`);
      return NextResponse.json({ access_token: token });
    } else {
      console.log(`SIMULATED API Route: Login failed for ${email}`);
      return NextResponse.json({ detail: 'Invalid credentials (Simulated)' }, { status: 401 });
    }
  } catch (error) {
    console.error("SIMULATED API Route Login Error:", error);
    return NextResponse.json({ detail: 'An error occurred during simulated login' }, { status: 500 });
  }
*/ // --- FIN CÓDIGO SIMULADO COMENTADO ---
}