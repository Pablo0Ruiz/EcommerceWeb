import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('token')?.value;
        const searchParams = request.nextUrl.searchParams;



        if (!token) {

            return NextResponse.json(
                { error: 'Token no encontrado' }, 
                { status: 401 }
            );
        }


        const backendUrl = new URL('https://intelligent-karmen-areotar-52151d0d.koyeb.app/api/product');
        

        searchParams.forEach((value, key) => {
            backendUrl.searchParams.append(key, value);

        });



        const backendRes = await fetch(backendUrl.toString(), {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });



        if (!backendRes.ok) {
            const errorText = await backendRes.text();

            return NextResponse.json(
                { error: errorText || 'Error al buscar productos' },
                { status: backendRes.status }
            );
        }

        const data = await backendRes.json();



        
        return NextResponse.json(data);
        
    } catch (error) {
        console.error('Catch error en API:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}