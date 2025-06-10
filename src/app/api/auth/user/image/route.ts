import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    
    const formData = await request.formData();

    const backendForm = new FormData();
    const image = formData.get('image');

    if (image) {
        backendForm.append('image', image);
    }

    const backendRes = await fetch('https://intelligent-karmen-areotar-52151d0d.koyeb.app/api/user/addimage', {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: backendForm as BodyInit,
    });

    const data = await backendRes.json();

    return NextResponse.json(data);
}