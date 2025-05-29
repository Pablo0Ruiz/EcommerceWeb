import React, { useState, useRef, useEffect } from 'react';

type EmailValidationProps = {
    userEmail: string;
    codeLength?: number;
    onCodeSubmit?: (code: string) => void;
    onResendEmail?: () => void;
};

const EmailValidation: React.FC<EmailValidationProps> = ({
    userEmail = 'pache****@gmail.com',
    codeLength = 6,
    onCodeSubmit,
    onResendEmail,
}) => {
    const [code, setCode] = useState<string[]>(Array(codeLength).fill(''));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        // Focus the first input on mount
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleInputChange = (index: number, value: string) => {
        if (/^\d*$/.test(value)) { // Only allow numbers
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            // Auto-focus to next input if a digit was entered
            if (value && index < codeLength - 1) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            // Move focus to previous input on backspace if current is empty
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleResendEmail = () => {
        if (onResendEmail) {
            onResendEmail();
        } else {
            alert('Email reenviado. Por favor revisa tu bandeja de entrada.');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const fullCode = code.join('');
        if (fullCode.length === codeLength) {
            if (onCodeSubmit) {
                onCodeSubmit(fullCode);
            } else {
                console.log('Submitted code:', fullCode);
            }
        } else {
            alert('Por favor ingresa el código completo');
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
                    <span className="font-bold text-blue-500">{userEmail}</span>
                </p>

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
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="w-12 h-12 text-center text-xl border-2 border-gray-300 rounded-md 
                            focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    autoComplete="one-time-code"
                                />
                            ))}
                        </div>

                        <button
                            type="button"
                            className="text-blue-500 hover:text-blue-700 font-medium"
                            onClick={handleResendEmail}
                        >
                            Reenviar Email
                        </button>
                    </div>

                    <div className="border-t border-gray-200 my-4"></div>

                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md 
                    transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={code.join('').length !== codeLength}
                    >
                        Aceptar
                    </button>
                </form>
            </main>
        </div>
    );
};

export default EmailValidation;