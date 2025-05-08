
import { Header } from "@/modules/offers/components/header";
import Image from "next/image";
import {Footer} from "@/modules/offers/components/footer";
export default function Offers() {
    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />

            <main className="container mx-auto p-4">
                <div className="relative h-64 w-full mb-6 bg-gradient-to-r from-[#131921] to-[#232F3E] rounded overflow-hidden">
                    <Image
                        src="public/window.svg"
                        alt="Ofertas especiales"
                        layout="fill"
                        objectFit="cover"
                        className="opacity-50"
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-center p-4">
                        <h1 className="text-3xl md:text-4xl font-bold text-white">Todo para tu mate con envío rápido</h1>
                    </div>
                </div>

                <section className="mb-8 bg-white p-4 rounded shadow">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-900">Los termos más comprados</h2>
                        {/* <Link href="/" className="text-[#232F3E] hover:text-[#FFD712] text-sm"> */}
                        Ver todos
                        {/* </Link> */}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <div className="group border border-gray-200 hover:border-[#FFD712] rounded p-3 transition">
                            <div className="relative h-48 w-full mb-3">
                                <Image
                                    src="public/window.svg"
                                    alt="Termo super bueno"
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </div>
                            <h3 className="font-semibold text-gray-900 group-hover:text-[#131921]">Termo super bueno</h3>
                            <p className="text-gray-600 text-sm mb-1">Mantiene el agua caliente 24h</p>
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-lg text-gray-900">199.98€</span>
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">sóde</span>
                            </div>
                            <div className="flex items-center mt-1">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-4 h-4" fill={i < 4 ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                        </svg>
                                    ))}

                                </div>
                                <span className="text-xs text-gray-500 ml-1">4.6 (300M)</span>
                            </div>
                            {/*esto se elimina lo de los array*/}
                            <button className="mt-2 w-full bg-[#FFD712] hover:bg-yellow-400 text-[#131921] py-1 rounded text-sm font-medium transition">
                                Añadir al carrito
                            </button>
                        </div>

                    </div>
                </section>

                <section className="mb-8 bg-white p-4 rounded shadow">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-900">Los mejores mates del momento</h2>
                        {/* <Link href="/" className="text-[#232F3E] hover:text-[#FFD712] text-sm"> */}
                        Ver todos
                        {/* </Link> */}
                    </div>
                </section>

                <section className="bg-white p-4 rounded shadow">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-900">Las hierbas más populares</h2>
                        {/* <Link href="/hierbas" className="text-[#232F3E] hover:text-[#FFD712] text-sm"> */}
                        Ver todos
                        {/* </Link> */}
                    </div>

                </section>
            </main>
            <Footer/>
        </div>
    )
}
