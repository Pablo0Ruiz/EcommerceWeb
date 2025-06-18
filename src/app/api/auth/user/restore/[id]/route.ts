// import { NextResponse, NextRequest } from "next/server";

// export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
//     const token = request.cookies.get('token')?.value;
//     const { id } = await params


//     const backendRes = await fetch(`https://intelligent-karmen-areotar-52151d0d.koyeb.app/api/user/restore/${id}`, {
//         method: 'PATCH',
//         headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//         },
//     });

//     const data = await backendRes.json();
//     return NextResponse.json(data);
// }

import { NextResponse, NextRequest } from "next/server";

export async function PATCH(
    request: NextRequest, 
    context: { params: Promise<{ id: string }> }
) {
    const token = request.cookies.get('token')?.value;
    
    // Awaitar los parámetros
    const { id } = await context.params;

    const backendRes = await fetch(`https://intelligent-karmen-areotar-52151d0d.koyeb.app/api/user/restore/${id}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    });

    const data = await backendRes.json();
    return NextResponse.json(data);
}
