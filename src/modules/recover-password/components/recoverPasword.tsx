'use client'

import { useRouter } from 'next/navigation';
import { getUserCookie, setUserCookie } from '@/shared/utils/cookies';
import { useState, useEffect } from 'react';
import { useVerifiMailCode } from '@/modules/recover-password/hook/useVerifiMailCode';

export type RecoverUser = {
    _id: string;
    email: string;
    role: string;
    status: number;
    emailCode?: string;
    attempt?: number;
};

export type VerifyMailCodeResponse = {
    token: string;
    user: RecoverUser;
};




const RecoverPassword = () => {
    const [code, setCode] = useState<string[]>(Array(6).fill(''));
    const [userEmail, setUserEmail] = useState<{ email?: string } | null>(null);
    const { fetchVerifyMailCode } = useVerifiMailCode();
    const router = useRouter();

    useEffect(() => {
        setUserEmail(getUserCookie());
    }, []);

    const handleInputChange = (index: number, value: string) => {
        if (/^\d*$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

        }
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const fullCode = code.join('');
        if (fullCode.length !== 6) {
            alert('Por favor ingresa el código completo');
            return;
        }

        try {
            const data = await fetchVerifyMailCode({ code: fullCode, email: userEmail?.email ?? '' });

            setUserCookie(data.user);

            await fetch('/api/auth/set-token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: data.token }),
            });
            router.push('/market');
        } catch (error) {
            console.error('Error al verificar el código:', error);
            alert('Ocurrió un error al verificar el código');
        }
    };

    return (
        <div className="max-w-md mx-auto p-8 font-sans text-gray-800 text-center">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Bienvenido a Matezone</h1>
                <p className="text-gray-600 italic">Los mejores mates</p>
            </header>

            <main className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900">Introduce tu codigo de recuperacion de contraseña</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-xl font-medium text-gray-900">Código</h3>
                        <div className="flex justify-center gap-3">
                            {code.map((digit, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    className="w-12 h-12 text-center text-xl border-2 border-gray-300 rounded-md 
                            focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    autoComplete="one-time-code"
                                />
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-gray-200 my-4"></div>

                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md 
                    transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={code.join('').length !== 6}
                    >
                        Aceptar
                    </button>
                </form>
            </main>
        </div>
    );
};

export default RecoverPassword;