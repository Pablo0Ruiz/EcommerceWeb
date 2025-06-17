import { useState } from "react";
import { setCookie, setUserCookie } from "@/shared/utils/cookies";
import { regEmailResponse } from "../typesAuth";
import toast from "react-hot-toast";

export const useEmailRegister = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<regEmailResponse | null>(null);

    const registerEmail = async (email: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/auth/user/register-email', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const responseText = await response.text();
            
            // Mapeo de errores específicos
            const errorMapping: Record<string, string> = {
                'USER_EXISTS': 'El email ya está registrado',
                'INVALID_EMAIL': 'Email no válido',
                'ERROR_REGISTER_USER': 'Error al registrar el email'
            };

            if (!response.ok) {
                const matchedError = Object.keys(errorMapping).find(err => 
                    responseText.trim() === err
                );
                
                const errorMessage = matchedError 
                    ? errorMapping[matchedError]
                    : responseText || 'Error desconocido';
                
                throw new Error(errorMessage);
            }

            // Procesamiento de respuesta exitosa
            const result = JSON.parse(responseText);
            const resultWithFlag = {
                ...result,
                regEmail: true,
            };

            // Configuración de cookies y tokens
            await fetch('/api/auth/set-token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: result.token }),
            });

            document.cookie = `regEmail=true; path=/; max-age=${60 * 60 * 24}`;
            setCookie(result.token);
            setUserCookie(result.user);
            setData(resultWithFlag);

            toast.success("Registro de email exitoso");
            return resultWithFlag;

        } catch (err) {
            const errorMessage = err instanceof Error 
                ? err.message 
                : 'Error desconocido al registrar el email';
            
            setError(errorMessage);
            toast.error(errorMessage);
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        registerEmail,
        isLoading,
        error,
        data,
    };
};