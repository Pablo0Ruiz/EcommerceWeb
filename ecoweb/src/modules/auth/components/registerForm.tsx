'use client'


import { useForm } from "react-hook-form";
import { useRegister } from "../hook/useRegister";
import InputField from '@/shared/components/inputField'
import { RegisterData } from "../typesAuth";

const RegisterForm = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<RegisterData>();
    const { onSubmit } = useRegister(reset);

    return (
        <div className="max-w-md mx-auto mt-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <h2 className="text-2xl font-semibold">Iniciar sesion</h2>

                <InputField
                    id="nombre"
                    label="Nombre"
                    register={register}
                    type="text"
                    error={errors.email}
                    requiredMsg="El nombre es obligatorio"
                />

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

                <InputField
                    id="password"
                    label="Contraseña"
                    register={register}
                    type="password"
                    error={errors.password}
                    requiredMsg="La contraseña es obligatoria"
                    validationRules={{
                        pattern: {
                            value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                            message:
                                "Debe tener al menos 1 mayúscula, 1 número, 1 carácter especial y mínimo 8 caracteres",
                        },
                    }}
                />

                <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Registrate
                </button>
            </form>
        </div >
    )
}


export default RegisterForm 