import { useRouter } from "next/navigation";
import { setCookie } from "@/shared/utils/cookies";
import { LoginData, ResponseLogin } from "../typesAuth";
import {loginClient} from '@/modules/auth/services/login'

export const useLogin = (reset: () => void) => {
    const router = useRouter();

    const onSubmit = async (data: LoginData) => {
        try {
            const response: ResponseLogin = await loginClient(data)

            if (!response.success) {
                throw new Error("Error al iniciar sesion")
            }

            setCookie(response.token)

            router.push('/market')
            reset()
        } catch (error) {
            console.error(error instanceof Error ? error.message : 'Login fallido');
        }
    };
    return {onSubmit};
}