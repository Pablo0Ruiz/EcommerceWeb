'use client'
import { AddressManager } from "@/modules/client/components/addressCard";
import { Header } from '@/modules/market/components/header'
import Link from "next/link";

export default function AddressPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link 
            href="/user" 
            className="flex items-center text-[#2E8B57] hover:text-[#3DA56A] transition-colors duration-200"
          >
            {/* Icono de flecha */}
            Volver
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-8 text-center text-gray-900">
          Direcciones de entrega
        </h1>

        <AddressManager enableEdit={true} defaultView={true} />
      </div>
    </div>
  );
}