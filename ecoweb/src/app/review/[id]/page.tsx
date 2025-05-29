"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Header } from "@/modules/market/components/header";
import { Footer } from "@/modules/market/components/footer";
import { Product, ProductReview } from "@/modules/product/typesProduct";
import { getUserCookie } from "@/shared/utils/cookies";
import { sampleProducts } from "@/modules/product/mockProduct/ProductList";

export default function ReviewPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = getUserCookie();

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    const products = storedProducts ? JSON.parse(storedProducts) : sampleProducts;
    const foundProduct = products.find((p: Product) => p.id === id);
    
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      router.push("/user/orders");
    }
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !product || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const newReview: ProductReview = {
        user: user._id,
        rating,
        comment,
        createdAt: new Date(),
      };

      // Calcular nuevo scoring
      const currentTotal = product.reviews?.totalRatings || 0;
      const currentScore = product.reviews?.scoring || 0;
      const newTotal = currentTotal + 1;
      const newScore = ((currentScore * currentTotal) + rating) / newTotal;

      const updatedProduct: Product = {
        ...product,
        reviews: {
          scoring: parseFloat(newScore.toFixed(1)),
          totalRatings: newTotal,
          reviewTexts: [...(product.reviews?.reviewTexts || []), newReview],
        },
      };

      // Actualizar localStorage
      const storedProducts = localStorage.getItem("products");
      const products = storedProducts ? JSON.parse(storedProducts) : sampleProducts;
      const updatedProducts = products.map((p: Product) => 
        p.id === id ? updatedProduct : p
      );
      
      localStorage.setItem("products", JSON.stringify(updatedProducts));

      // Actualizar orders para marcar como reseñado
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      const updatedOrders = orders.map((order: any) => {
        const updatedItems = order.items.map((item: any) => {
          if (item.product === id) {
            return { ...item, reviewed: true };
          }
          return item;
        });
        return { ...order, items: updatedItems };
      });
      localStorage.setItem("orders", JSON.stringify(updatedOrders));

      router.push(`/product/${id}`);
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Cargando producto...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-36 py-12">
        <button
          onClick={() => router.back()}
          className="mb-8 text-blue-600 hover:underline text-2xl"
        >
          ← Volver atrás
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-2/5">
            <div className="w-full h-64 md:h-[400px] bg-gray-200 rounded-lg overflow-hidden relative">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
              />
            </div>
          </div>

          <div className="w-full md:w-3/5 space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
            <p className="text-lg md:text-xl text-gray-700">{product.description}</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-lg md:text-xl font-semibold mb-4">
                  Califica este producto
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg md:text-xl ${
                        rating >= star
                          ? "bg-yellow-400 text-white"
                          : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                      } transition-colors`}
                      aria-label={`Calificar con ${star} ${star === 1 ? 'estrella' : 'estrellas'}`}
                    >
                      {star}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="review-comment" className="block text-lg md:text-xl font-semibold mb-4">
                  Escribe tu reseña
                </label>
                <textarea
                  id="review-comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full h-40 p-4 border rounded-lg text-base md:text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="¿Qué te pareció el producto? Comparte tu experiencia..."
                  required
                  minLength={10}
                  maxLength={500}
                />
                <p className="text-sm text-gray-500 mt-1">Mínimo 10 caracteres</p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || rating === 0}
                className={`py-2 px-6 rounded-xl text-lg md:text-xl font-bold transition ${
                  isSubmitting || rating === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#0CAA2A] hover:bg-green-700 text-white"
                }`}
              >
                {isSubmitting ? "Publicando..." : "Publicar reseña"}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}