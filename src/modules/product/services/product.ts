import { Product } from "../typesProduct";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const getProducts = async (params?: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sortBy?: string;
  name?: string;
}): Promise<Product[]> => {
  try {
    const queryParams = new URLSearchParams();

    // Filtrar y agregar parámetros solo si tienen valores válidos
    if (params?.category?.trim()) {
      queryParams.append('category', params.category.trim());
    }

    if (params?.minPrice !== undefined && params.minPrice !== null && !isNaN(params.minPrice)) {
      queryParams.append('minPrice', params.minPrice.toString());
    }

    if (params?.maxPrice !== undefined && params.maxPrice !== null && !isNaN(params.maxPrice)) {
      queryParams.append('maxPrice', params.maxPrice.toString());
    }

    if (params?.minRating !== undefined && params.minRating !== null && !isNaN(params.minRating)) {
      queryParams.append('minRating', params.minRating.toString());
    }

    if (params?.sortBy?.trim()) {
      queryParams.append('sortBy', params.sortBy.trim());
    }

    if (params?.name?.trim()) {
      queryParams.append('name', params.name.trim());
    }

    const url = `${API_URL}/product${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;


    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error fetching products: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};