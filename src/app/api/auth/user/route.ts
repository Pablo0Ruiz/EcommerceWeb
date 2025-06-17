
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    const backendRes = await fetch('https://intelligent-karmen-areotar-52151d0d.koyeb.app/api/user/profile', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await backendRes.json();

    return NextResponse.json(data);
}


export async function PUT(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const body = await request.json();

    
    const backendRes = await fetch('https://intelligent-karmen-areotar-52151d0d.koyeb.app/api/user/profile', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });

    const data = await backendRes.json();
    return NextResponse.json(data);
}



