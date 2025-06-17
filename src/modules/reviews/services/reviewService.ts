import { ProductsLanding } from "@/modules/landing/components/heroSection";

interface ReviewData {
  rating: number;
  comment: string;
  userId: string;
  userName: string;
  userAvatar: string;
}

export const submitReview = async (id: string, reviewData: ReviewData): Promise<ProductsLanding> => {
  const response = await fetch(`/api/auth/product/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reviewData),
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al enviar la reseña");
  }

  return await response.json();
};