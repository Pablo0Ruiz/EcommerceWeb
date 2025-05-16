"use client";
import { use } from "react"; // 👈 IMPORTANTE
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Header } from "@/modules/market/components/header";
import { Footer } from "@/modules/market/components/footer";
import { sampleProducts } from "@/shared/mockProduct/ProductList";

export default function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const actualParams = use(params); // 👈 Aquí desempaquetas la promesa
  const product = sampleProducts.find((p) => p.id === actualParams.id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Producto no encontrado
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow container mx-auto px-36 py-12">
        <button
          onClick={() => router.back()}
          className="mb-8 text-blue-600 hover:underline text-2xl"
        >
          ← Volver atrás
        </button>

        <div className="grid grid-cols-2 gap-16">
          {/* Columna izquierda - Imágenes */}
          <div className="space-y-8">
            <div className="w-full h-[630px] bg-gray-200 flex items-center justify-center relative">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, i) => (
                <div key={i} className="relative h-32 rounded overflow-hidden">
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 25vw, 10vw"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Columna derecha - Detalles */}
          <div className="space-y-8">
            <h1 className="text-6xl font-bold">{product.name}</h1>

            <div className="flex items-center space-x-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-10 h-10 bg-yellow-400 mr-1"></div>
                ))}
              </div>
              <span className="text-2xl text-gray-500">360 opiniones</span>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-4xl font-bold text-[#BF0019]">
                {product.price}€
              </span>
              {product.discount > 0 && (
                <span className="text-4xl line-through text-gray-500">
                  {product.price * product.discount}€
                </span>
              )}
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-semibold">Descripción</h2>
              <p className="text-2xl">{product.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-2xl font-semibold">Stock disponible</h3>
                <p className="text-xl">{product.stock} unidades</p>
              </div>
            </div>

            <button className="w-full bg-[#0CAA2A] hover:bg-green-700 text-white py-4 px-6 rounded-xl text-4xl font-bold transition">
              Añadir al carrito
            </button>

            <div className="mt-12">
              <h2 className="text-4xl font-bold mb-8">Reseñas del producto</h2>
              <div className="space-y-12">
                {[1, 2].map((review) => (
                  <div
                    key={review}
                    className="border border-gray-300 rounded-2xl p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white text-xl">
                          {review === 1 ? "T" : "P"}
                        </div>
                        <span className="text-3xl">
                          {review === 1 ? "Tony" : "Paca"}
                        </span>
                      </div>
                      <span className="text-xl text-gray-500">
                        {review === 1 ? "Hace 2 semanas" : "El 24/5/2022"}
                      </span>
                    </div>
                    <div className="flex mt-4 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-10 h-10 mr-2 ${
                            i < 4
                              ? "bg-yellow-400"
                              : "border-2 border-yellow-400"
                          }`}
                        ></div>
                      ))}
                    </div>
                    <p className="text-2xl">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam in dui mauris. Vivamus hendrerit arcu sed erat
                      molestie vehicula. Sed auctor neque eu tellus rhoncus ut
                      eleifend nibh porttitor.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
