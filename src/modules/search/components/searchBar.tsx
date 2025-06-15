'use client'

import { useForm } from "react-hook-form"
import { useState, useEffect } from "react"
import { ProductsLanding } from "@/modules/landing/components/heroSection"
import { useProductSearch } from "../hooks/useProductSearch"
import { CATEGORIES } from "@/shared/components/categories"

interface FormSearch {
    name?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    sortBy?: 'sold' | 'priceAsc' | 'priceDesc' | '';
}

interface SearchBarProps {
    onSearchResults: (results: ProductsLanding[]) => void;
}

export const SearchBar = ({ onSearchResults }: SearchBarProps) => {
    const { register, handleSubmit, reset, setValue, watch } = useForm<FormSearch>()
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
    const [isFiltersOpen, setIsFiltersOpen] = useState(false)

    const { search, loading, loadAllProducts } = useProductSearch();
    const watchedValues = watch()


    useEffect(() => {
        loadAllProducts();
    }, []);

    const onSubmit = async (data: FormSearch) => {

        
        const filters = {
            name: data.name?.trim(),
            category: data.category?.trim(),
            minPrice: data.minPrice,
            maxPrice: data.maxPrice,
            minRating: data.minRating,
            sortBy: data.sortBy || undefined,
        };

        const results = await search(filters);
        onSearchResults(results);
    };

    const handleCategoryClick = (value: string) => {
        setValue('category', value)
        setIsCategoriesOpen(false)
        handleSubmit(onSubmit)()
    }

    const clearFilters = () => {
        reset()
        onSearchResults([])
    }

    const hasActiveFilters = () => {
        return watchedValues.name || 
               watchedValues.category || 
               (watchedValues.minPrice && watchedValues.minPrice > 0) || 
               (watchedValues.maxPrice && watchedValues.maxPrice > 0) || 
               (watchedValues.minRating && watchedValues.minRating > 0) || 
               watchedValues.sortBy
    }

    return (
        <div className="relative">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <div className="flex items-center space-x-2">
                    {/* Campo de búsqueda principal */}
                    <input
                        type="text"
                        {...register("name")}
                        placeholder="Buscar productos..."
                        className="flex-1 px-4 py-2 bg-white border border-[#3DA56A] rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#C1F7D5] text-black transition-all duration-200"
                    />
                    
                    {/* Botón Categorías */}
                    <button
                        type="button"
                        onClick={() => setIsCategoriesOpen(true)}
                        className={`px-3 py-2 rounded-lg shadow transition-all duration-200 text-sm whitespace-nowrap ${
                            watchedValues.category 
                                ? 'bg-[#C1F7D5] text-[#2E8B57] font-semibold' 
                                : 'bg-[#3DA56A] hover:bg-[#2E8B57] text-white'
                        }`}
                    >
                        {watchedValues.category ? 
                            CATEGORIES.find(cat => cat.value === watchedValues.category)?.name || 'Categorías'
                            : 'Categorías'
                        }
                    </button>

                    {/* Botón Filtros */}
                    <button
                        type="button"
                        onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                        className={`px-3 py-2 rounded-lg shadow transition-all duration-200 text-sm relative whitespace-nowrap ${
                            hasActiveFilters() 
                                ? 'bg-[#C1F7D5] text-[#2E8B57] font-semibold' 
                                : 'bg-[#3DA56A] hover:bg-[#2E8B57] text-white'
                        }`}
                    >
                        <svg className="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
                        </svg>
                        Filtros
                        {hasActiveFilters() && (
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                        )}
                    </button>

                    {/* Botón Buscar */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center px-4 py-2 bg-[#3DA56A] hover:bg-[#2E8B57] text-white rounded-lg shadow transition-all duration-200 disabled:opacity-70 whitespace-nowrap"
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

                    {/* Botón Limpiar */}
                    {hasActiveFilters() && (
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow transition-all duration-200 text-sm whitespace-nowrap"
                        >
                            Limpiar
                        </button>
                    )}
                </div>

                {/* Panel de Filtros Expandido */}
                {isFiltersOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-40 p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Precio Mínimo */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Precio Mínimo (€)
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    {...register("minPrice", { 
                                        valueAsNumber: true,
                                        validate: value => value === undefined || value >= 0
                                    })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3DA56A] text-black"
                                    placeholder="0.00"
                                />
                            </div>

                            {/* Precio Máximo */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Precio Máximo (€)
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    {...register("maxPrice", { 
                                        valueAsNumber: true,
                                        validate: value => value === undefined || value >= 0
                                    })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3DA56A] text-black"
                                    placeholder="999.99"
                                />
                            </div>

                            {/* Rating Mínimo */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Rating Mínimo
                                </label>
                                <select
                                    {...register("minRating", { valueAsNumber: true })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3DA56A] text-black"
                                >
                                    <option value="">Cualquier rating</option>
                                    <option value="1">⭐ 1+ estrellas</option>
                                    <option value="2">⭐ 2+ estrellas</option>
                                    <option value="3">⭐ 3+ estrellas</option>
                                    <option value="4">⭐ 4+ estrellas</option>
                                    <option value="5">⭐ 5 estrellas</option>
                                </select>
                            </div>

                            {/* Ordenar por */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Ordenar por
                                </label>
                                <select
                                    {...register("sortBy")}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3DA56A] text-black"
                                >
                                    <option value="">Por defecto</option>
                                    <option value="sold">Más vendidos</option>
                                    <option value="priceAsc">Precio: Menor a Mayor</option>
                                    <option value="priceDesc">Precio: Mayor a Menor</option>
                                </select>
                            </div>
                        </div>

                        {/* Resumen de filtros activos */}
                        {hasActiveFilters() && (
                            <div className="mt-4 p-3 bg-gray-50 rounded-md">
                                <h4 className="text-sm font-medium text-gray-700 mb-2">Filtros activos:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {watchedValues.name && (
                                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                            Nombre: {watchedValues.name}
                                        </span>
                                    )}
                                    {watchedValues.category && (
                                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                                            Categoría: {CATEGORIES.find(c => c.value === watchedValues.category)?.name}
                                        </span>
                                    )}
                                    {watchedValues.minPrice && (
                                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                                            Precio min: €{watchedValues.minPrice}
                                        </span>
                                    )}
                                    {watchedValues.maxPrice && (
                                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                                            Precio max: €{watchedValues.maxPrice}
                                        </span>
                                    )}
                                    {watchedValues.minRating && (
                                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                                            Rating min: {watchedValues.minRating}⭐
                                        </span>
                                    )}
                                    {watchedValues.sortBy && (
                                        <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                                            Orden: {
                                                watchedValues.sortBy === 'sold' ? 'Más vendidos' :
                                                watchedValues.sortBy === 'priceAsc' ? 'Precio ↑' :
                                                watchedValues.sortBy === 'priceDesc' ? 'Precio ↓' : ''
                                            }
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Botones del panel de filtros */}
                        <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={() => setIsFiltersOpen(false)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                            >
                                Cerrar
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsFiltersOpen(false)
                                    handleSubmit(onSubmit)() // ✅ Ejecutar búsqueda automáticamente
                                }}
                                className="px-4 py-2 bg-[#3DA56A] hover:bg-[#2E8B57] text-white rounded-md transition-colors"
                            >
                                Aplicar Filtros
                            </button>
                        </div>
                    </div>
                )}
            </form>

            {/* Modal de Categorías */}
            {isCategoriesOpen && (
                <div className="fixed inset-0 z-50" onClick={() => setIsCategoriesOpen(false)}>
                    <div
                        className="absolute left-0 top-0 h-full w-64 bg-[#2E8B57] shadow-xl transform transition-transform duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-4 border-b border-gray-200 bg-[#2E8B57] flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-white">Categorías</h3>
                            <button
                                onClick={() => setIsCategoriesOpen(false)}
                                className="text-white hover:text-gray-200"
                            >
                                ✕
                            </button>
                        </div>
                        <ul className="divide-y divide-gray-100">
                            {/* Opción para limpiar categoría */}
                            <li>
                                <button
                                    onClick={() => {
                                        setValue('category', '')
                                        setIsCategoriesOpen(false)
                                        handleSubmit(onSubmit)() // ✅ Agregar esta línea
                                    }}
                                    className="w-full flex items-center px-4 py-3 hover:bg-[#E8F5EE] transition-colors duration-150"
                                >
                                    <span className="mr-3 text-xl text-[#2E8B57]">🏷️</span>
                                    <span className="text-white font-medium">Todas las categorías</span>
                                </button>
                            </li>
                            {CATEGORIES.map((category) => (
                                <li key={category.key}>
                                    <button
                                        onClick={() => handleCategoryClick(category.value)}
                                        className={`w-full flex items-center px-4 py-3 hover:bg-[#E8F5EE] transition-colors duration-150 ${
                                            watchedValues.category === category.value ? 'bg-[#C1F7D5]' : ''
                                        }`}
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
