// import { NextRequest, NextResponse } from 'next/server';

// export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
//     const token = request.cookies.get('token')?.value;
//     const { id } = context.params;

//     const backendRes = await fetch(`https://intelligent-karmen-areotar-52151d0d.koyeb.app/api/user/${id}?logic=true`, {
//         method: 'DELETE',
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });

//     const data = await backendRes.json();
//     return NextResponse.json(data);
// }


import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const token = request.cookies.get('token')?.value;

    // Awaitar los parámetros
    const { id } = await context.params;

    const backendRes = await fetch(`https://intelligent-karmen-areotar-52151d0d.koyeb.app/api/user/${id}?logic=true`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await backendRes.json();
    return NextResponse.json(data);
}