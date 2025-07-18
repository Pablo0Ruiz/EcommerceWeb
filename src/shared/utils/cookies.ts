
import Cookies from 'js-cookie';
import { User } from '@/modules/auth/typesAuth';



const COOKIE_NAME = 'token';

interface CookiesAtribute {
    expires?: number,
    secure?: boolean,
    sameSite?: 'Strict' | 'Lax' | 'None',
}

export const setCookie = (value: string, options: CookiesAtribute = {}) => {
    Cookies.set(COOKIE_NAME, value, {
        expires: options.expires ?? 1,
        secure: options.secure ?? false,
        sameSite: options.sameSite ?? 'Strict',
    });
}


export const setUserCookie = (user:Partial<User>) => {
    Cookies.set('user', JSON.stringify(user), {
        expires: 1 ,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict'
    });
};
export const deleteUserCookie = () => {
    Cookies.remove('user');
};

export const getUserCookie = (): User | null => {
    const user = Cookies.get('user');
    return user ? JSON.parse(user) : null;
};

export const getCookie = () => {
    return Cookies.get(COOKIE_NAME);
};

export const removeCookie = () =>{
    Cookies.remove(COOKIE_NAME);
}



export const doesCookieExist = (name: string) => {
    try {
        const value = document.cookie
            .split(';')
            .find(c => c.trim().startsWith(`${name}=`));

        if (!value) return undefined;

        const cookieValue = value.split('=')[1];
        return decodeURIComponent(cookieValue);
    } catch (error) {
        console.error("Error al leer cookies:", error);
        return undefined;
    }
}