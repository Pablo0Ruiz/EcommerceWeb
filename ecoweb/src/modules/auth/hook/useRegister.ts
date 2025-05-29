import { useRouter } from "next/navigation";
import { RegisterData, ResponseRegister } from "../typesAuth";
import { registerClient } from "../services/register";
import { setUserCookie } from "@/shared/utils/cookies";

export const useRegister = (reset: () => void) => {
    const router = useRouter();

    const onSubmit = async (data: RegisterData) => {
        try {
            const response: ResponseRegister = await registerClient(data);
            if (!response.success) {
                console.error(response);
                throw new Error('Error al registrarte');
            }
            setUserCookie(response.user);


            await fetch('/api/auth/set-token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: response.token }),
            });

            router.push('/market');
            reset();
        } catch (error) {
            console.error(error instanceof Error ? error.message : 'Registro de cliente fallido');
        }
    };

    return { onSubmit };
};