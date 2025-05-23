// shared/components/inputField.tsx
'use client'
import { UseFormRegister, FieldValues, FieldError, Path, RegisterOptions } from "react-hook-form";

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
    return (
        <div className="space-y-1">
            {label && (
                <label htmlFor={id as string} className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <input
                id={id as string}
                type={type}
                defaultValue={defaultValue}
                className={className}
                {...register(id, { 
                    required: requiredMsg,
                    ...validationRules 
                })}
            />
            {error && (
                <p className="mt-1 text-sm text-red-600">{error.message}</p>
            )}
        </div>
    );
}

export default InputField;