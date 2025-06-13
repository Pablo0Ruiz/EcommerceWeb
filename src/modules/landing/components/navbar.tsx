'use client'

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import logo from '@/../public/logo.png';

const NavbarLanding = () => {
    const [show, setShow] = useState(false);
    return (
        <header className="bg-[#2E8B57] shadow-md sticky top-0 z-50">
            <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                
                {/* Logo superpuesto */}
                <Link href='/market' className="relative flex items-center group pl-24">
                    <div className="absolute -left-4 w-24 h-24">
                        <Image
                            src={logo}
                            alt="Logo Matezone"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>

                    <span className="text-2xl font-bold text-white group-hover:scale-105 transition-transform duration-200">
                        <span className="text-[#C1F7D5]">Mate</span>
                        <span className="text-white">zone</span>
                    </span>
                </Link>

                {/* Botones desktop */}
                <div className="hidden md:flex items-center space-x-4 text-white">
                    <Link href="/auth/login" className="text-sm hover:underline">
                        Inicia sesión
                    </Link>

                    <div className="w-px h-5 bg-white" />

                    <Link href="/auth/register" className="text-sm bg-white text-[#2E8B57] px-3 py-1 rounded hover:bg-gray-100 transition">
                        Registrarse
                    </Link>
                </div>

                {/* Botón hamburguesa */}
                <button className="md:hidden text-white" onClick={() => setShow(!show)}>
                    {show ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>
        </header>
    )
}

export default NavbarLanding;
