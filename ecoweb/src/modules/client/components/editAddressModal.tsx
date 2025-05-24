'use client'
import { useEffect } from 'react';
import { Address } from "@/modules/client/components/typesClient";
import { useForm } from 'react-hook-form';

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
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Address>();

  useEffect(() => {
    if (address) {
      reset(address);
    } else {
      reset({
        id: '',
        name: '',
        street: '',
        floor: '',
        city: '',
        postalCode: '',
        country: 'España',
        phone: '',
        isDefault: false
      });
    }
  }, [address, reset]);

  const onSubmit = (data: Address) => {
    onSave(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-100 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-900">
          {address ? 'Editar dirección' : 'Añadir nueva dirección'}
        </h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
            <input
              {...register('name', { required: 'Este campo es obligatorio' })}
              className="w-full px-3 py-2 border rounded text-gray-900"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Calle y número</label>
            <input
              {...register('street', { required: 'Este campo es obligatorio' })}
              className="w-full px-3 py-2 border rounded text-gray-900"
            />
            {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Piso y puerta</label>
            <input
              {...register('floor')}
              className="w-full px-3 py-2 border rounded text-gray-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
              <input
                {...register('city', { required: 'Este campo es obligatorio' })}
                className="w-full px-3 py-2 border rounded text-gray-900"
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Código postal</label>
              <input
                {...register('postalCode', { required: 'Este campo es obligatorio' })}
                className="w-full px-3 py-2 border rounded text-gray-900"
              />
              {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">País</label>
            <select
              {...register('country', { required: 'Este campo es obligatorio' })}
              className="w-full px-3 py-2 border rounded text-gray-900"
            >
              <option value="España">España</option>
              <option value="Portugal">Portugal</option>
              <option value="Francia">Francia</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
            <input
              {...register('phone', { required: 'Este campo es obligatorio' })}
              className="w-full px-3 py-2 border rounded text-gray-900"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
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
              className="px-4 py-2 bg-[#2E8B57] rounded-md text-sm font-medium text-white hover:bg-[#3f7456]"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
