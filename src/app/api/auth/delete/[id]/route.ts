
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const token = request.cookies.get('token')?.value;
    const {id} = await params

    const backendRes = await fetch(`https://intelligent-karmen-areotar-52151d0d.koyeb.app/api/user/${id}?logic=true`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await backendRes.json();
    return NextResponse.json(data);
}