import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const token = request.cookies.get('token')?.value;
    const { id } = params;

    const backendRes = await fetch(`http://localhost:8000/api/order/${id}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await backendRes.json();
    return NextResponse.json(data);
}


export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const token = request.cookies.get('token')?.value;
    const { id } = params;


    const backendRes = await fetch(`http://localhost:8000/api/order/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },

    });

    const data = await backendRes.json();
    return NextResponse.json(data);
}
