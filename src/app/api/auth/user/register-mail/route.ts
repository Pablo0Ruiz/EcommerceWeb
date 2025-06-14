
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log('body:',body)
        const backendRes = await fetch('https://intelligent-karmen-areotar-52151d0d.koyeb.app/api/user/register-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!backendRes.ok) {
            throw new Error(await backendRes.text());
        }

        const data = await backendRes.json();
        console.log('result post:',data)
        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json(
            { error: err instanceof Error ? err.message : 'Error desconocido' },
            { status: 500 }
        );
    }
}