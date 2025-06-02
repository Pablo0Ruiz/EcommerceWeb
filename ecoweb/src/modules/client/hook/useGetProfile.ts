"use client";
import { useEffect, useState } from 'react';
import { GetProfile } from '../services/getProfile';
import { User } from '@/modules/auth/typesAuth';

export const useGetProfile = () => {
    const [userData, setUserData] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await GetProfile();
            setUserData(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido al obtener perfil');
            console.error('Error en useGetProfile:', err);
        } finally {
            setLoading(false);
        }
    };

    // Cargar automáticamente al usar el hook
    useEffect(() => {
        fetchProfile();
    }, []);

    return { 
        userData, 
        loading, 
        error,
        refetch: fetchProfile // Permite volver a cargar los datos manualmente
    };
};