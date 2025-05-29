"use client";
import { use, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Header } from "@/modules/market/components/header";
import { Footer } from "@/modules/market/components/footer";
import { sampleProducts } from "@/modules/product/mockProduct/ProductList";
import { PopUp } from "@/shared/components/popup"; // Importamos el componente PopUp
import { Product } from "@/modules/product/typesProduct";

export default function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const actualParams = use(params);
  const product = sampleProducts.find((p) => p.id === actualParams.id);

  // Estados para el PopUp
  const [showPopup, setShowPopup] = useState(false);

  const extendedImages = product ? [...product.images] : [];
  const [mainImage, setMainImage] = useState(extendedImages[0] || "");

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Producto no encontrado
      </div>
    );
  }

const handleAddToCart = () => {
  // Verificar stock antes de añadir
  if (product.stock <= 0) return;

  setShowPopup(true);

  // Guardar en localStorage
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const existingItem = cart.find((item: Product) => item.id === product.id);

  if (existingItem) {
    // Verificar que no supere el stock disponible
    if (existingItem.quantity < product.stock) {
      existingItem.quantity += 1;
    } else {
      // Opcional: Mostrar mensaje de stock máximo alcanzado
      alert("Has alcanzado el stock disponible para este producto");
      return;
    }
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

  // Función para continuar comprando
  const handleContinueShopping = () => {
    setShowPopup(false);
  };

  const handleThumbnailClick = (img: string) => {
    setMainImage(img);
  };

  // Datos de reseñas
  const reviews = product.reviews?.reviewTexts || [];
  const totalReviews = product.reviews?.totalRatings || 0;
  const averageScore = product.reviews?.scoring || 0;

  // Función para formatear la fecha
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow container mx-auto px-36 py-12">
        <button
          onClick={() => router.back()}
          // se usa router.back()} por que de lo contrario habria que mantener control constante con el link
          className="mb-8 text-blue-600 hover:underline text-2xl"
        >
          ← Volver atrás
        </button>

        <div className="flex gap-8">
          {/* Columna izquierda - Imágenes */}
          <div className="w-2/5 space-y-4">
            <div className="w-full h-[400px] bg-gray-200 flex items-center justify-center relative rounded-lg overflow-hidden">
              <Image
                src={mainImage}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {extendedImages.map((img, i) => (
                <div
                  key={i}
                  className={`relative h-20 rounded-lg overflow-hidden cursor-pointer transition-all ${
                    mainImage === img
                      ? "ring-2 ring-blue-500 scale-105"
                      : "hover:ring-1 hover:ring-gray-300"
                  }`}
                  onClick={() => handleThumbnailClick(img)}
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 25vw, 8vw"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Columna derecha - Contenido */}
          <div className="w-3/5 flex flex-col pl-8">
            {/* Sección superior - Detalles del producto */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-6 h-6 ${
                        i < Math.floor(averageScore)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xl text-gray-500">
                  {totalReviews.toLocaleString()} opiniones
                </span>
              </div>

              <div className="space-y-4 mb-6">
                <h2 className="text-2xl font-semibold">Descripción</h2>
                <p className="text-xl text-gray-700">{product.description}</p>
              </div>
            </div>

            {/* Sección fija inferior - Precio y acción */}
            <div className="bg-white border-t border-gray-200 pt-4 pb-6 mt-6">
              <div className="flex justify-between items-center">
                <div>
                  {product.discount > 0 && (
                    <div className="flex items-center space-x-2">
                      <span className="text-3xl font-bold text-[#BF0019]">
                        {product.price.toFixed(2)}€
                      </span>
                      <span className="text-xl line-through text-gray-500">
                        {(product.price * (1 + product.discount / 100)).toFixed(
                          2
                        )}
                        €
                      </span>
                      <span className="bg-red-100 text-red-800 text-sm px-2 py-0.5 rounded">
                        -{product.discount}%
                      </span>
                    </div>
                  )}
                  {product.discount <= 0 && (
                    <span className="text-3xl font-bold text-[#BF0019]">
                      {product.price.toFixed(2)}€
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-lg">
                    Stock:{" "}
                    <span className="font-semibold">{product.stock}</span>
                  </span>
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock <= 0}
                    className={`py-2 px-6 rounded-xl text-xl font-bold transition ${
                      product.stock > 0
                        ? "bg-[#0CAA2A] hover:bg-green-700 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {product.stock > 0 ? "Añadir al carrito" : "Sin stock"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reseñas */}
        {reviews.length > 0 && (
          <div className="mt-12 pt-6 border-t border-gray-200">
            <h2 className="text-3xl font-bold mb-6">Reseñas del producto</h2>
            <div className="space-y-6">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="border border-gray-300 rounded-xl p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white text-xl">
                        {String.fromCharCode(65 + index)}{" "}
                        {/* Letra A, B, C... */}
                      </div>
                      <span className="text-xl">Usuario {index + 1}</span>
                    </div>
                    <span className="text-lg text-gray-500">
                      {formatDate(review.createdAt)}
                    </span>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-6 h-6 mr-1 ${
                          i < review.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-lg">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
      <PopUp
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        title={`${product.name} añadido al carrito`}
        message={`Precio: ${product.price.toFixed(2)}€${
          product.discount ? ` (${product.discount}% de descuento)` : ""
        }`}
        primaryButtonText="Seguir comprando"
        secondaryButtonText="Ir al carrito"
        onPrimaryButtonClick={handleContinueShopping}
        secondaryButtonHref="/cart"
        primaryButtonColor="bg-[#0CAA2A] hover:bg-green-700"
        secondaryButtonColor="bg-white border border-[#131921] hover:bg-gray-100"
        showSuccessIcon={true}
        animationDuration={300}
      />
    </div>
  );
}
