import { VerifyMailCodeResponse } from '../components/recoverPasword';

export const useVerifiMailCode = () => {
    const fetchVerifyMailCode = async ({ code, email }: { code: string, email: string }): Promise<VerifyMailCodeResponse> => {
        const res = await fetch('/api/auth/user/verification-recover', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code, email })
        })
        if (!res.ok) {
            throw new Error('Error al enviar el codigo de verificacion')
        }
        const data = await res.json();
        return data;
    }

    return { fetchVerifyMailCode }
}
