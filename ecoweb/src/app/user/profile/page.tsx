'use client'
import Link from 'next/link'
import { ProfileForm } from '@/modules/client/components/profileForm'
import { Header } from '@/modules/market/components/header'

const ProfilePage = () => {

  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 flex justify-between items-center">
          <Link 
            href="/user" 
            className="flex items-center text-[#2E8B57] hover:text-[#3DA56A] transition-colors duration-200"
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Volver
          </Link>
          
          <h1 className="text-2xl font-bold text-gray-800 hidden md:block">
            Configuración de perfil
          </h1>
        </div>

        {/* Tarjeta del formulario */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          {/* Encabezado de la tarjeta */}
          <div className="bg-[#2E8B57] px-6 py-4">
            <h2 className="text-xl font-semibold text-white">
              Edita tu información personal
            </h2>
            <p className="text-[#C1F7D5] text-sm mt-1">
              Actualiza tus datos para una mejor experiencia
            </p>
          </div>
          
          <div className="p-6 md:p-8">
            <ProfileForm />
          </div>
          

          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Tus datos están protegidos según nuestra{' '}
              <Link href="/privacy" className="text-[#2E8B57] hover:underline">
                política de privacidad
              </Link>
            </p>
          </div>
        </div>
      </main>
      
      {/* Footer opcional */}
      <footer className="bg-[#2E8B57] mt-12 py-6 text-white text-center">
        <div className="container mx-auto px-4">
          <p className="text-sm">
            © {new Date().getFullYear()} MateZone - Todos los derechos reservados
          </p>
        </div>
      </footer>
    </div>
  )
}

export default ProfilePage