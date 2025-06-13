'use client'

import Image from 'next/image';
import logo from '@/../../public/logo.png';

const Hero = () => {
    return (
        <section
            id="inicio"
            className="relative h-screen flex items-center justify-center text-white px-4 overflow-hidden"
            style={{
                backgroundImage: `url('/fondo-mate.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="absolute inset-0 bg-white opacity-30" />

            <div className="relative z-10 text-center max-w-2xl space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold">Bienvenido a Matezone</h1>
                <p className="text-lg md:text-xl">
                    Nuestra yerba es cultivada, seleccionada y recogida a mano por los mejores agricultores.
                </p>
                <p className="text-lg md:text-xl">
                    En nuestra web encontrarás también las mejores marcas para disfrutar del mate Argentino de toda la vida.
                </p>
            </div>

            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 flex flex-col items-center space-y-4 px-4">
                <div className="w-62 h-62 relative">
                    <Image
                        src={logo}
                        alt="Logo Matezone"
                        fill
                        className="object-contain"
                    />
                </div>
                <div className="bg-white text-black px-4 py-2 rounded-xl border border-black max-w-[220px] text-center shadow-md">
                    <p className="text-sm font-medium leading-tight">
                        Descubre los mejores<br />
                        mates, bombillas, hierbas<br />
                        y accesorios artesanales
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Hero;
