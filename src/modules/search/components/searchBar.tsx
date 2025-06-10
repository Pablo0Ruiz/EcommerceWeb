'use client'

import { useForm } from "react-hook-form"
import { useState } from "react";
import { getProducts } from "@/modules/product/services/product";
import { ProductsLanding } from "@/modules/landing/components/heroSection";

interface FormSearch {
    name?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    sortBy?: 'sold' | 'priceAsc' | 'priceDesc' | '';
}

export interface ProductSearchParams {
    name?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    sortBy?: 'sold' | 'priceAsc' | 'priceDesc';
}

interface SearchBarProps {
    onSearchResults: (results: ProductsLanding[]) => void;
}

export const SearchBar = ({ onSearchResults }: SearchBarProps) => {
    const { register, handleSubmit } = useForm<FormSearch>()
    const [loading, setLoading] = useState(false)

    const onSubmit = async (data: FormSearch) => {
        setLoading(true)

        try {
            const params: ProductSearchParams = {}

            if (data.category?.trim()) params.category = data.category.trim()
            if (data.minPrice !== undefined && data.minPrice !== null && !isNaN(data.minPrice)) {
                params.minPrice = data.minPrice
            }
            if (data.maxPrice !== undefined && data.maxPrice !== null && !isNaN(data.maxPrice)) {
                params.maxPrice = data.maxPrice
            }
            if (data.minRating !== undefined && data.minRating !== null && !isNaN(data.minRating)) {
                params.minRating = data.minRating
            }
            if (data.sortBy) params.sortBy = data.sortBy

            const fetchedProducts = await getProducts(params);
            onSearchResults((fetchedProducts as ProductsLanding[]) || [])
        } catch (error) {
            console.error('Error al buscar productos:', error)
            onSearchResults([])
        } finally {
            setLoading(false)
        }
    }
    // Removed unused handleReset function

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="flex">
                <select
                    {...register("category")}
                    className="border border-gray-300 px-2 py-1 rounded-l bg-white text-black"
                >
                    <option value="">Todas las categorías</option>
                    <option value="yerbas">Yerbas</option>
                    <option value="mates">Mates</option>
                    <option value="termos">Termos</option>
                    <option value="bombillas">Bombillas</option>
                </select>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#3DA56A] hover:bg-[#2E8B57] text-white px-4 py-2 rounded-r transition-colors"
                >
                    {loading ? 'Buscando...' : 'Buscar'}
                </button>
            </div>
        </form>
    )
}
