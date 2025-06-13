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
            if(response.user.role === 'admin') {
                return router.push('/admin');
            }
            router.push('/market');
            reset();
        } catch (error) {
            console.error('Error inesperado:', error);
        }
    };

    return { onSubmit };
};
