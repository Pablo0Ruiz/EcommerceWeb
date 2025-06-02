<<<<<<< HEAD
"use client";
import { useEffect } from "react";
import { Address } from "@/modules/auth/typesAuth";
import { useForm } from "react-hook-form";
=======
'use client'
import { useEffect } from 'react';
import { Address } from '@/modules/auth/typesAuth';
import { useForm } from 'react-hook-form';
>>>>>>> 48f5ea6 (Refactor address and order management components; integrate new hooks for profile and order fetching, enhance error handling, and update address structure)

interface EditAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  address: Address | null;
  onSave: (address: Address) => void;
}

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
    if (address) {
      reset({
        nombre: address.nombre,
        street: address.street,
        number: address.number,
        postal: address.postal,
        city: address.city,
        province: address.province,
<<<<<<< HEAD
        isDefault: address.isDefault || false,
      });
    } else {
      reset({
        nombre: "",
        street: "",
        number: "",
        postal: "",
        city: "",
        province: "",
        isDefault: false,
=======
        isDefault: address.isDefault || false
      });
    } else {
      reset({
        nombre: '',
        street: '',
        number: '',
        postal: '',
        city: '',
        province: '',
        isDefault: false
>>>>>>> 48f5ea6 (Refactor address and order management components; integrate new hooks for profile and order fetching, enhance error handling, and update address structure)
      });
    }
  }, [address, reset]);

  const onSubmit = (data: Address) => {
    //aqui tiene que ir la llamada del put con la estrucura de Address que seria esta de ejemplo

    //     PUT http://localhost:8000/api/user/profile
    // Content-Type: application/json
    // Authorization: Bearer
    // {
    //   "name": "Nuevo ",
    //   "address": [
    //     {
    //       "name": "Casa Principal",
    //       "street": "Calle Gran Vía",
    //       "number": "28",
    //       "postal": "28013",
    //       "city": "Madrid",
    //       "province": "Madrid",
    //       "isDefault": true
    //     }
    //   ]
    // }
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
          <div>
<<<<<<< HEAD
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de la dirección*
            </label>
            <input
              {...register("nombre", { required: "Este campo es obligatorio" })}
              className="w-full px-3 py-2 border rounded text-gray-900"
              placeholder="Ej: Casa, Trabajo..."
            />
            {errors.nombre && (
              <p className="text-red-500 text-sm mt-1">
                {errors.nombre.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Calle*
            </label>
=======
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la dirección*</label>
            <input
              {...register('nombre', { required: 'Este campo es obligatorio' })}
              className="w-full px-3 py-2 border rounded text-gray-900"
              placeholder="Ej: Casa, Trabajo..."
            />
            {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Calle*</label>
>>>>>>> 48f5ea6 (Refactor address and order management components; integrate new hooks for profile and order fetching, enhance error handling, and update address structure)
            <input
              {...register("street", { required: "Este campo es obligatorio" })}
              className="w-full px-3 py-2 border rounded text-gray-900"
              placeholder="Ej: Calle Mayor"
            />
            {errors.street && (
              <p className="text-red-500 text-sm mt-1">
                {errors.street.message}
              </p>
            )}
          </div>

          <div>
<<<<<<< HEAD
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Número*
            </label>
            <input
              {...register("number", { required: "Este campo es obligatorio" })}
              className="w-full px-3 py-2 border rounded text-gray-900"
              placeholder="Ej: 12"
            />
            {errors.number && (
              <p className="text-red-500 text-sm mt-1">
                {errors.number.message}
              </p>
            )}
=======
            <label className="block text-sm font-medium text-gray-700 mb-1">Número*</label>
            <input
              {...register('number', { required: 'Este campo es obligatorio' })}
              className="w-full px-3 py-2 border rounded text-gray-900"
              placeholder="Ej: 12"
            />
            {errors.number && <p className="text-red-500 text-sm mt-1">{errors.number.message}</p>}
>>>>>>> 48f5ea6 (Refactor address and order management components; integrate new hooks for profile and order fetching, enhance error handling, and update address structure)
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
<<<<<<< HEAD
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ciudad*
              </label>
=======
              <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad*</label>
>>>>>>> 48f5ea6 (Refactor address and order management components; integrate new hooks for profile and order fetching, enhance error handling, and update address structure)
              <input
                {...register("city", { required: "Este campo es obligatorio" })}
                className="w-full px-3 py-2 border rounded text-gray-900"
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>
            <div>
<<<<<<< HEAD
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Código postal*
              </label>
              <input
                {...register("postal", {
                  required: "Este campo es obligatorio",
                })}
                className="w-full px-3 py-2 border rounded text-gray-900"
              />
              {errors.postal && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.postal.message}
                </p>
              )}
=======
              <label className="block text-sm font-medium text-gray-700 mb-1">Código postal*</label>
              <input
                {...register('postal', { required: 'Este campo es obligatorio' })}
                className="w-full px-3 py-2 border rounded text-gray-900"
              />
              {errors.postal && <p className="text-red-500 text-sm mt-1">{errors.postal.message}</p>}
>>>>>>> 48f5ea6 (Refactor address and order management components; integrate new hooks for profile and order fetching, enhance error handling, and update address structure)
            </div>
          </div>

          <div>
<<<<<<< HEAD
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Provincia*
            </label>
            <input
              {...register("province", {
                required: "Este campo es obligatorio",
              })}
              className="w-full px-3 py-2 border rounded text-gray-900"
            />
            {errors.province && (
              <p className="text-red-500 text-sm mt-1">
                {errors.province.message}
              </p>
            )}
=======
            <label className="block text-sm font-medium text-gray-700 mb-1">Provincia*</label>
            <input
              {...register('province', { required: 'Este campo es obligatorio' })}
              className="w-full px-3 py-2 border rounded text-gray-900"
            />
            {errors.province && <p className="text-red-500 text-sm mt-1">{errors.province.message}</p>}
>>>>>>> 48f5ea6 (Refactor address and order management components; integrate new hooks for profile and order fetching, enhance error handling, and update address structure)
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="defaultAddress"
<<<<<<< HEAD
              {...register("isDefault")}
              className="h-4 w-4 text-[#2E8B57] focus:ring-[#2E8B57] border-gray-300 rounded"
            />
            <label
              htmlFor="defaultAddress"
              className="ml-2 block text-sm text-gray-900"
            >
=======
              {...register('isDefault')}
              className="h-4 w-4 text-[#2E8B57] focus:ring-[#2E8B57] border-gray-300 rounded"
            />
            <label htmlFor="defaultAddress" className="ml-2 block text-sm text-gray-900">
>>>>>>> 48f5ea6 (Refactor address and order management components; integrate new hooks for profile and order fetching, enhance error handling, and update address structure)
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