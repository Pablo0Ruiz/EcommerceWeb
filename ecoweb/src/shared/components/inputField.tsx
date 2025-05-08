import { UseFormRegister, FieldValues, FieldError, Path, RegisterOptions  } from "react-hook-form";

interface Props<T extends FieldValues> {
    id: Path<T>;
    label: string;
    type: string;
    register: UseFormRegister<T>;
    error?: FieldError;
    requiredMsg: string;
    validationRules?: RegisterOptions<T>
}

const InputField = <T extends FieldValues>({ id, label, type, register, error, requiredMsg, validationRules={} }: Props<T>) => {
    return (
        <div>
            <label htmlFor={id as string} className="block mb-1 font-medium">
                {label}
            </label>
            <input
                id={id as string}
                type={type}
                {...register(id, { required: requiredMsg ,...validationRules})}
                className="w-full px-3 py-2 border rounded"
            />
            {error && <span className="text-red-500 text-sm">{error.message}</span>}
        </div>
    )
}

export default InputField;