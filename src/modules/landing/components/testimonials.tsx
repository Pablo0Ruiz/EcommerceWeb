import Link from 'next/link';

const Testimonials = () => {
    return (
        <section id="testimonios" className="relative py-32 px-4 overflow-hidden">
            {/* Fondo blanco translúcido */}
            <div className="absolute inset-0 z-0" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }} />

            <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
                <div className="relative w-full max-w-5xl h-[400px] mb-16 flex items-center justify-center">
                    {/* Recuadro central */}
                    <div className="relative z-10 bg-white bg-opacity-90 p-6 md:p-10 rounded-xl shadow-md text-center max-w-md">
                        <p className="text-xl font-bold text-gray-900 mb-4">¡No te quedes sin tu mate!</p>
                        <Link href="/market">
                            <button className="bg-green-700 text-white font-semibold px-6 py-2 rounded-full hover:bg-green-800 transition">
                                ¡Comprar ya!
                            </button>
                        </Link>
                    </div>

                    {/* Recuadros verdes alrededor */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                        <Box text="Recibe tu pedido<br />en 48 h" />
                    </div>
                    <div className="absolute top-12 left-[20%] transform -translate-x-1/2">
                        <Box text="Grandes<br />descuentos" />
                    </div>
                    <div className="absolute top-12 right-[20%] transform translate-x-1/2">
                        <Box text="Descuentos<br />increíbles" />
                    </div>
                    <div className="absolute bottom-16 left-[18%] transform -translate-x-1/2">
                        <Box text="Yerbas de la mejor<br />calidad" />
                    </div>
                    <div className="absolute bottom-16 right-[18%] transform translate-x-1/2">
                        <Box text="Pago Seguro" />
                    </div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                        <Box text="Calidad Premium" />
                    </div>
                </div>
            </div>
        </section>
    );
};

const Box = ({ text }: { text: string }) => (
    <div
        className="bg-green-700 text-white px-6 py-4 rounded-[30%/40%] w-44 text-center text-sm"
        dangerouslySetInnerHTML={{ __html: text }}
    />
);

export default Testimonials;
