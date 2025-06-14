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
            console.log('email:',email)
            const response = await fetch("/api/auth/user/register-mail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                // throw new Error(await response.text());
                toast.error("Error al registrar el email, por favor intente más tarde");
            }

            const result = await response.json();

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
            // throw new Error(errorMsg);
            toast.error(`Error al registrar el email: ${errorMsg}`);
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