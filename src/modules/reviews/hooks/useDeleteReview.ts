import { useState } from "react";
import toast from "react-hot-toast";
import { ProductsLanding } from "@/modules/landing/components/heroSection";
import { User } from "@/modules/auth/typesAuth";

export const useDeleteReview = () => {
  const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteReview = async (
    product: ProductsLanding, 
    user: User,
    onSuccess?: () => void
  ) => {
    if (!user || !product?.reviews?.reviewTexts) {
      toast.error("No se puede eliminar la reseña");
      return;
    }

    // Encontrar la reseña del usuario
    const userReview = product.reviews.reviewTexts.find((review) =>
      typeof review.user === "object" 
        ? review.user._id === user._id 
        : review.user === user._id
    );

    if (!userReview || !userReview._id) {
      toast.error("No se encontró la reseña a eliminar");
      return;
    }

    setDeletingReviewId(userReview._id);
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/auth/product/del-review/${product._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idReview: userReview._id }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Error al eliminar la reseña');
      }

      toast.success("Reseña eliminada correctamente");
      
      // Ejecutar callback de éxito si se proporciona
      if (onSuccess) {
        onSuccess();
      } else {
        // Recargar por defecto si no hay callback
        window.location.reload();
      }
      
    } catch (error) {
      console.error('Error al eliminar reseña:', error);
      toast.error(
        `Error al eliminar la reseña: ${
          error instanceof Error ? error.message : 'Error desconocido'
        }`
      );
    } finally {
      setDeletingReviewId(null);
      setIsDeleting(false);
    }
  };

  return {
    deleteReview,
    deletingReviewId,
    isDeleting,
  };
};