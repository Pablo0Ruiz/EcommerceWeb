import { NextRequest, NextResponse } from "next/server";




export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const token = request.cookies.get('token')?.value;
    const { id } = params;
    const formData = await request.formData();

    const backendForm = new FormData();
    const image = formData.get('image');
    if (image) {
        backendForm.append('image', image);
    }

    const backendRes = await fetch(`http://localhost:8000/api/product/${id}/addimage`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: backendForm as BodyInit,
    });

    const data = await backendRes.json();
    return NextResponse.json(data);
}