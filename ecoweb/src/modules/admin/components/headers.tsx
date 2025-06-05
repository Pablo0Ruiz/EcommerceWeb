import React from "react";
import Link from "next/link";

const Header = () => {
    return (
        <header className="bg-green-900 text-white p-4 flex justify-between items-center shadow-md">
            <h1 className="text-xl font-bold">Panel Admin - Tienda de Mate</h1>
            <nav className="space-x-4">
                <Link href="/admin/users" className="hover:underline">Usuarios</Link>
                <Link href="/admin/products" className="hover:underline">Productos</Link>
                <Link href="/admin/settings" className="hover:underline">Configuración</Link>
            </nav>
        </header>
    );
};

export default Header;
