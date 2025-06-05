'use client';

import EmailValidation from "@/modules/email/components/verficacion";
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function VerificacionPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const userEmail = searchParams.get('email') || '';
    const [error, setError] = useState('');

    const handleCodeSubmit = async (code: string) => {
        try {
            setError('');
            
            // Simulación de verificación (reemplazar por endpoint)
            const isValid = code.length === 6; // Validación básica
            
            if (!isValid) {
                setError('Código inválido. Inténtalo nuevamente.');
                return;
            }

            // Redirige si es válido (simulación)
            router.push("/market");
            
        } catch (err) {
            setError('Error al verificar el código');
            console.error(err);
        }
    };

    const handleResendEmail = () => {
        alert(`Se ha reenviado el código a ${userEmail}`);
        // Aqui meter la llamada al endpoint
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <EmailValidation
                userEmail={userEmail}
                onCodeSubmit={handleCodeSubmit}
                onResendEmail={handleResendEmail}
                error={error}
            />
        </div>
    );
}