import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const body = await request.json()

    const backendRes = await fetch('http://localhost:8000/api/user/recover-psswd', {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body)
    });

    const data = await backendRes.json();
    return NextResponse.json(data);
}