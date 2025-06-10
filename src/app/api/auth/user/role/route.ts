import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const body = await request.json()

    const backendRes = await fetch('https://intelligent-karmen-areotar-52151d0d.koyeb.app/api/user/updaterole', {
        method:'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body)
    });

    const data = await backendRes.json();
    return NextResponse.json(data);
}