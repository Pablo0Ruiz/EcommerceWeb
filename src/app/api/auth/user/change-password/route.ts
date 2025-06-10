import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const body =  await request.json()


    const backendRes = await fetch('https://intelligent-karmen-areotar-52151d0d.koyeb.app/api/user/changepswd', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body)
    });

    const data = await backendRes.json();

    return NextResponse.json(data);
}