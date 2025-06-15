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

    // Cargar todos los productos una vez
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

    // Búsqueda híbrida: local para texto, backend para filtros complejos
    const search = async (filters: SearchFilters): Promise<ProductsLanding[]> => {
        setLoading(true);
        
        try {
            // Si solo hay búsqueda por nombre, usar filtro local
            const hasOnlyNameFilter = filters.name && 
                                    !filters.category && 
                                    !filters.minPrice && 
                                    !filters.maxPrice && 
                                    !filters.minRating && 
                                    !filters.sortBy;

            if (hasOnlyNameFilter) {
                console.log('Usando búsqueda local para:', filters.name);
                
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

                console.log(`Búsqueda local: ${filteredProducts.length} resultados`);
                return filteredProducts;
            }

            // Para filtros complejos, usar el backend
            console.log('Usando búsqueda backend para filtros complejos');
            
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