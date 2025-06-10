"use client";
import { useState } from "react";
import { Header } from "@/modules/market/components/header";
import Image from "next/image";
import { Footer } from "@/modules/market/components/footer";
import { PopUp } from "@/shared/components/popup";
import Link from "next/link";
import bgMarket from "@/../public/matezone_market.jpeg";
import { useCartStore } from "@/modules/cart/hook/cart";
import useLanding from "@/modules/landing/services/useLanding";
import { ProductsLanding } from "@/modules/landing/components/heroSection";

export default function Market() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductsLanding | null>(null);
  const [products, setProducts] = useState<ProductsLanding[]>([]);
  const [searchResults, setSearchResults] = useState<ProductsLanding[] | null>(null);

  const addToCart = useCartStore((state) => state.addToCart);

  useLanding(setProducts);

  const handleAddToCart = (product: ProductsLanding) => {
    setSelectedProduct(product);
    setShowPopup(true);
    addToCart(product);
    window.dispatchEvent(new CustomEvent("cartUpdated"));
  };

  const handleContinueShopping = () => {
    setShowPopup(false);
  };

  const handleSearchResults = (results: ProductsLanding[]) => {
    setSearchResults(results.length > 0 ? results : null);
  };

  const displayedProducts = searchResults !== null ? searchResults : products;

  return (
    <div className="relative bg-gray-100/30 min-h-screen overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <Image
          src={bgMarket}
          alt="Background"
          fill
          className="object-cover"
          quality={100}
          priority
        />
      </div>

      <Header onSearchResults={handleSearchResults} />
      <main className="container mx-auto p-4">
        <section className="mb-8 bg-white/0 p-4 rounded">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              {searchResults !== null ? "Resultados de búsqueda" : "Productos"}
            </h2>
            {searchResults !== null && (
              <button
                onClick={() => setSearchResults(null)}
                className="text-sm text-[#2E8B57] hover:underline"
              >
                Mostrar todos los productos
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayedProducts.map((product) => (
              <Link
                href={`/product/${product._id}`}
                key={product._id}
                className="group border bg-white border-gray-200 hover:border-[#0CAA2A] rounded-xl p-3 transition cursor-pointer"
              >
                <div className="relative h-48 w-full mb-3">
                  <Image
                    src={product.images[0] || "/logo.png"}
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
                    className={`text-xs px-2 py-1 rounded ${product.stock > 0
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
                    handleAddToCart({ ...product, _id: product._id });
                  }}
                  className={`mt-2 w-full py-1 rounded text-sm font-medium transition ${product.stock > 0
                    ? "bg-[#0CAA2A] hover:bg-green-700 text-white"
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
      </main>
      <Footer />

      <PopUp
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        title={`${selectedProduct?.name} añadido al carrito`}
        message={`Precio: ${selectedProduct?.price.toFixed(2)}€${selectedProduct?.discount
          ? ` (${selectedProduct.discount}% de descuento)`
          : ""
          }`}
        primaryButtonText="Seguir comprando"
        secondaryButtonText="Ir al carrito"
        onPrimaryButtonClick={handleContinueShopping}
        secondaryButtonHref="/cart"
        primaryButtonColor="bg-[#0CAA2A] hover:bg-green-700 text-white"
        secondaryButtonColor="bg-white border border-[#131921] hover:bg-gray-100"
        showSuccessIcon={true}
        animationDuration={300}
      />
    </div>
  );
}