"use client";
import { useState } from "react";
import { Header } from "@/modules/offers/components/header";
import Image from "next/image";
import { Footer } from "@/modules/offers/components/footer";
import { PopUp } from "@/shared/components/popup";
import { Product} from "@/shared/mockProduct/product";
import { sampleProducts } from "@/shared/mockProduct/ProductList";
import Link from "next/link";

export default function Offers() {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const handleAddToCart = (product: Product) => {
        setSelectedProduct(product);
        setShowPopup(true);
        
        // Guardar en localStorage
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingItem = cart.find((item: Product) => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
            cart.push({...product, quantity: 1});
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    const handleContinueShopping = () => {
        setShowPopup(false);
    };

    // Obtener productos por categoría
    const termos = sampleProducts.filter(p => p.category === "Termos");
    const mates = sampleProducts.filter(p => p.category === "Mates");
    const hierbas = sampleProducts.filter(p => p.category === "Hierbas");

    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />

            <main className="container mx-auto p-4">
                {/* Banner principal */}
                <div className="relative h-64 w-full mb-6 bg-gradient-to-r from-[#131921] to-[#232F3E] rounded overflow-hidden">
                    <Image
                        src={sampleProducts[1].images[0]}
                        alt="Ofertas especiales"
                        fill
                        className="opacity-50 object-cover"
                        priority
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-center p-4">
                        <h1 className="text-3xl md:text-4xl font-bold text-white">Todo para tu mate con envío rápido</h1>
                    </div>
                </div>

                {/* Sección de termos */}
                <section className="mb-8 bg-white p-4 rounded shadow">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-900">Los termos más comprados</h2>
                        <Link href="/termos" className="text-[#232F3E] hover:text-[#FFD712] text-sm">
                            Ver todos
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {termos.map(product => (
                            <div key={product.id} className="group border border-gray-200 hover:border-[#FFD712] rounded p-3 transition">
                                <div className="relative h-48 w-full mb-3">
                                    <Image
                                        src={product.images[0]}
                                        alt={product.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <h3 className="font-semibold text-gray-900 group-hover:text-[#131921]">{product.name}</h3>
                                <p className="text-gray-600 text-sm mb-1">{product.description}</p>
                                <div className="flex items-center justify-between">
                                    <div>
                                        {product.discount ? (
                                            <>
                                                <span className="font-bold text-lg text-gray-900">
                                                    {((product.price * (100 - product.discount)) / 100)}€
                                                </span>
                                                <span className="line-through text-sm text-gray-500 ml-2">
                                                    {product.price}€
                                                </span>
                                            </>
                                        ) : (
                                            <span className="font-bold text-lg text-gray-900">
                                                {product.price}€
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                        {product.stock ? `${product.stock} en stock` : 'Agotado'}
                                    </span>
                                </div>
                                <div className="flex items-center mt-1">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className="w-4 h-4" 
                                                fill={i < Math.floor(product.reviews?.scoring || 0) ? "currentColor" : "none"} 
                                                stroke="currentColor" 
                                                viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="text-xs text-gray-500 ml-1">
                                        {product.reviews?.scoring?.toFixed(1)} ({product.reviews?.totalRatings.toLocaleString()})
                                    </span>
                                </div>
                                <button 
                                    onClick={() => handleAddToCart(product)}
                                    className="mt-2 w-full bg-[#FFD712] hover:bg-yellow-400 text-[#131921] py-1 rounded text-sm font-medium transition"
                                >
                                    Añadir al carrito
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Sección de mates */}
                <section className="mb-8 bg-white p-4 rounded shadow">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-900">Los mejores mates del momento</h2>
                        <Link href="/mates" className="text-[#232F3E] hover:text-[#FFD712] text-sm">
                            Ver todos
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {mates.map(product => (
                            <div key={product.id} className="group border border-gray-200 hover:border-[#FFD712] rounded p-3 transition">
                                {/* Mismo patrón que para los termos */}
                                <div className="relative h-48 w-full mb-3">
                                    <Image
                                        src={product.images[0]}
                                        alt={product.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <h3 className="font-semibold text-gray-900 group-hover:text-[#131921]">{product.name}</h3>
                                <p className="text-gray-600 text-sm mb-1">{product.description}</p>
                                <div className="flex items-center justify-between">
                                    <span className="font-bold text-lg text-gray-900">{product.price}€</span>
                                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">En stock</span>
                                </div>
                                <button 
                                    onClick={() => handleAddToCart(product)}
                                    className="mt-2 w-full bg-[#FFD712] hover:bg-yellow-400 text-[#131921] py-1 rounded text-sm font-medium transition"
                                >
                                    Añadir al carrito
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Sección de hierbas */}
                <section className="bg-white p-4 rounded shadow">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-900">Las hierbas más populares</h2>
                        <Link href="/hierbas" className="text-[#232F3E] hover:text-[#FFD712] text-sm">
                            Ver todos
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {hierbas.length > 0 ? (
                            hierbas.map(product => (
                                <div key={product.id} className="group border border-gray-200 hover:border-[#FFD712] rounded p-3 transition">
                                    {/* Mismo patrón que para los termos */}
                                </div>
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-500">Próximamente más productos</p>
                        )}
                    </div>
                </section>
            </main>
            <Footer/>

            <PopUp
                isOpen={showPopup}
                onClose={() => setShowPopup(false)}
                title={`${selectedProduct?.name} añadido al carrito`}
                message={`Precio: ${selectedProduct?.price}€${selectedProduct?.discount ? ` (${selectedProduct.discount}% de descuento)` : ''}`}
                primaryButtonText="Seguir comprando"
                secondaryButtonText="Ir al carrito"
                onPrimaryButtonClick={handleContinueShopping}
                secondaryButtonHref="/product"
                primaryButtonColor="bg-[#FFD712] hover:bg-yellow-400"
                secondaryButtonColor="bg-white border border-[#131921] hover:bg-gray-100"
                showSuccessIcon={true}
                animationDuration={300}
            />
        </div>
    );
}