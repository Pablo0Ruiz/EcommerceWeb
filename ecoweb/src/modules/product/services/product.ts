// src/modules/product/services/product.service.ts
import { Product } from "../typesProduct";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

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
    
    if (params?.category) queryParams.append('category', params.category);
    if (params?.minPrice) queryParams.append('minPrice', params.minPrice.toString());
    if (params?.maxPrice) queryParams.append('maxPrice', params.maxPrice.toString());
    if (params?.minRating) queryParams.append('minRating', params.minRating.toString());
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params?.name) queryParams.append('name', params.name);

    const response = await fetch(`${API_URL}/products?${queryParams.toString()}`);
    
    if (!response.ok) {
      throw new Error('Error fetching products');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};