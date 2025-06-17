import Image from "next/image"

export const SesionInvited = ({ onClose }: { onClose: () => void }) => {
    return (
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="w-6 h-6 bg-white rotate-45 border-l border-t border-gray-200"></div>
            </div>

            <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
                onClick={onClose}
                aria-label="Cerrar"
            >
                ×
            </button>

            <div className="p-8 pt-12 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Parece que no has iniciado sesión</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                    ¡Entrá a tu cuenta o registrate para poder hacer un seguimiento de tus productos y no perderte ninguna oferta top!
                </p>
                <div className="space-y-4 mb-8">
                    <button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-full transition-colors">
                        Iniciar sesión
                    </button>
                    <button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-full transition-colors">
                        Registrarse
                    </button>
                </div>

                <div className="flex justify-center">
                    <Image width={200} height={200} src="/logo.png" alt="Matezone Logo" className="w-30 h-30 object-contain" />
                </div>
            </div>
        </div>
    )
}
