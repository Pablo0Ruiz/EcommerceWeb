import toast from "react-hot-toast";

export default async function Logout() {
    const res = await fetch('/api/auth/logout', {
        method: 'POST',
    });
    if (!res.ok) {
        // throw new Error('Error al cerrar sesion');
        toast.error('Error al cerrar sesión, por favor intente más tarde');
    }

    return await res.json();
}