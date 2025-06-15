import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('token')?.value;
        const searchParams = request.nextUrl.searchParams;

        // console.log('=== API SEARCH ROUTE ===');
        // console.log('Token presente:', !!token);
        // console.log('Parámetros recibidos:', Object.fromEntries(searchParams.entries()));

        if (!token) {
            console.log('ERROR: No token found');
            return NextResponse.json(
                { error: 'Token no encontrado' }, 
                { status: 401 }
            );
        }

        // Construir la URL del backend
        const backendUrl = new URL('https://intelligent-karmen-areotar-52151d0d.koyeb.app/api/product');
        
        // Transferir parámetros
        searchParams.forEach((value, key) => {
            backendUrl.searchParams.append(key, value);
            console.log(`Param transferido: ${key}=${value}`);
        });

        console.log('URL backend completa:', backendUrl.toString());

        const backendRes = await fetch(backendUrl.toString(), {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        console.log('Response status:', backendRes.status);
        console.log('Response headers:', Object.fromEntries(backendRes.headers.entries()));

        if (!backendRes.ok) {
            const errorText = await backendRes.text();
            console.error('Backend error response:', errorText);
            return NextResponse.json(
                { error: errorText || 'Error al buscar productos' },
                { status: backendRes.status }
            );
        }

        const data = await backendRes.json();
        console.log('Backend response data type:', typeof data);
        console.log('Backend response is array:', Array.isArray(data));
        console.log('Backend response length:', data?.length);
        
        return NextResponse.json(data);
        
    } catch (error) {
        console.error('Catch error en API:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}