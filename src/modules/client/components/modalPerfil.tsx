'use client';

import { useForm } from "react-hook-form";
import { useState } from "react";
import InputField from "@/shared/components/inputField";
import { useProfile } from "../hook/useProfile";

export type ChangePasswordInputs = {
    currentPassword: string;
    newPassword: string;
};

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const ChangePasswordModal = ({ isOpen, onClose }: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ChangePasswordInputs>();

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const { fetchPassword } = useProfile()

    const onSubmit = async (data: ChangePasswordInputs) => {
        setLoading(true);
        setMessage("");
        try {

            const response = await fetchPassword(data);
            if (response?.data) {
                setMessage("Contraseña cambiada correctamente.");
                reset();
                onClose();
            } else {
                setMessage(response?.message || "No se pudo cambiar la contraseña.");
            }
            setLoading(false);
        } catch (err) {
            console.error("Error al cambiar la contraseña:", err);
            setMessage("Error al cambiar la contraseña.");
            setLoading(false);
        };
    }
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30 transition-all duration-300">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fade-in scale-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Cambiar contraseña</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <InputField<ChangePasswordInputs>
                        id="currentPassword"
                        label="Contraseña actual"
                        type="password"
                        register={register}
                        error={errors.currentPassword}
                        requiredMsg="Este campo es obligatorio"
                        validationRules={{
                            minLength: { value: 8, message: "Debe tener al menos 8 caracteres" },
                            maxLength: { value: 64, message: "Debe tener como máximo 64 caracteres" },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
                                message: "Debe tener mayúscula, minúscula, número y un carácter especial",
                            },
                        }}
                        className="w-full px-3 py-2 border rounded"
                    />

                    <InputField<ChangePasswordInputs>
                        id="newPassword"
                        label="Nueva contraseña"
                        type="password"
                        register={register}
                        error={errors.newPassword}
                        requiredMsg="Este campo es obligatorio"
                        validationRules={{
                            minLength: { value: 8, message: "Debe tener al menos 8 caracteres" },
                            maxLength: { value: 64, message: "Debe tener como máximo 64 caracteres" },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
                                message: "Debe tener mayúscula, minúscula, número y un carácter especial",
                            },
                        }}
                        className="w-full px-3 py-2 border rounded"
                    />

                    {message && <p className="text-sm text-center text-blue-600">{message}</p>}

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={() => {
                                reset();
                                setMessage("");
                                onClose();
                            }}
                            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-4 py-2 rounded-md text-white ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} disabled:opacity-50 flex items-center justify-center`}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                    </svg>
                                    Guardando...
                                </span>
                            ) : (
                                "Guardar"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

};

export default ChangePasswordModal;