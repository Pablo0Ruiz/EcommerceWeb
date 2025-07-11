// import { NextRequest, NextResponse } from "next/server"; 

// export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
//     const token = request.cookies.get('token')?.value;
//     const { id } = await params;

//     const backendRes = await fetch(`https://intelligent-karmen-areotar-52151d0d.koyeb.app/api/product/${id}`, {
//         method: 'GET',
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });

//     const data = await backendRes.json();
//     return NextResponse.json(data);
// }



// export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
//     const token = request.cookies.get('token')?.value;
//     const { id } = params;
//     const body = await request.json();

//     const backendRes = await fetch(`https://intelligent-karmen-areotar-52151d0d.koyeb.app/api/product/${id}`, {
//         method: 'PUT',
//         headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(body),
//     });

//     const data = await backendRes.json();
//     return NextResponse.json(data);
// }


// export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
//     const token = request.cookies.get('token')?.value;
//     const { id } = params;

//     const backendRes = await fetch(`https://intelligent-karmen-areotar-52151d0d.koyeb.app/api/product/${id}`, {
//         method: 'DELETE',
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });

//     const data = await backendRes.json();
//     return NextResponse.json(data);
// }

// export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
//     const token = request.cookies.get('token')?.value;
//     const { id } = params;
//     const body = await request.json();

//     const backendRes = await fetch(`https://intelligent-karmen-areotar-52151d0d.koyeb.app/api/product/${id}/review`, {
//         method: 'POST',
//         headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(body),
//     });

//     const data = await backendRes.json();
//     return NextResponse.json(data);
// }

import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest, 
    context: { params: Promise<{ id: string }> }
) {
    const token = request.cookies.get('token')?.value;
    
    // Awaitar los parámetros
    const { id } = await context.params;

    const backendRes = await fetch(`https://intelligent-karmen-areotar-52151d0d.koyeb.app/api/product/${id}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await backendRes.json();
    return NextResponse.json(data);
}

export async function PUT(
    request: NextRequest, 
    context: { params: Promise<{ id: string }> }
) {
    const token = request.cookies.get('token')?.value;
    
    // Awaitar los parámetros
    const { id } = await context.params;
    const body = await request.json();

    const backendRes = await fetch(`https://intelligent-karmen-areotar-52151d0d.koyeb.app/api/product/${id}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    const data = await backendRes.json();
    return NextResponse.json(data);
}

export async function DELETE(
    request: NextRequest, 
    context: { params: Promise<{ id: string }> }
) {
    const token = request.cookies.get('token')?.value;
    
    // Awaitar los parámetros
    const { id } = await context.params;

    const backendRes = await fetch(`https://intelligent-karmen-areotar-52151d0d.koyeb.app/api/product/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await backendRes.json();
    return NextResponse.json(data);
}

export async function POST(
    request: NextRequest, 
    context: { params: Promise<{ id: string }> }
) {
    const token = request.cookies.get('token')?.value;
    
    // Awaitar los parámetros
    const { id } = await context.params;
    const body = await request.json();

    const backendRes = await fetch(`https://intelligent-karmen-areotar-52151d0d.koyeb.app/api/product/${id}/review`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    const data = await backendRes.json();
    return NextResponse.json(data);
}