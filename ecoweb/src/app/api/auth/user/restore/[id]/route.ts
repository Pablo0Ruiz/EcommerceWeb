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

// esta es la forma de usarlo 
// const restoreUser = async (id: string) => {
//     try {
//         const res = await fetch(`/api/auth/user/restore/${id}`, {
//             method: 'PATCH',
//             credentials: 'include', // para que mande la cookie httpOnly con el token
//         });

//         if (!res.ok) {
//             throw new Error('Error al restaurar el usuario');
//         }

//         const data = await res.json();
//         console.log('Usuario restaurado:', data);
//         return data;
//     } catch (err) {
//         console.error(err);
//     }
// };
