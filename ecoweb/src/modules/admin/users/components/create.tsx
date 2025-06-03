'use client'

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Header from '../../components/headers';
import Main from '../../components/main';
import Footer from '../../components/footer';
import InputField from '@/shared/components/inputField';

type FormData = {
    name: string;
    email: string;
    password: string
    rol: "user" | "seller";
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
            const errorData = await response.json()
            console.error(errorData)
            throw new Error(errorData.message || 'Error al registrar el usuario')
        }
        router.push("/admin/users");
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <Main>
                <h2 className="text-xl font-bold mb-4">Crear Nuevo Usuario</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
                    <InputField<FormData>
                        id="name"
                        label="Nombre"
                        type="text"
                        register={register}
                        error={errors.name}
                        requiredMsg="El nombre es obligatorio"
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
                        error={errors.email}
                        requiredMsg="El email es obligatorio"
                        validationRules={{
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Email inválido",
                            },
                        }}
                    />
                    <div className="space-y-1">
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                            Rol
                        </label>
                        <select
                            id="rol"
                            {...register("rol", { required: "El rol es obligatorio" })}
                            className="w-full px-3 py-2 border rounded"
                        >
                            <option value="">Seleccioná un rol</option>
                            <option value="user">User</option>
                            <option value="seller">Seller</option>
                        </select>
                        {errors.rol && (
                            <p className="mt-1 text-sm text-red-600">{errors.rol.message}</p>
                        )}
                    </div>
                    <button type="submit" className="bg-green-700 text-black px-4 py-2 rounded">
                        Crear Usuario
                    </button>
                </form>
            </Main>
            <Footer />
        </div>
    );
}
