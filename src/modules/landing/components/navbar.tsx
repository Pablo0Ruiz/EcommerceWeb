'use client'

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from 'lucide-react';


const NavbarLanding = () => {
    const [show, setShow] = useState(false);

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                <Link href='/' className="text-2xl font-bold text-green-700">
                    Matezone
                </Link>
                <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
                    <li><Link href='#inicio'>Inicio</Link></li>
                    <li><Link href='#porque'>¿Por qué elegirnos?</Link></li>
                    <li><Link href='#productos'>Productos</Link></li>
                    <li><Link href='#testimonios'>Testimonios</Link></li>
                    <li><Link href='#contacto'>Contacto</Link></li>
                </ul>

                <div className="hidden md:flex space-x-4">
                    <Link href="/auth/login" className="text-sm text-gray-600 hover:text-green-700">
                        Inicia sesion
                    </Link>
                    <Link href="/auth/register" className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition">
                        Registrarse
                    </Link>
                </div>

                <button className="md:hidden" onClick={() => setShow(!show)}>
                    {show ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {show && (
                <div className="md:hidden bg-white px-4 pb-4 space-y-2 text-gray-700">
                    <Link href="#inicio" >Inicio</Link>
                    <Link href="#porque" >¿Por qué elegirnos?</Link>
                    <Link href="#productos" >Productos</Link>
                    <Link href="#testimonios" >Testimonios</Link>
                    <Link href="#contacto" >Contacto</Link>
                    <div className="flex flex-col gap-2 pt-2 border-t">
                        <Link href="/auth/login" className="text-sm text-gray-600">Iniciar sesion</Link>
                        <Link href="/auth/register" className="text-sm bg-green-600 text-white px-3 py-1 rounded">
                            Registrarse
                        </Link>
                    </div>
                </div>
            )}
        </header>
    )
}

export default NavbarLanding