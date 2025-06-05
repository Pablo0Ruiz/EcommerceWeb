'use client';

import { useRouter } from "next/navigation";
import { setUserCookie,setCookie } from "@/shared/utils/cookies";
import { mockUser } from "@/shared/utils/mockUser";
import { LoginData, ResponseLogin } from "../typesAuth";

export const useLogin = (reset: () => void) => {
    const router = useRouter();

    const onSubmit = async (data: LoginData) => {
        console.log(data)
        try {
            // Mock response - siempre éxito
            const response: ResponseLogin = {
                success: true,
                user: mockUser,
                token: 'mock-token'
            };

            // Guarda el usuario en cookies
            setUserCookie(mockUser);
            
            // Opcional: guarda también el token si lo necesitas
            setCookie(response.token);

            // Redirigir a pantalla de verificación en dos pasos
            router.push("/auth/two-factor");
            reset();
        } catch (error: any) {
            console.error('Error inesperado:', error);

            // Si ocurre un error de parseo JSON, redirigir a two-factor
            if (
                error instanceof SyntaxError ||
                (typeof error?.message === 'string' && error.message.includes("Unexpected token"))
            ) {
                router.push("/auth/two-factor");
            }

            // Otros errores pueden manejarse aquí si es necesario
        }
    };
    
    return { onSubmit };
};