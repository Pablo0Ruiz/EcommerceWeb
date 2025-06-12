'use client'

import { useForm } from "react-hook-form"
import { useState } from "react"
import { ProductsLanding } from "@/modules/landing/components/heroSection"
import { getSearch } from "../services/search"
import { CATEGORIES } from "@/shared/components/categories"

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
    const { register, handleSubmit, reset, setValue } = useForm<FormSearch>()
    const [loading, setLoading] = useState(false)
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)

    const onSubmit = async (data: FormSearch) => {
        setLoading(true)
        console.log('data nuevo',data)
        try {
            const rawParams: ProductSearchParams = {
                name: data.name?.trim(),
                category: data.category?.trim(),
                minPrice: data.minPrice,
                maxPrice: data.maxPrice,
                minRating: data.minRating,
                sortBy: data.sortBy || undefined,
            }
            const cleanParams = Object.fromEntries(
                Object.entries(rawParams).filter(
                    ([, v]) => v !== undefined && v !== '' && !Number.isNaN(v)
                )
            )
            const searchParams = new URLSearchParams(cleanParams as Record<string, string>)
            const fetchProduct = await getSearch(searchParams)
            onSearchResults((fetchProduct as ProductsLanding[]) || [])
        } catch (error) {
            console.error('Error al buscar productos:', error)
            onSearchResults([])
        } finally {
            setLoading(false)
            reset()
        }
    }

    const handleCategoryClick = (value: string) => {
        setValue('category', value)
        setIsCategoriesOpen(false)
        handleSubmit(onSubmit)()
    }

    return (
        <div className="relative">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        {...register("name")}
                        placeholder="Buscar productos..."
                        className="flex-1 px-4 py-2 bg-white border border-[#3DA56A] rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#C1F7D5] text-black transition-all duration-200"
                    />
                    <button
                        type="button"
                        onClick={() => setIsCategoriesOpen(true)}
                        className="px-4 py-2 bg-[#3DA56A] hover:bg-[#2E8B57] text-white rounded-lg shadow transition-all duration-200"
                    >
                        Categorías
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center px-4 py-2 bg-[#3DA56A] hover:bg-[#2E8B57] text-white rounded-lg shadow transition-all duration-200 disabled:opacity-70"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Buscando...
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                Buscar
                            </>
                        )}
                    </button>
                </div>
            </form>

            {isCategoriesOpen && (
                <div className="fixed inset-0 z-50" onClick={() => setIsCategoriesOpen(false)}>
                    <div
                        className="absolute left-0 top-0 h-full w-64 bg-[#2E8B57] shadow-xl transform transition-transform duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-4 border-b border-gray-200 bg-[#2E8B57]">
                            <h3 className="text-lg font-semibold text-white">Categorías</h3>
                        </div>
                        <ul className="divide-y divide-gray-100">
                            {CATEGORIES.map((category) => (
                                <li key={category.key}>
                                    <button
                                        onClick={() => handleCategoryClick(category.value)}
                                        className="w-full flex items-center px-4 py-3 hover:bg-[#E8F5EE] transition-colors duration-150"
                                    >
                                        <span className="mr-3 text-xl text-[#2E8B57]">{category.icon}</span>
                                        <span className="text-white font-medium">{category.name}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}
