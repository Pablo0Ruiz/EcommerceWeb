import { setUserCookie } from "@/shared/utils/cookies";
import toast from "react-hot-toast";

type Recover = {
    email: string;
}

type RecoverUser = {
    _id: string;
    email: string;
    status: number;
    role: string;
};
type RecoverResponse = {
    user: RecoverUser;
};

export default function useRecover({ setIsSubmitted }: { setIsSubmitted: (value: boolean) => void }) {

    const onSubmit = async (data: Recover) => {
        try {
            const response = await fetch('/api/auth/user/recover-password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                // throw new Error('Error al enviar el email de recuperación');
                toast.error('Error al enviar el email de recuperación, por favor intente más tarde');
            }
            const recoverResponse: RecoverResponse = await response.json();
            setUserCookie(recoverResponse.user)
            setIsSubmitted(true);
            return { success: true, message: 'Email enviado correctamente' };
        } catch (error) {
            return { success: false, message: error instanceof Error ? error.message : 'Error desconocido' };
        }
    };

    return { onSubmit };

}