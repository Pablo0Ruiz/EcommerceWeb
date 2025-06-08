
import { Product } from "../typesProduct";

export const getProducts = async (params?: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sortBy?: 'price' | 'rating' | 'sold' | 'createdAt';
  name?: string;
}): Promise<Product[]> => {
  try {
    // Construye la URL de la API interna de Next.js
    const queryString = new URLSearchParams();
    
    if (params?.category) queryString.append('category', params.category);
    if (params?.minPrice) queryString.append('minPrice', params.minPrice.toString());
    if (params?.maxPrice) queryString.append('maxPrice', params.maxPrice.toString());
    if (params?.minRating) queryString.append('minRating', params.minRating.toString());
    if (params?.sortBy) queryString.append('sortBy', params.sortBy);
    if (params?.name) queryString.append('name', params.name);

    const response = await fetch(`/api/auth/product?${queryString.toString()}`, {
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; // Propaga el error para manejarlo en el componente
  }
};