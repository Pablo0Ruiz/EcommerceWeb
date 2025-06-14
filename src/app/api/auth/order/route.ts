import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    const body = await request.json();
    console.log('Received body:', body);

    const backendRes = await fetch('https://intelligent-karmen-areotar-52151d0d.koyeb.app/api/order', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    const data = await backendRes.json();
    return NextResponse.json(data);
}

export async function GET(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    const backendRes = await fetch('https://intelligent-karmen-areotar-52151d0d.koyeb.app/api/order', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },

    });

    const data = await backendRes.json();
    return NextResponse.json(data);
}





