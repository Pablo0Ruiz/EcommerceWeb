"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useEmailRegister } from "@/modules/auth/hook/useEmailRegister";
import { useRouter } from "next/navigation";


export interface EmailUser {
    _id: string;
    email: string;

}

export interface SuccessData {
    token: string;
    user: EmailUser;
}

export interface EmailModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialEmail?: string;
    onSuccess?: (data: SuccessData) => void;
    redirectOnSuccess?: string;
}

export const EmailModal: React.FC<EmailModalProps> = ({
    isOpen,
    onClose,
    initialEmail = "",
    onSuccess,
    redirectOnSuccess,
}) => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<{ email: string }>();
    const { registerEmail, isLoading, error } = useEmailRegister();

    useEffect(() => {
        reset({ email: initialEmail });
    }, [initialEmail, reset]);

    const onSubmit = async (formData: { email: string }) => {
        try {
            console.log('email onsubmit:',formData)
            const result = await registerEmail(formData.email);
            if (result) {
                onSuccess?.(result);
                if (redirectOnSuccess) {
                    router.push(redirectOnSuccess);
                }
            }
        } catch (err) {
            console.error("Error en registro:", err);
        } finally {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="email-modal-title"
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                <h2 id="email-modal-title" className="text-xl font-bold mb-4 text-gray-900">
                    Introducir correo electrónico
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="email-input" className="block text-sm font-medium text-gray-700 mb-1">
                            Correo electrónico*
                        </label>
                        <input
                            id="email-input"
                            type="email"
                            {...register("email", {
                                required: "Este campo es obligatorio",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Correo electrónico inválido"
                                }
                            })}
                            className="w-full px-3 py-2 border rounded text-gray-900"
                            placeholder="ejemplo@dominio.com"
                            disabled={isLoading || isSubmitting}
                            aria-invalid={errors.email ? "true" : "false"}
                            aria-describedby="email-error"
                        />
                        {errors.email && (
                            <p id="email-error" className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                        {error && (
                            <p className="text-red-500 text-sm mt-1">
                                {typeof error === 'string' ? error : 'Error al registrar el email'}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-gray-800"
                            disabled={isLoading || isSubmitting}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400"
                            disabled={isLoading || isSubmitting}
                            aria-disabled={isLoading || isSubmitting}
                        >
                            {isLoading || isSubmitting ? 'Registrando...' : 'Continuar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};