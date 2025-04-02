// File: app/api/auth/register/route.ts
// *** DESACTIVADO: Ya no usaremos esta ruta simulada. ***
// *** El registro real se hará llamando a /api/v1/auth/register del gateway ***

import { NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
     console.error("ERROR: Attempted to use the SIMULATED /api/auth/register route. This route should be disabled or removed. Configure the frontend to call the real API Gateway endpoint (/api/v1/auth/register).");
     return NextResponse.json(
         { detail: 'This simulated register route is disabled. Use the real API Gateway endpoint.' },
         { status: 500 } // Return an error status to indicate misconfiguration
     );

/* // --- CÓDIGO SIMULADO COMENTADO ---
  try {
    const { email, password, name } = await request.json();
    console.log(`SIMULATED API Route: Registration attempt for ${email}`);
    if (!email || !password) {
        return NextResponse.json({ detail: 'Email and password are required (Simulated)' }, { status: 400 });
    }
     const newUser = {
        id: `dummy-user-${Date.now()}`,
        email: email,
        name: name || `User ${Date.now()}`,
        companyId: `dummy-company-${Date.now()}`
     }
    const DUMMY_SECRET = process.env.JWT_SECRET || 'your-very-strong-secret-key-keep-safe';
    const payload = {
        // *** ESTE PAYLOAD ES INCORRECTO - Faltan user_id, company_id ***
        userId: newUser.id, // Nombre incorrecto del claim
        email: newUser.email,
        companyId: newUser.companyId, // Nombre incorrecto del claim
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
    };
    const token = jwt.sign(payload, DUMMY_SECRET);
    console.log(`SIMULATED API Route: Registration successful for ${email}`);
    return NextResponse.json({ access_token: token, user: { id: newUser.id, email: newUser.email, name: newUser.name, companyId: newUser.companyId } });
  } catch (error) {
    console.error("SIMULATED API Route Register Error:", error);
    return NextResponse.json({ detail: 'An error occurred during simulated registration' }, { status: 500 });
  }
*/ // --- FIN CÓDIGO SIMULADO COMENTADO ---
}