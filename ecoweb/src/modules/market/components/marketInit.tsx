"use client";
import { useState } from "react";
import { Header } from "@/modules/market/components/header";
import Image from "next/image";
import { Footer } from "@/modules/market/components/footer";
import { PopUp } from "@/shared/components/popup";
import { Product } from "@/modules/product/typesProduct";
import { sampleProducts } from "@/modules/product/mockProduct/ProductList";
import Link from "next/link";

export default function Market() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

const handleAddToCart = (product: Product) => {
  setSelectedProduct(product);
  setShowPopup(true);

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const existingItem = cart.find((item: Product) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  
  // Disparar evento personalizado para notificar a otros componentes
  window.dispatchEvent(new CustomEvent("cartUpdated"));
};

  const handleContinueShopping = () => {
    setShowPopup(false);
  };

  const termos = sampleProducts.filter((p) => p.category === "Termos");
  const mates = sampleProducts.filter((p) => p.category === "Mates");
  const hierbas = sampleProducts.filter((p) => p.category === "Hierbas");

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
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Todo para tu mate con envío rápido
            </h1>
          </div>
        </div>

        {/* Sección de termos */}
        <section className="mb-8 bg-white p-4 rounded shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Los termos más comprados
            </h2>
            <Link
              href="/termos"
              className="text-[#232F3E] hover:text-[#FFD712] text-sm"
            >
              Ver todos
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {termos.map((product) => (
              <Link
                href={`/product/${product.id}`}
                key={product.id}
                className="group border border-gray-200 hover:border-[#FFD712] rounded p-3 transition cursor-pointer"
              >
                <div className="relative h-48 w-full mb-3">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-[#131921]">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-1">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg text-gray-900">
                    {product.price.toFixed(2)}€
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      product.stock > 0
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.stock > 0
                      ? `${product.stock} en stock`
                      : "Agotado"}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddToCart(product);
                  }}
                  className={`mt-2 w-full py-1 rounded text-sm font-medium transition ${
                    product.stock > 0
                      ? "bg-[#FFD712] hover:bg-yellow-400 text-[#131921]"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={product.stock <= 0}
                >
                  {product.stock > 0 ? "Añadir al carrito" : "Sin stock"}
                </button>
              </Link>
            ))}
          </div>
        </section>

        {/* Sección de mates */}
        <section className="mb-8 bg-white p-4 rounded shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Los mejores mates del momento
            </h2>
            <Link
              href="/mates"
              className="text-[#232F3E] hover:text-[#FFD712] text-sm"
            >
              Ver todos
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mates.map((product) => (
              <Link
                href={`/product/${product.id}`}
                key={product.id}
                className="group border border-gray-200 hover:border-[#FFD712] rounded p-3 transition cursor-pointer"
              >
                <div className="relative h-48 w-full mb-3">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-[#131921]">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-1">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg text-gray-900">
                    {product.price.toFixed(2)}€
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      product.stock > 0
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.stock > 0 ? "En stock" : "Agotado"}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddToCart(product);
                  }}
                  className={`mt-2 w-full py-1 rounded text-sm font-medium transition ${
                    product.stock > 0
                      ? "bg-[#FFD712] hover:bg-yellow-400 text-[#131921]"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={product.stock <= 0}
                >
                  {product.stock > 0 ? "Añadir al carrito" : "Sin stock"}
                </button>
              </Link>
            ))}
          </div>
        </section>

        {/* Sección de hierbas */}
        <section className="bg-white p-4 rounded shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Las hierbas más populares
            </h2>
            <Link
              href="/hierbas"
              className="text-[#232F3E] hover:text-[#FFD712] text-sm"
            >
              Ver todos
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {hierbas.length > 0 ? (
              hierbas.map((product) => (
                <Link
                  href={`/product/${product.id}`}
                  key={product.id}
                  className="group border border-gray-200 hover:border-[#FFD712] rounded p-3 transition cursor-pointer"
                >
                  <div className="relative h-48 w-full mb-3">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-[#131921]">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-1">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg text-gray-900">
                      {product.price.toFixed(2)}€
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        product.stock > 0
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.stock > 0 ? "En stock" : "Agotado"}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(product);
                    }}
                    className={`mt-2 w-full py-1 rounded text-sm font-medium transition ${
                      product.stock > 0
                        ? "bg-[#FFD712] hover:bg-yellow-400 text-[#131921]"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={product.stock <= 0}
                  >
                    {product.stock > 0 ? "Añadir al carrito" : "Sin stock"}
                  </button>
                </Link>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                Próximamente más productos
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />

      <PopUp
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        title={`${selectedProduct?.name} añadido al carrito`}
        message={`Precio: ${selectedProduct?.price}€${
          selectedProduct?.discount
            ? ` (${selectedProduct.discount}% de descuento)`
            : ""
        }`}
        primaryButtonText="Seguir comprando"
        secondaryButtonText="Ir al carrito"
        onPrimaryButtonClick={handleContinueShopping}
        secondaryButtonHref="/cart"
        primaryButtonColor="bg-[#FFD712] hover:bg-yellow-400"
        secondaryButtonColor="bg-white border border-[#131921] hover:bg-gray-100"
        showSuccessIcon={true}
        animationDuration={300}
      />
    </div>
  );
}
