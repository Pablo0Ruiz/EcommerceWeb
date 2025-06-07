"use client";
import Link from "next/link";
import Image from 'next/image'
import { useEffect, useState } from "react";
import { SearchBar } from "@/modules/search/components/searchBar";
import { CartCounter } from "./cartCounter";
import { useCartStore } from "@/modules/cart/hook/cart";
import { CATEGORIES } from "@/shared/components/categories";
import logo from '@/../public/logo.png';

export const Header = () => {
  const { loadCart } = useCartStore();
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  return (
    <header className="bg-[#2E8B57] text-white sticky top-0 z-50 shadow-lg">
      {/* Main Navigation */}
      <div className="flex items-center justify-between p-3 px-6">
        {/* Logo */}

        <Link href="/" className="relative flex items-center group pl-26">
          <div className="absolute -left-3 w-32 h-32">
            <Image
              src={logo}
              alt="Logo Matezone"
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="text-3xl font-bold text-white group-hover:scale-105 transition-transform duration-200">
            <span className="text-[#C1F7D5]">Mate</span>
            <span className="text-white">Zone</span>
          </div>
        </Link>

        {/* Categories Button */}
        <div className="relative">
          <button
            onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
            className="hidden md:flex items-center px-4 py-2 bg-[#3DA56A] hover:bg-[#2E8B57] rounded-lg shadow transition-all duration-200"
          >
            <svg
              className="w-5 h-5 mr-2"
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
              className="fixed inset-0 z-40 "
              onClick={() => setIsCategoriesOpen(false)}
            >
              <div 

                className="absolute left-0 top-0 h-full w-64 bg-[#2E8B57] shadow-xl z-50 transform transition-transform duration-200"

                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 border-b border-gray-200 bg-[#2E8B57]">
                  <h3 className="text-lg font-semibold text-white">Categorías</h3>
                </div>
                <ul className="divide-y divide-gray-100">
                  {CATEGORIES.map((category) => (
                    <li key={category.key}>
                      <Link
                        href={{
                          pathname: "/market",
                          query: { category: category.value }
                        }}
                        className="flex items-center px-4 py-3 hover:bg-[#E8F5EE] transition-colors duration-150"
                        onClick={() => setIsCategoriesOpen(false)}
                      >
                        <span className="mr-3 text-xl text-[#2E8B57]">{category.icon}</span>

                        <span className="text-white font-medium">{category.name}</span>

                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="flex-grow mx-6 max-w-3xl">
          <div className="[&_.border]:border-0 [&_input]:rounded-r-none [&_input]:focus:ring-2 [&_input]:focus:ring-[#C1F7D5] [&_button]:rounded-l-none [&_button]:bg-[#3DA56A] [&_button:hover]:bg-[#2E8B57] ">
            <SearchBar />
          </div>
        </div>


        {/* User Section */}
        <div className="flex items-center space-x-4">
          <Link href={"/user"}>
            <div className="hidden md:flex items-center px-4 py-2 bg-[#3DA56A] hover:bg-[#2E8B57] rounded-lg transition-colors duration-200 cursor-pointer">
              <svg 
                className="w-5 h-5 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="text-sm font-medium">Mi Cuenta</span>
            </div>
          </Link>

          <Link href={"/user/orders"}>
            <div className="hidden md:flex items-center px-4 py-2 bg-[#3DA56A] hover:bg-[#2E8B57] rounded-lg transition-colors duration-200 cursor-pointer">
              <svg 
                className="w-5 h-5 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round"
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
              <span className="text-sm font-medium">Mis Pedidos</span>
            </div>
          </Link>


          {/* Cart */}
          <Link
            href="/cart"
            className="flex items-center px-4 py-2 bg-[#3DA56A] hover:bg-[#2E8B57] rounded-lg transition-colors duration-200 relative group"
          >
            <div className="relative">
              <svg
                className="w-6 h-6"
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
            <span className="hidden lg:inline ml-2 font-medium">Carrito</span>
          </Link>
        </div>
      </div>
    </header>
  );
};