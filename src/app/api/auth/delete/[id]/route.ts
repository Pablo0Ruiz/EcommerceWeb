
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest, { params }: { params: { id: string, logic?: boolean } }) {
    const token = request.cookies.get('token')?.value;
    const {id} = await params

    let url = `http://localhost:8000/api/user${id}`

    if (params.logic == true){
        url = url + "?logic=true"
    }

    const backendRes = await fetch(url, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await backendRes.json();
    return NextResponse.json(data);
}