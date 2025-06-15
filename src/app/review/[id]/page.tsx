"use client";
import { useState, useEffect, use, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { Header } from "@/modules/market/components/header";
import { Footer } from "@/modules/market/components/footer";
import { getUserCookie } from "@/shared/utils/cookies";
import { ProductsLanding } from "@/modules/landing/components/heroSection";
import { User } from "@/modules/auth/typesAuth";
import { getProduct } from "@/modules/product/getProduct";
import { submitReview } from "@/modules/reviews/services/reviewService";

export default function ReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [product, setProduct] = useState<ProductsLanding | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const hasCheckedRef = useRef(false);
  const user = getUserCookie() as User | null;

  // Usar useCallback para estabilizar la función
  const hasUserReviewed = useCallback((product: ProductsLanding) => {
    if (!user || !product?.reviews?.reviewTexts) return false;
    return product.reviews.reviewTexts.some((review) =>
      typeof review.user === "object" 
        ? review.user._id === user._id 
        : review.user === user._id
    );
  }, [user]);

  useEffect(() => {
    // Evitar múltiples ejecuciones con useRef
    if (hasCheckedRef.current) return;

    const fetchProduct = async () => {
      try {
        const productData = await getProduct(id);
        setProduct(productData);
        
        // Verificar si el usuario ya hizo una reseña
        if (hasUserReviewed(productData)) {
          hasCheckedRef.current = true;
          toast.error("Ya has realizado una reseña para este producto");
          router.push("/user/orders");
          return;
        }
        
        hasCheckedRef.current = true;
      } catch (error) {
        hasCheckedRef.current = true;
        const errorMessage = error instanceof Error 
          ? error.message 
          : "Error al cargar el producto";
        toast.error(errorMessage);
        router.push("/user/orders");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id, router, hasUserReviewed]); // Ahora incluir hasUserReviewed es seguro

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Debes iniciar sesión para enviar una reseña");
      return;
    }
    if (!product) {
      toast.error("No se pudo cargar el producto");
      return;
    }
    // Verificar nuevamente por si acaso
    if (hasUserReviewed(product)) {
      toast.error("Ya has realizado una reseña para este producto");
      router.push("/user/orders");
      return;
    }
    if (rating === 0) {
      toast.error("Debes seleccionar una calificación");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await submitReview(id, {
        rating,
        comment,
        userId: user._id,
        userName: user.name || "",
        userAvatar: user.urlToAvatar || ""
      });

      toast.success("¡Reseña enviada correctamente!");
      router.push(`/product/${id}`);
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Error al enviar la reseña";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0CAA2A]"></div>
          <span>Cargando producto...</span>
        </div>
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
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg md:text-xl ${rating >= star
                          ? "bg-yellow-400 text-white"
                          : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                        } transition-colors`}
                      aria-label={`Calificar con ${star} ${star === 1 ? 'estrella' : 'estrellas'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Calificación actual: {rating > 0 ? `${rating} estrella${rating !== 1 ? 's' : ''}` : 'Sin calificar'}
                </p>
              </div>

              <div>
                <label htmlFor="review-comment" className="block text-lg md:text-xl font-semibold mb-4">
                  Escribe tu reseña
                </label>
                <textarea
                  id="review-comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full h-40 p-4 border rounded-lg text-base md:text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="¿Qué te pareció el producto? Comparte tu experiencia..."
                  required
                  minLength={10}
                  maxLength={500}
                />
                <p className="text-sm text-gray-500 mt-1">
                  {comment.length}/500 caracteres (mínimo 10)
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || rating === 0 || comment.length < 10}
                className={`py-3 px-8 rounded-xl text-lg md:text-xl font-bold transition-all duration-200 ${
                  isSubmitting || rating === 0 || comment.length < 10
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#0CAA2A] hover:bg-green-700 text-white shadow-lg hover:shadow-xl"
                  }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Publicando...
                  </span>
                ) : (
                  "Publicar reseña"
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}