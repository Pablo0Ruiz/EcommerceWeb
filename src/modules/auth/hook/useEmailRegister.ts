import { useState } from "react";
import { setCookie, setUserCookie } from "@/shared/utils/cookies";
import { regEmailResponse } from "../typesAuth";

export const useEmailRegister = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<regEmailResponse | null>(null);

    const registerEmail = async (email: string) => {
        setIsLoading(true);
        setError(null);

        try {
            console.log('email:',email)
            const response = await fetch("/api/auth/user/register-mail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            const result = await response.json();
            // es necesario añadirle esta flag, por que si no, no tengo forma de explicarle al addressmanager cuando hacer fetch y cuando no, y como en este caso
            // es un usuario "invitado", no tiene sentido hacer fetch por que no tiene direcciones, y se queda mostrando el error y no aparece la tarjeta para añadir direcciones
            // me imagino que tambien tendras que modificar algo en el misPedidosPage, pero no se como haras la peticion de pedidos, aun que bueno no se si tenemos contemplado
            // que un usuario invitado pueda ver sus pedidos, pero bueno, si no es asi, no hay problema
            const resultWithFlag = {
                ...result,
                regEmail: true,
            };

            await fetch('/api/auth/set-token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: result.token }),
            });

            document.cookie = `regEmail=true; path=/; max-age=${60 * 60 * 24}`; //Cookie que expirara en 24 horas
            setCookie(result.token);
            setUserCookie(result.user);
            setData(resultWithFlag);
            console.log("Registro exitoso:", resultWithFlag);
            return resultWithFlag;
        } catch (err) {
            const errorMsg =
                err instanceof Error
                    ? err.message
                    : typeof err === "string"
                        ? err
                        : "Error desconocido";
            setError(errorMsg);
            throw new Error(errorMsg);
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