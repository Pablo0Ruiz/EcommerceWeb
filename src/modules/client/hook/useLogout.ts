
export default async function Logout() {
    const res = await fetch('/api/auth/logout', {
        method: 'POST',
    });
    if (!res.ok) {
        throw new Error('Error al cerrar sesion');
    }

    return await res.json();
}