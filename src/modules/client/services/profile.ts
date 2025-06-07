import { RegisterData } from "@/modules/auth/typesAuth";
import { getCookie } from "@/shared/utils/cookies";

export const PutProfile = async (data: Partial<RegisterData>): Promise<RegisterData> => {
    const token = getCookie(); 
    
    if (!token) {
        throw new Error('No hay token de autenticación disponible');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/profile`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar su perfil');
    }

    return response.json();
};