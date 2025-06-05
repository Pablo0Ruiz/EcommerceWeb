'use client';

import { useRouter } from "next/navigation";
import { setUserCookie } from "@/shared/utils/cookies";
import { loginClient } from "@/modules/auth/services/login";
import { LoginData } from "../typesAuth";

export const useLogin = (reset: () => void) => {
  const router = useRouter();

    const onSubmit = async (data: LoginData) => {
        try {
            const response = await loginClient(data);

            setUserCookie(response.user);

            await fetch('/api/auth/set-token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: response.token }),
            });

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
