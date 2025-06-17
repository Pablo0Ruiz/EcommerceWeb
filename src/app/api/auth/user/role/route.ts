import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const body = await request.json();

    const { userId, newRole } = body;
    const backendRes = await fetch('https://intelligent-karmen-areotar-52151d0d.koyeb.app/api/user/updaterole', {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, newRole }),
    });

    const data = await backendRes.text();
    return NextResponse.json(data);
}