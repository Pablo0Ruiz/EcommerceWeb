"use client"
import { User } from "@/modules/auth/typesAuth";
import { getCookie } from "@/shared/utils/cookies";
import toast from "react-hot-toast";

export const GetProfile = async (): Promise<User> => {
    const token = getCookie();

    
    if (!token) {
        // throw new Error('No hay token de autenticación disponible');
        toast.error('No hay token de autenticación disponible');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/profile`, {

        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        // throw new Error(errorData.message || 'Error al obtener el perfil');
        toast.error(`Error al obtener el perfil: ${errorData.message || 'Inténtalo más tarde'}`);
    }

    return response.json();
};