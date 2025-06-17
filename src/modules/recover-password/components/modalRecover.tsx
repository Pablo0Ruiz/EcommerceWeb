'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { X } from "lucide-react"
import InputField from "@/shared/components/inputField"
import useRecover from "../hook/useRecover"
import { useRouter } from "next/navigation"


type FormData = {
    email: string
}

type RecoverPasswordModalProps = {
    isOpen: boolean
    onClose: () => void
}

export default function RecoverPasswordModal({ isOpen, onClose }: RecoverPasswordModalProps) {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const { onSubmit } = useRecover({setIsSubmitted})
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<FormData>()

    const email = watch("email")

    

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md relative overflow-hidden max-h-screen overflow-y-auto">
                <button
                    onClick={() => {
                        setIsSubmitted(false)
                        onClose();
                        if(isSubmitted){
                            router.push('/recover-password')
                        }
                    }}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="flex flex-col justify-center p-8">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {isSubmitted ? "Revisá tu email" : "Recuperar contraseña"}
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                            {isSubmitted
                                ? "Te enviamos un enlace para restablecer tu contraseña"
                                : "Ingresá tu email para recibir instrucciones"}
                        </p>
                    </div>

                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <InputField
                                id="email"
                                label="Email"
                                type="email"
                                register={register}
                                error={errors.email}
                                requiredMsg="El email es obligatorio"
                                className="h-12 border-gray-200 focus:border-green-500 focus:ring-green-500 w-full px-3 py-2 rounded"
                            />

                            <button
                                type="submit"
                                className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                            >
                                Enviar instrucciones
                            </button>
                        </form>
                    ) : (
                        <div className="text-center space-y-6">
                            <div className="space-y-2">
                                <p className="text-gray-600">Enviamos las instrucciones a:</p>
                                <p className="font-medium text-gray-900">{email}</p>
                            </div>
                            <p className="text-sm text-gray-500">
                                Si no recibís el mail en unos minutos, revisá la carpeta de spam
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
