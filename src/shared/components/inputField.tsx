'use client'
import { UseFormRegister, FieldValues, FieldError, Path, RegisterOptions } from "react-hook-form";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface Props<T extends FieldValues> {
    id: Path<T>;
    label: string;
    type: string;
    register: UseFormRegister<T>;
    error?: FieldError;
    requiredMsg?: string;
    validationRules?: RegisterOptions<T>;
    defaultValue?: string;
    className?: string;
}

const InputField = <T extends FieldValues>({
    id,
    label,
    type,
    register,
    error,
    requiredMsg,
    validationRules = {},
    defaultValue,
    className = "w-full px-3 py-2 border rounded"
}: Props<T>) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="space-y-1 relative">
            {label && (
                <label htmlFor={id as string} className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    id={id as string}
                    type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                    defaultValue={defaultValue}
                    className={`${className} ${type === 'password' ? 'pr-10' : ''}`}
                    {...register(id, { 
                        required: requiredMsg,
                        ...validationRules 
                    })}
                />
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                )}
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-600">{error.message}</p>
            )}
        </div>
    );
}

export default InputField;