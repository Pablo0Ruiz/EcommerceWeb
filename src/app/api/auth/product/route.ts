import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    const body = await request.json();

    const backendRes = await fetch('https://intelligent-karmen-areotar-52151d0d.koyeb.app/api/product', {
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
    console.log()
    const token = request.cookies.get('token')?.value;
    const { searchParams } = new URL(request.url);
    // console.log('esto es searchparams:',searchParams.toString())
    const backendRes = await fetch(`https://intelligent-karmen-areotar-52151d0d.koyeb.app/api/product?${searchParams.toString()}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log(backendRes)
    const data = await backendRes.json();
    return NextResponse.json(data);
}