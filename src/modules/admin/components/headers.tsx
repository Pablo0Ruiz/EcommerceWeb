import Link from "next/link";
import React from "react";

const Header = () => {
    return (
        <header className="bg-green-900 text-white p-4 flex justify-between items-center shadow-md">
            <h1 className="text-xl font-bold">Panel Admin - Tienda de Mate</h1>
            <Link href="/admin/listUser">
                <button className="bg-white text-green-900 px-4 py-2 rounded">
                    Usuarios
                </button>
            </Link>
        </header>
    );
};

export default Header;
