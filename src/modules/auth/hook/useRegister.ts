import { useRouter } from "next/navigation";
import { RegisterData, ResponseRegister } from "../typesAuth";
import { registerClient } from "../services/register";
import { setUserCookie } from "@/shared/utils/cookies";
import toast from "react-hot-toast";

export const useRegister = (reset: () => void) => {
    const router = useRouter();

    const onSubmit = async (data: RegisterData) => {
        try {
            const response: ResponseRegister = await registerClient(data);
            if (!response.success) {
                // throw new Error('Error al registrarte');
                toast.error("Error al registrarte, verifica tus datos o intenta más tarde");
            }
            setUserCookie(response.user);

            await fetch('/api/auth/set-token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: response.token }),
            });

            router.push('/email-verification');
            reset();
        } catch {
            // console.error(error instanceof Error ? error.message : 'Registro de cliente fallido');
            // console.log('Error al registrar cliente:', error);
            toast.error("Error al registrarte, verifica tus datos o intenta más tarde");
        }
    };

    return { onSubmit };
};