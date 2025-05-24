// components/CategoriesDropdown.tsx
"use client"
import { useState } from "react";
import Link from "next/link";

export const CategoriesDesplegable = () => {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    { name: "Yerbas", icon: "🍃", path: "/hierbas" },
    { name: "Bombillas", icon: "🥤", path: "/bombillas" },
    { name: "Termos", icon: "🧊", path: "/termos" },
    { name: "Mates", icon: "🧉", path: "/mates" },
  ];

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
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

      {isOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="absolute left-0 top-0 h-full w-64 bg-white shadow-lg z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Categorías</h3>
            </div>
            <ul className="divide-y divide-gray-200">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.path}
                    className="flex items-center px-4 py-3 hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
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
  );
};