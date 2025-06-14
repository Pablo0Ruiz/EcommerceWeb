import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    const backendRes = await fetch('https://intelligent-karmen-areotar-52151d0d.koyeb.app/api/user/', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await backendRes.json();
    return NextResponse.json(data);
}