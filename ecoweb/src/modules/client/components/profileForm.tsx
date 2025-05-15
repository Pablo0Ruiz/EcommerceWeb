'use client'

import { useForm } from "react-hook-form";
import InputField from '@/shared/components/inputField'
import { useProfile } from '../hook/useProfile'
import { RegisterData } from "@/modules/auth/typesAuth";

export const ProfileForm = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<RegisterData>();
    const { onSubmit } = useProfile(reset)
    return (
        <div className="max-w-md mx-auto mt-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <h2 className="text-2xl font-semibold text-black">Mi cuenta</h2>

                <div className="flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-black">
                        <span className="text-3xl">👤</span>
                    </div>
                </div>
                <div className="text-black">
                <InputField
                    id="name"
                    label="Nombre"
                    register={register}
                    type="text"
                    error={errors.name}
                    requiredMsg="El nombre es obligatorio"
                    
                />
                </div>

                <div className="text-black">
                <InputField
                    id="surnames"
                    label="apellido"
                    register={register}
                    type="text"
                    error={errors.surnames}
                    requiredMsg="El apellido es obligatorio"
                />
                </div>

                <div className="text-black">
                <InputField
                    id="email"
                    label="Correo electronico"
                    register={register}
                    type="email"
                    error={errors.email}
                    requiredMsg="El email es obligatorio"
                    validationRules={{
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "El correo no es válido",
                        },
                    }}
                />
                </div>
                
                <div className="text-black">
                <InputField
                    id="phoneNumber"
                    label="Teléfono"
                    register={register}
                    type="tel"
                    error={errors.phoneNumber}
                    requiredMsg="El número es obligatorio"
                    validationRules={{
                        pattern: {
                            value: /^[0-9\s()+-]+$/,
                            message: "Teléfono no válido",
                        },
                    }}
                />
                </div>

                <button type="submit" className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                    Guardar cambios
                </button>
            </form>
        </div >
    )
}