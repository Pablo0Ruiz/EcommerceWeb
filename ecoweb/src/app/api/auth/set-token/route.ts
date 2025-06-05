import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    const { token } = await req.json();

    const response = NextResponse.json({ ok: true });
    response.cookies.set('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24,
    });

    return response;
}