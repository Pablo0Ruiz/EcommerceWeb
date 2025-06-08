import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    
    const formData = await request.formData();

    const backendForm = new FormData();
    const image = formData.get('image');

    if (image) {
        backendForm.append('image', image);
    }

    const backendRes = await fetch('http://localhost:8000/api/user/addimage', {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: backendForm as BodyInit,
    });

    const data = await backendRes.json();

    return NextResponse.json(data);
}