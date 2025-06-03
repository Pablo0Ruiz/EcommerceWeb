'use client'

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "@/shared/components/inputField";
import { useProfile } from "../hook/useProfile";
import { RegisterData } from "@/modules/auth/typesAuth";

export const ProfileForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty },
        watch
    } = useForm<RegisterData>();

    const { fetchProfile, updateProfile } = useProfile();
    const [loading, setLoading] = useState(true);
    const [editingField, setEditingField] = useState<keyof RegisterData | null>(null);

    useEffect(() => {
    const loadUser = async () => {
        try {
            const data = await fetchProfile();
            reset(data);
        } catch (error) {
            console.error("Error cargando perfil", error);
        } finally {
            setLoading(false);
        }
    };
    loadUser();
}, [reset,fetchProfile]); 

    const toggleEdit = (field: keyof RegisterData) => {
        setEditingField(prev => (prev === field ? null : field));
    };

    const onSubmit = async (data: RegisterData) => {
        await updateProfile(data);
        setEditingField(null);
        const updateUser = await fetchProfile()
        reset(updateUser);
    };

    const formValues = watch();

    if (loading) {
        return <p className="p-6 text-gray-500">Cargando perfil...</p>;
    }

    return (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-800">Mi cuenta</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="p-6 flex flex-col items-center border-b border-gray-200">
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mb-4">
                        <span className="text-3xl">👤</span>
                    </div>
                    <button
                        type="button"
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                        Cambiar foto
                    </button>
                </div>

                {(["name", "surnames", "email", "phoneNumber"] as (keyof RegisterData)[]).map((field) => (
                    <div className="p-6 border-b border-gray-200" key={field}>
                        <div className="flex justify-between items-start mb-2">
                            <label htmlFor={field} className="block text-sm font-medium text-gray-700 capitalize">
                                {field === "surnames" ? "Apellido" :
                                    field === "phoneNumber" ? "Teléfono" :
                                        field === "email" ? "Correo electrónico" :
                                            "Nombre"}
                            </label>
                            <button
                                type="button"
                                onClick={() => toggleEdit(field)}
                                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                            >
                                {editingField === field ? 'Cancelar' : 'Modificar'}
                            </button>
                        </div>

                        {editingField === field ? (
                            <InputField<RegisterData>
                                id={field}
                                label=""
                                register={register}
                                type={field === "email" ? "email" : field === "phoneNumber" ? "tel" : "text"}
                                error={errors[field]}
                                defaultValue={formValues[field]}
                                requiredMsg={`El ${field === "surnames" ? "apellido" : field} es obligatorio`}
                                validationRules={field === "email" ? {
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "El correo no es válido",
                                    }
                                } : field === "phoneNumber" ? {
                                    pattern: {
                                        value: /^[0-9\s()+-]+$/,
                                        message: "Teléfono no válido",
                                    }
                                } : undefined}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            />
                        ) : (
                            <p className="text-gray-900">{formValues[field]}</p>
                        )}
                    </div>
                ))}

                {isDirty && (
                    <div className="p-6 bg-gray-50 border-t border-gray-200">
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                        >
                            Guardar cambios
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};
