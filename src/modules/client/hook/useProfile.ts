import { User } from "@/modules/auth/typesAuth";
import { useCallback } from "react";
import { ChangePasswordInputs } from "../components/modalPerfil";

type ChangePasswordResponse = {
    message: string;
    data?: boolean;
};


export const useProfile = () => {
    const fetchProfile = useCallback(async (): Promise<User> => {
        const res = await fetch('/api/auth/user', {
            method: 'GET',
            credentials: 'include',
            cache: 'no-store'
        });
        if (!res.ok) {
            throw new Error('Error al obtener perfil');
        }

        return await res.json();
    }, []);

    const updateProfile = async (data: Partial<User>): Promise<void> => {
        console.log("Updating profile with data:", data);
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
    
    const changePassword = async (data: ChangePasswordInputs): Promise<ChangePasswordResponse> => {
        const res = await fetch('/api/auth/user/change-password', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const body = await res.json();

        if (!res.ok) {
            throw new Error(body.message || 'UNKNOWN_ERROR');
        }

        return body;
    };

    const fetchPassword = async (data: ChangePasswordInputs): Promise<ChangePasswordResponse> => {
    try {

        const response = await changePassword(data);
        return response;
    } catch (err) {
        console.error("Error al cambiar la contraseña:", err);
        throw err;
    }
};
    return { fetchProfile, updateProfile, changePassword, fetchPassword};
}