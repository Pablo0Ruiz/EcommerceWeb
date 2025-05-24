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

            router.push('/market');
            reset();
        } catch (error) {
            console.error('Error inesperado:', error);
        }
    };
    
    return { onSubmit };
};