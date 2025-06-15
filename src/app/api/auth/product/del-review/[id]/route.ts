import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const token = request.cookies.get('token')?.value;
        const { id: idProduct } = await params;
        const { idReview } = await request.json();

        if (!token) {
            return NextResponse.json(
                { error: 'Token no encontrado' }, 
                { status: 401 }
            );
        }

        if (!idReview) {
            return NextResponse.json(
                { error: 'ID de reseña requerido' }, 
                { status: 400 }
            );
        }

        // CORRECCIÓN: La URL debe incluir el reviewId en la ruta, no en el body
        const backendRes = await fetch(`https://intelligent-karmen-areotar-52151d0d.koyeb.app/api/product/${idProduct}/review/${idReview}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            // NO enviar body para DELETE según el swagger
        });

        if (!backendRes.ok) {
            const errorText = await backendRes.text();
            console.error('Error del backend:', errorText);
            return NextResponse.json(
                { error: errorText || 'Error al eliminar la reseña' },
                { status: backendRes.status }
            );
        }

        const data = await backendRes.json();
        return NextResponse.json(data);
        
    } catch (error) {
        console.error('Error al eliminar reseña:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}