import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const token = request.cookies.get('token')?.value;
        const body = await request.json();
        

        const backendRes = await fetch('https://intelligent-karmen-areotar-52151d0d.koyeb.app/api/order', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        
        // Obtener el texto de la respuesta primero
        const responseText = await backendRes.text();


        if (!backendRes.ok) {
            return NextResponse.json(
                { message: responseText || 'Error al crear la orden en el backend' },
                { status: backendRes.status }
            );
        }

        // Verificar si la respuesta está vacía
        if (!responseText.trim()) {
            console.warn('Empty response from backend');
            return NextResponse.json({ 
                message: 'Orden creada exitosamente',
                orderId: Date.now(),
                status: 'success'
            });
        }

        // Intentar parsear como JSON
        try {
            const data = JSON.parse(responseText);

            return NextResponse.json(data);
        } catch (parseError) {
            console.error('Error parsing backend JSON:', parseError);
            console.error('Response text was:', responseText);
            
            return NextResponse.json({ 
                message: 'Orden procesada pero respuesta inválida del backend',
                rawResponse: responseText,
                status: 'warning'
            });
        }

    } catch (error) {
        console.error('API Route Error:', error);
        
        return NextResponse.json(
            { message: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('token')?.value;

        const backendRes = await fetch('https://intelligent-karmen-areotar-52151d0d.koyeb.app/api/order', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const responseText = await backendRes.text();
        
        if (!backendRes.ok) {
            return NextResponse.json(
                { message: responseText || 'Error al obtener órdenes' },
                { status: backendRes.status }
            );
        }

        if (!responseText.trim()) {
            return NextResponse.json([]);
        }

        try {
            const data = JSON.parse(responseText);
            return NextResponse.json(data);
        } catch (parseError) {
            console.error('Error parsing GET response:', parseError);
            return NextResponse.json({ message: 'Error al procesar respuesta' }, { status: 500 });
        }

    } catch (error) {
        console.error('GET API Route Error:', error);
        return NextResponse.json(
            { message: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}





