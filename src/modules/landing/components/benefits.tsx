import Image from 'next/image';
import planta from '@/../../public/planta_landing.jpg';

const Benefits = () => {
    return (
        <section id="porque" className="relative py-16 overflow-hidden">
            {/* Fondo blanco translúcido de todo el componente */}
            <div className="absolute inset-0 z-0" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }} />

            {/* Línea verde debajo del recuadro */}
            <div className="absolute top-1/2 left-0 right-0 h-[6px] bg-green-800 z-10 translate-y-[-50%]" />

            {/* Imagen semicircular izquierda */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-20 sm:w-24 h-40 sm:h-48 overflow-hidden rounded-r-full border border-green-800 z-20">
                <Image
                    src={planta}
                    alt="Planta yerba mate"
                    className="object-cover w-full h-full"
                />
            </div>

            {/* Imagen semicircular derecha */}
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-20 sm:w-24 h-40 sm:h-48 overflow-hidden rounded-l-full border border-green-800 z-20">
                <Image
                    src={planta}
                    alt="Planta yerba mate"
                    className="object-cover w-full h-full"
                />
            </div>

            {/* Franja con extremos puntiagudos unidos al recuadro */}
            <div className="relative z-30 max-w-5xl mx-auto px-4">
                <div className="relative flex items-center justify-center">
                    {/* Recuadro con clip-path para puntas */}
                    <div
                        className="w-full border-2 border-green-800 text-green-900 font-handwritten text-xl sm:text-2xl text-center px-6 py-4 shadow-lg backdrop-blur-md"
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.6)',
                            clipPath: 'polygon(0% 50%, 2% 0%, 98% 0%, 100% 50%, 98% 100%, 2% 100%)'
                        }}
                    >
                        &laquo;Porque donde hay amistad, hay Mate&raquo;
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Benefits;
