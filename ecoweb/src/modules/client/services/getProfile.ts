"use client"
import { RegisterData } from "@/modules/auth/typesAuth";
import { getCookie } from "@/shared/utils/cookies";

export const GetProfile = async (): Promise<RegisterData> => {
    const token = getCookie();
    console.log("esto deberia ", `${process.env.NEXT_PUBLIC_API_BASE_URL}`)
    console.log(token)
    
    if (!token) {
        throw new Error('No hay token de autenticación disponible');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/profile`, {

        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al obtener el perfil');
    }

    return response.json();
};