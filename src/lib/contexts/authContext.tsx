'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useInactivity } from '../hook/useInactivity';
import { getUserCookie, setCookie, setUserCookie } from '@/shared/utils/cookies';
import { deleteUserCookie } from '@/shared/utils/cookies';


interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user' | string;
}

interface AuthContextType {
    user: User | null;
    login: (user: User, token: string) => void;
    logout: () => Promise<boolean>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const handleInactivity = () => {
        if (user?.role === 'admin') {
            alert('Tu sesión ha expirado por inactividad');
            fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            }).then(() => {
                deleteUserCookie();
                setUser(null);
                router.push('/');
            });
        }
    };

    const shouldUseInactivity = user?.role === 'admin';
    useInactivity(1 * 60 * 1000, shouldUseInactivity ? handleInactivity : undefined);

    useEffect(() => {
        const checkAuth = () => {
            try {
                const userData = getUserCookie();
                if (userData) {
                    setUserCookie(userData);
                }
            } catch (error) {
                console.error('Error verificando autenticación:', error);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const logout = async () => {
        await fetch('/api/auth/logout', {
            method: 'POST',
            credentials: 'include',
        });
        deleteUserCookie();
        setUser(null);
        router.push('/');
        return true;
    };

    const login = (userData: User, token: string) => {
        setCookie(token);
        setUserCookie(userData);
        setUser(userData);
    };


    const values: AuthContextType = {
        user,
        login,
        logout,
        loading,
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};