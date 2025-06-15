"use client";
import { useState, useEffect } from "react";
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

  // Verificar si hay resultados de búsqueda guardados al cargar el componente
  useEffect(() => {
    const savedResults = sessionStorage.getItem('searchResults');
    if (savedResults) {
      try {
        const parsedResults = JSON.parse(savedResults);
        setSearchResults(parsedResults);
        // Limpiar el sessionStorage después de usar los resultados
        sessionStorage.removeItem('searchResults');
      } catch (error) {
        console.error('Error al parsear resultados de búsqueda:', error);
        sessionStorage.removeItem('searchResults');
      }
    }
  }, []);

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
    console.log('esto es result', results)
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
          sizes="100vw"
          className="object-cover"
          quality={100}
          priority
        />
      </div>

      <Header onSearchResults={handleSearchResults} />
      <main className="container mx-auto p-4">
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {searchResults !== null && (
              <button
                onClick={() => setSearchResults(null)}
                className="text-sm text-[#2E8B57] hover:underline bg-white px-3 py-1 rounded shadow"
              >
                ← Mostrar todos los productos
              </button>
            )}
          </div>

          {displayedProducts.length === 0 ? (
            <div className="text-center py-12 bg-white/90 rounded-lg backdrop-blur-sm">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {searchResults !== null ? 'No se encontraron productos' : 'No hay productos disponibles'}
              </h3>
              <p className="text-gray-600">
                {searchResults !== null 
                  ? 'Intenta ajustar los filtros de búsqueda' 
                  : 'Vuelve a intentarlo más tarde'
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {displayedProducts.map((product, index) => {
                const hasValidImage = product.images?.[0] && product.images[0].trim() !== '';
                const imageSrc = hasValidImage ? product.images[0] : "/logo.png";

                return (
                  <Link
                    href={`/product/${product._id}`}
                    key={product._id}
                    className="group border bg-white border-gray-200 hover:border-[#0CAA2A] rounded-xl p-3 transition cursor-pointer hover:shadow-lg"
                  >
                    <div className="relative h-48 w-full mb-3 bg-gray-100 rounded flex items-center justify-center">
                      <Image
                        src={imageSrc}
                        alt={product.name || 'Producto'}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className={`object-contain ${!hasValidImage ? 'opacity-50' : ''}`}
                        priority={index < 4 && Boolean(product.images?.[0])}
                        onError={(e) => {
                          if (e.currentTarget.src.includes('/logo.png')) return; // Evitar loop
                          e.currentTarget.src = "/logo.png";
                          e.currentTarget.className = e.currentTarget.className + ' opacity-50';
                        }}
                      />
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 group-hover:text-[#131921] line-clamp-2 min-h-[3rem]">
                      {product.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-lg text-gray-900">
                        {product.price?.toFixed(2) || '0.00'}€
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          (product.stock || 0) > 0
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {(product.stock || 0) > 0 ? `Stock: ${product.stock}` : "Agotado"}
                      </span>
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if ((product.stock || 0) > 0) {
                          handleAddToCart({ ...product, _id: product._id });
                        }
                      }}
                      className={`mt-2 w-full py-2 rounded text-sm font-medium transition ${
                        (product.stock || 0) > 0
                          ? "bg-[#0CAA2A] hover:bg-green-700 text-white"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                      disabled={(product.stock || 0) <= 0}
                    >
                      {(product.stock || 0) > 0 ? "Añadir al carrito" : "Sin stock"}
                    </button>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </main>
      <Footer />

      <PopUp
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        title={`${selectedProduct?.name} añadido al carrito`}
        message={`Precio: ${selectedProduct?.price?.toFixed(2) || '0.00'}€${
          selectedProduct?.discount
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