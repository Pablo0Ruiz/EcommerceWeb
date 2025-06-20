import { NextResponse } from 'next/server';

export async function POST() {

    const response = NextResponse.json({ ok: true });
    response.cookies.set('token', '', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        maxAge: 0,
    });

    return response;
}