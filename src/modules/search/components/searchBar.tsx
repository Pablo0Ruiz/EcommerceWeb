'use client'


import { useState } from "react"
import { useForm } from "react-hook-form"
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

export const SearchBar = () => {
    const { register, handleSubmit, reset } = useForm<FormSearch>()
    const [resultado, setResultado] = useState<ProductsLanding[]>([])
    const [loading, setLoading] = useState(false)

    const onSubmit = async (data: FormSearch) => {
        console.log('Datos del formulario:', data)
        setLoading(true)

        try {
            const params: ProductSearchParams = {}

            if (data.name?.trim()) params.name = data.name.trim()
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

            console.log('Parámetros enviados:', params)

            const fetchedProducts = await getProducts(params);
            setResultado((fetchedProducts as ProductsLanding[]) || [])
        } catch (error) {
            console.error('Error al buscar productos:', error)
            setResultado([])
        } finally {
            setLoading(false)
        }
    }

    const handleReset = () => {
        reset()
        setResultado([])
    }

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    {/* Búsqueda por nombre */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre del producto
                        </label>
                        <input
                            {...register("name")}
                            type="text"
                            placeholder="Buscar por nombre..."
                            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                        />
                    </div>

                    {/* Categoría */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Categoría
                        </label>
                        <select
                            {...register("category")}
                            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                        >
                            <option value="">Todas las categorías</option>
                            <option value="electronics">Electrónicos</option>
                            <option value="clothing">Ropa</option>
                            <option value="books">Libros</option>
                            <option value="home">Hogar</option>
                        </select>
                    </div>

                    {/* Ordenar por */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ordenar por
                        </label>
                        <select
                            {...register("sortBy")}
                            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                        >
                            <option value="">Sin orden específico</option>
                            <option value="sold">Más vendidos</option>
                            <option value="priceAsc">Precio: menor a mayor</option>
                            <option value="priceDesc">Precio: mayor a menor</option>
                        </select>
                    </div>

                    {/* Precio mínimo */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Precio mínimo
                        </label>
                        <input
                            {...register("minPrice", {
                                valueAsNumber: true,
                                min: 0
                            })}
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                        />
                    </div>

                    {/* Precio máximo */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Precio máximo
                        </label>
                        <input
                            {...register("maxPrice", {
                                valueAsNumber: true,
                                min: 0
                            })}
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="1000.00"
                            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                        />
                    </div>

                    {/* Rating mínimo */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Rating mínimo
                        </label>
                        <select
                            {...register("minRating", { valueAsNumber: true })}
                            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                        >
                            <option value="">Cualquier rating</option>
                            <option value="1">1+ estrella</option>
                            <option value="2">2+ estrellas</option>
                            <option value="3">3+ estrellas</option>
                            <option value="4">4+ estrellas</option>
                            <option value="5">5 estrellas</option>
                        </select>
                    </div>
                </div>

                {/* Botones */}
                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                        {loading ? 'Buscando...' : 'Buscar'}
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                        Limpiar
                    </button>
                </div>
            </form>

            {/* Resultados */}
            {loading && (
                <div className="text-center py-4">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="mt-2 text-gray-600">Buscando productos...</p>
                </div>
            )}

            {!loading && resultado.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">
                        Resultados ({resultado.length} productos encontrados)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {resultado.map((producto) => (
                            <div key={producto._id} className="bg-white border border-gray-200 p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                                <h4 className="font-semibold text-gray-800 mb-2">{producto.name}</h4>
                                <p className="text-blue-600 font-bold text-lg">${producto.price.toFixed(2)}</p>
                                {producto.category && (
                                    <p className="text-sm text-gray-500 mt-1">Categoría: {producto.category}</p>
                                )}
                                {producto.sold && (
                                    <p className="text-sm text-gray-500">Vendidos: {producto.sold}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {!loading && resultado.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    <p>No se encontraron productos con los criterios especificados.</p>
                </div>
            )}
        </div>
    )
}