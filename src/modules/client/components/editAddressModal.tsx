"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Address } from "@/modules/auth/typesAuth";
import InputField from "@/shared/components/inputField";

interface EditAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  address: Address | null;
  onSave: (address: Address) => void;
}

const defaultValues: Address = {
  nombre: "",
  street: "",
  number: "",
  postal: "",
  city: "",
  province: "",
  isDefault: false,
};

export const EditAddressModal: React.FC<EditAddressModalProps> = ({
  isOpen,
  onClose,
  address,
  onSave,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Address>();

  useEffect(() => {
    reset(address ?? defaultValues);
  }, [address, reset]);

  const onSubmit = (data: Address) => {
    onSave(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-900">
          {address ? "Editar dirección" : "Añadir nueva dirección"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            id="nombre"
            label="Nombre de la dirección*"
            type="text"
            register={register}
            error={errors.nombre}
            requiredMsg="Este campo es obligatorio"
          />

          <InputField
            id="street"
            label="Calle*"
            type="text"
            register={register}
            error={errors.street}
            requiredMsg="Este campo es obligatorio"
          />

          <InputField
            id="number"
            label="Número*"
            type="text"
            register={register}
            error={errors.number}
            requiredMsg="Este campo es obligatorio"
          />

          <div className="grid grid-cols-2 gap-4">
            <InputField
              id="city"
              label="Ciudad*"
              type="text"
              register={register}
              error={errors.city}
              requiredMsg="Este campo es obligatorio"
            />

            <InputField
              id="postal"
              label="Código postal*"
              type="text"
              register={register}
              error={errors.postal}
              requiredMsg="Este campo es obligatorio"
            />
          </div>

          <InputField
            id="province"
            label="Provincia*"
            type="text"
            register={register}
            error={errors.province}
            requiredMsg="Este campo es obligatorio"
          />

          <div className="flex items-center">
            <input
              type="checkbox"
              id="defaultAddress"
              {...register("isDefault")}
              className="h-4 w-4 text-[#2E8B57] focus:ring-[#2E8B57] border-gray-300 rounded"
            />
            <label htmlFor="defaultAddress" className="ml-2 block text-sm text-gray-900">
              Establecer como dirección principal
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#2E8B57] rounded-md text-sm font-medium text-white hover:bg-[#3DA56A]"
            >
              Guardar dirección
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
