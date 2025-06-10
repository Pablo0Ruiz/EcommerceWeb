import { getUserCookie } from '@/shared/utils/cookies';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const id = getUserCookie()

    const backendRes = await fetch(`https://intelligent-karmen-areotar-52151d0d.koyeb.app/api/user/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await backendRes.json();
    return NextResponse.json(data);
}