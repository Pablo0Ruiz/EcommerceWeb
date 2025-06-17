import { useState } from 'react';
import { ProductsLanding } from "@/modules/landing/components/heroSection";
import { getSearch } from '../services/search';

interface SearchFilters {
    name?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    sortBy?: 'sold' | 'priceAsc' | 'priceDesc';
}

export const useProductSearch = () => {
    const [loading, setLoading] = useState(false);
    const [allProducts, setAllProducts] = useState<ProductsLanding[]>([]);


    const loadAllProducts = async () => {
        try {
            const response = await fetch('/api/auth/product/search', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            
            if (response.ok) {
                const products = await response.json();
                setAllProducts(products);
                return products;
            }
        } catch (error) {
            console.error('Error cargando productos:', error);
        }
        return [];
    };


    const search = async (filters: SearchFilters): Promise<ProductsLanding[]> => {
        setLoading(true);
        
        try {

            const hasOnlyNameFilter = filters.name && 
                                    !filters.category && 
                                    !filters.minPrice && 
                                    !filters.maxPrice && 
                                    !filters.minRating && 
                                    !filters.sortBy;

            if (hasOnlyNameFilter) {

                
                let products = allProducts;
                if (products.length === 0) {
                    products = await loadAllProducts();
                }

                const searchTerm = filters.name!.toLowerCase();
                const filteredProducts = products.filter((product: ProductsLanding) =>
                    product.name?.toLowerCase().includes(searchTerm) ||
                    product.description?.toLowerCase().includes(searchTerm) ||
                    product.category?.toLowerCase().includes(searchTerm)
                );


                return filteredProducts;
            }



            
            const cleanParams = Object.fromEntries(
                Object.entries(filters).filter(
                    ([, value]) => value !== undefined && value !== '' && value !== 0 && !Number.isNaN(value)
                )
            );

            const searchParams = new URLSearchParams();
            Object.entries(cleanParams).forEach(([key, value]) => {
                searchParams.append(key, String(value));
            });

            const results = await getSearch(searchParams);
            return (results as ProductsLanding[]) || [];

        } catch (error) {
            console.error('Error en búsqueda:', error);
            return [];
        } finally {
            setLoading(false);
        }
    };

    return {
        search,
        loading,
        loadAllProducts
    };
};