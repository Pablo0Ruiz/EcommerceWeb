import Cookies from 'js-cookie';

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

export const getCookie = () => {
    return Cookies.get(COOKIE_NAME);
};

export const removeCookie = () =>{
    Cookies.remove(COOKIE_NAME);
}