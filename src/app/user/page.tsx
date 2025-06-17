import Link from "next/link";
import Image from "next/image";
import { Header } from "@/modules/market/components/header";
import miCuenta from "@/../public/mi_cuenta.png";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-90">
      <Header />

      <div className="fixed inset-0 -z-10">
        <Image
          src={miCuenta}
          alt="Background"
          fill
          className="object-cover"
          quality={100}
          priority
        />
      </div>

      <main className="pl-20 pr-4 py-4 max-w-6xl">
        <h2 className="text-2xl font-bold mb-6 text-black">Mi cuenta</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-start">

          <Link href="/user/orders">
            <div className="bg-white rounded-lg shadow hover:shadow-md transition border cursor-pointer p-4 flex items-start gap-4 min-h-[160px]">
              <div className="bg-green-600 text-white rounded-full p-4 text-2xl">📦</div>
              <div className="flex flex-col justify-center">
                <h3 className="text-md font-bold mb-1 text-black">Mis pedidos</h3>
                <p className="text-gray-600 text-sm">
                  Revisa, cancela o modifica tus pedidos
                </p>
              </div>
            </div>
          </Link>

          <Link href="/user/profile">
            <div className="bg-white rounded-lg shadow hover:shadow-md transition border cursor-pointer p-4 flex items-start gap-4 min-h-[160px]">
              <div className="bg-green-600 text-white rounded-full p-4 text-2xl">👤</div>
              <div className="flex flex-col justify-center">
                <h3 className="text-md font-bold mb-1 text-black">Mi perfil</h3>
                <p className="text-gray-600 text-sm">
                  Edita tus datos personales o la contraseña
                </p>
              </div>
            </div>
          </Link>

          <Link href="/user/addresses">
            <div className="bg-white rounded-lg shadow hover:shadow-md transition border cursor-pointer p-4 flex items-start gap-4 min-h-[160px]">
              <div className="bg-green-600 text-white rounded-full p-4 text-2xl">🗺️</div>
              <div className="flex flex-col justify-center">
                <h3 className="text-md font-bold mb-1 text-black">Direcciones</h3>
                <p className="text-gray-600 text-sm">
                  Modifica, añade o elimina tus direcciones de entrega
                </p>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
