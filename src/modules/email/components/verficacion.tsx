'use client'

import { useRouter } from 'next/navigation';
import { getUserCookie } from '@/shared/utils/cookies';
import { useState, useEffect, useRef } from 'react';
import { useEmail } from '../hook/useEmail';
import toast from 'react-hot-toast';

const EmailValidation = () => {
    const [code, setCode] = useState<string[]>(Array(6).fill(''));
    const [userEmail, setUserEmail] = useState<{ email?: string } | null>(null);
    const { fetchVerifyCode } = useEmail();
    const router = useRouter();
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        setUserEmail(getUserCookie());
        // Inicializar el array de referencias
        inputRefs.current = inputRefs.current.slice(0, 6);
    }, []);

    const handleInputChange = (index: number, value: string) => {
        if (/^\d*$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            // Mover el foco al siguiente input si se ingresó un dígito
            if (value && index < 5) {
                const nextInput = inputRefs.current[index + 1];
                if (nextInput) {
                    nextInput.focus();
                }
            }
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        // Manejar tecla Backspace
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            const prevInput = inputRefs.current[index - 1];
            if (prevInput) {
                prevInput.focus();
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const fullCode = code.join('');
        if (fullCode.length !== 6) {
            alert('Por favor ingresa el código completo');
            return;
        }
        handleVerifyCode(fullCode);
    };

    const handleVerifyCode = async (code: string) => {
        try {
            await fetchVerifyCode(code);
            toast.success('Código verificado correctamente');
            router.push('/market');
        } catch (error) {
            toast.error(`Error al verificar el código: ${error instanceof Error ? error.message : 'Error desconocido'}`);
        }
    };

    return (
        <div className="max-w-md mx-auto p-8 font-sans text-gray-800 text-center">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Bienvenido a Matezone</h1>
                <p className="text-gray-600 italic">Los mejores mates</p>
            </header>

            <main className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900">Valida tu email</h2>
                <p className="text-gray-700 leading-relaxed">
                    Introduce el código que te hemos enviado al email<br />
                    <span className="font-bold text-blue-500">{userEmail?.email}</span>
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-xl font-medium text-gray-900">Código</h3>
                        <div className="flex justify-center gap-3">
                            {code.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => {
                                        if (el) {
                                            inputRefs.current[index] = el;
                                        }
                                    }}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="w-12 h-12 text-center text-xl border-2 border-gray-300 rounded-md 
                                        focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    autoComplete="one-time-code"
                                    autoFocus={index === 0}
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

export default EmailValidation;