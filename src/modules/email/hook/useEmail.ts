import toast from "react-hot-toast"


export const useEmail = () => {
    const fetchVerifyCode = async (code: string): Promise<void> => {
        const res = await fetch('/api/auth/email', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({code})
        })
        if (!res.ok) {
            // throw new Error('Error al enviar el codigo de verificacion')
            toast.error('Error al enviar el código de verificación, por favor intente más tarde')
        }
        return await res.json()
    }

    return {fetchVerifyCode}
}
