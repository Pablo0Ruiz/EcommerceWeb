// modules/market/components/header.tsx
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SearchBar } from "@/modules/search/components/searchBar";
import { CartCounter } from "./cartCounter";
import { useCartStore } from "@/modules/cart/hook/cart";
import { CATEGORIES } from "@/shared/components/categories";

export const Header = () => {
  const { loadCart } = useCartStore();
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  return (
    <header className="bg-[#131921] text-white sticky top-0 z-50">
      <div className="flex items-center justify-between bg-[#131921] p-2 px-4">
        <Link href="/" className="flex items-center">
          <div className="text-3xl font-bold text-white hover:text-[#FFD712] transition">
            <span className="text-[#FFD712]">El</span>Gauchito
          </div>
        </Link>

        {/* Botón de categorías */}
        <div className="relative">
          <button
            onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
            className="hidden md:flex items-center px-3 py-1 border border-transparent hover:border-white rounded"
          >
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <span className="text-sm font-medium">Categorías</span>
          </button>

          {isCategoriesOpen && (
            <div 
              className="fixed inset-0 z-40"
              onClick={() => setIsCategoriesOpen(false)}
            >
              <div 
                className="absolute left-0 top-0 h-full w-64 bg-white shadow-lg z-50"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Categorías</h3>
                </div>
                <ul className="divide-y divide-gray-200">
                  {CATEGORIES.map((category) => (
                    <li key={category.key}>
                      <Link
                        href={{
                          pathname: "/market",
                          query: { category: category.value }
                        }}
                        className="flex items-center px-4 py-3 hover:bg-gray-50"
                        onClick={() => setIsCategoriesOpen(false)}
                      >
                        <span className="mr-3 text-xl">{category.icon}</span>
                        <span className="text-gray-800">{category.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="flex-grow mx-4 max-w-3xl">
          <SearchBar />
        </div>

        <Link href={"/user"}>
          <div className="hidden md:flex flex-col px-3 py-1 border border-transparent hover:border-white rounded">
            <span className="text-xs">Hola, Usuario</span>
          </div>
        </Link>

        <div className="hidden md:flex flex-col px-3 py-1 border border-transparent hover:border-white rounded">
          <span className="text-xs">Devoluciones</span>
          <span className="text-sm font-bold">y Pedidos</span>
        </div>

        <Link
          href="/cart"
          className="flex items-center px-3 py-1 border border-transparent hover:border-white rounded"
        >
          <div className="relative">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <CartCounter />
          </div>
          <span className="hidden lg:inline ml-1 font-bold">Carrito</span>
        </Link>
      </div>

      <div className="flex items-center bg-[#232F3E] p-2 px-4 text-sm overflow-x-auto whitespace-nowrap">
        <Link href="/termos" className="px-2 hover:text-[#FFD712]">
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              />
            </svg>
            Los termos más comprados
          </span>
        </Link>
        <Link href="/mates" className="px-2 hover:text-[#FFD712]">
          Los mejores mates del momento
        </Link>
        <Link href="/hierbas" className="px-2 hover:text-[#FFD712]">
          Las hierbas más populares
        </Link>
      </div>
    </header>
  );
};