'use client';

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Header from '../../components/headers';
import Main from '../../components/main';
import Footer from '../../components/footer';
import InputField from '@/shared/components/inputField';
import Image from 'next/image';
import bgAdmin from "@/../public/bgAdmin.jpg";

type FormData = {
    name: string;
    surnames: string;
    email: string;
    password: string;
    phoneNumber: string;
};

export default function CreateUserPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const router = useRouter();

    const onSubmit = async (data: FormData) => {

        const response = await fetch('http://localhost:8000/api/user/register', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error(errorData);
            throw new Error(errorData.message || 'Error al registrar el usuario');
        }

        router.push("/admin/users");
    };

    return (
        <div className="flex flex-col min-h-screen relative">

            <div className="fixed inset-0 -z-10">
                <Image
                    src={bgAdmin}
                    alt="Fondo administrativo"
                    fill
                    className="object-cover"
                    quality={100}
                    priority
                    style={{ objectPosition: "center" }}
                />
                <div className="absolute inset-0 bg-[#D9D9D9]/20 backdrop-blur-sm" />
            </div>

            <Header />

            <Main>
                <div className="max-w-md mx-auto bg-white/30 backdrop-blur-md p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-bold mb-4 text-center">Crear Nuevo Usuario</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <InputField<FormData>
                            id="name"
                            label="Nombre"
                            type="text"
                            register={register}
                            error={errors.name}
                            requiredMsg="El nombre es obligatorio"
                        />
                        <InputField<FormData>
                            id="surnames"
                            label="Apellidos"
                            type="text"
                            register={register}
                            error={errors.surnames}
                            requiredMsg="Los apellidos son obligatorios"
                        />

                        <InputField<FormData>
                            id="email"
                            label="Email"
                            type="email"
                            register={register}
                            error={errors.email}
                            requiredMsg="El email es obligatorio"
                            validationRules={{
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Email inválido",
                                },
                            }}
                        />

                        <InputField<FormData>
                            id="password"
                            label="Contraseña"
                            type="password"
                            register={register}
                            error={errors.password}
                            requiredMsg="La contraseña es obligatoria"
                        />
                        <InputField<FormData>
                            id="phoneNumber"
                            label="Teléfono"
                            type="text"
                            register={register}
                            error={errors.phoneNumber}
                            requiredMsg="El teléfono es obligatorio"
                            validationRules={{
                                pattern: {
                                    value: /^[0-9+\s()-]{7,20}$/,
                                    message: "Teléfono inválido",
                                },
                            }}
                        />
                        <button
                            type="submit"
                            className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
                        >
                            Crear Usuario
                        </button>
                    </form>
                </div>
            </Main>

            <Footer />
        </div>
    );
}
