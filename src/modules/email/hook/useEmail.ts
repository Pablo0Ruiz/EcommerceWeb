

export const useEmail = () => {
    const fetchVerifyCode = async (code: string): Promise<void> => {
        const res = await fetch('/api/auth/email', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({code})
        })
        if (!res.ok) {
            throw new Error('Error al enviar el codigo de verificacion')
        }
        return await res.json()
    }

    return {fetchVerifyCode}
}
