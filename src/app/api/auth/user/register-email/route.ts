import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const backendRes = await fetch('https://intelligent-karmen-areotar-52151d0d.koyeb.app/api/user/register-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const responseText = await backendRes.text();

        // Mapeo de errores personalizados
        const stringErrorMapping: Record<string, { message: string, status: number }> = {
            'USER_EXISTS': { message: 'El usuario ya existe', status: 409 },
            'ERROR_REGISTER_USER': { message: 'Error al registrar usuario', status: 500 }
        };

        if (!backendRes.ok) {
            // Si el backend responde con un string de error conocido
            const matchedError = Object.keys(stringErrorMapping).find(error =>
                responseText.trim() === error
            );
            if (matchedError) {
                const { message, status } = stringErrorMapping[matchedError];
                return NextResponse.json({ error: message }, { status });
            }
            // Si no es un error conocido, devuelve el texto tal cual
            return NextResponse.json({ error: responseText }, { status: backendRes.status });
        }

        // Si todo va bien, intenta parsear la respuesta como JSON
        try {
            const data = JSON.parse(responseText);
            return NextResponse.json(data);
        } catch {
            return NextResponse.json({ error: 'Respuesta inválida del servidor' }, { status: 500 });
        }
    } catch (err) {
        return NextResponse.json(
            { error: err instanceof Error ? err.message : 'Error desconocido' },
            { status: 500 }
        );
    }
}