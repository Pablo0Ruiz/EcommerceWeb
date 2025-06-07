'use client'

import { Product } from "@/modules/product/typesProduct"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { FormSearch } from "../typesSearch"
import { getProducts } from "@/modules/product/services/product";

export const SearchBar = () => {
    const { register, handleSubmit, reset } = useForm<FormSearch>()
    const [resultado, setResultado] = useState<Product[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const onSubmit = async (data: FormSearch) => {
        console.log(data)
        const fetchedProducts = await getProducts({    //aqui va la llamada, cambiala todo lo que quieras , esta el esqueleto con todo lo que tiene el controller
            category: selectedCategory || undefined,
            // aqui se ponen los parametros que puso alvaro:
            // minPrice: 0,
            // maxPrice: 1000,
            // sortBy: 'sold',
            // etc.
        });
        const jeje: Product[] = []
        setResultado(jeje)
        reset()
    }

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 mb-4">
                <input
                    {...register("busqueda")}
                    type="text"
                    placeholder="Buscar productos..."
                    className="border px-2 py-1 rounded flex-1 bg-white text-black"
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded-xl">
                    Buscar
                </button>
            </form>

            <ul>
                {resultado.map((producto) => (
                    <li key={producto.id} className="border p-2 mb-2 rounded">
                        <strong>{producto.name}</strong> - ${producto.price.toFixed(2)}
                    </li>
                ))}
            </ul>
        </div>
    )
}