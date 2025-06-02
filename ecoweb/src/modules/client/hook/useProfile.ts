import { RegisterData } from "@/modules/auth/typesAuth";
import { useCallback  } from "react";

export const useProfile = () => {
    const fetchProfile = useCallback(async (): Promise<RegisterData> => {
        const res = await fetch('/api/auth/user', {
            method: 'GET',
            credentials: 'include',
            cache: 'no-store'
        });
        if (!res.ok) {
            throw new Error('Error al obtener perfil');
        }

        return await res.json();
    },[]);

    const updateProfile = async (data: RegisterData): Promise<void> => {
        const res = await fetch('/api/auth/user', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            throw new Error('Error al actualizar perfil');
        }
    };

    return { fetchProfile, updateProfile };
}