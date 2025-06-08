import { NextResponse, NextRequest } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const token = request.cookies.get('token')?.value;
    const { id } = params
    const body = await request.json()

    const backendRes = await fetch(`http://localhost:8000/api/user/restore/${id}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body)
    });

    const data = await backendRes.json();
    return NextResponse.json(data);
}


