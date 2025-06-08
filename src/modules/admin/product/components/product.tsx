'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import InputField from '@/shared/components/inputField';
import Header from '../../components/headers';
import Main from '../../components/main';
import Footer from '../../components/footer';
import Image from 'next/image';
import bgAdmin from "@/../public/mate2.webp";

type Attribute = {
    nombre: string;
    valor: string;
};

type FormData = {
    name: string;
    description: string;
    price: number;
    discount: number;
    stock: number;
    category: string;
    attributes: Attribute[];
};

export default function CreateProductPage() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            attributes: [{ nombre: '', valor: '' }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'attributes',
    });

    const router = useRouter();

    const onSubmit = async (data: FormData) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/productos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error('Error al crear producto');
            router.push('/admin/products');
        } catch (err) {
            console.error(err);
            alert('Error al crear producto');
        }
    };

    return (
        <div className="relative flex flex-col min-h-screen">

            <div className="fixed inset-0 -z-10">
                <Image
                    src={bgAdmin}
                    alt="Background administrativo"
                    fill
                    className="object-cover"
                    quality={100}
                    priority
                    style={{ objectPosition: 'center' }}
                />
                <div className="absolute inset-0 bg-[#D9D9D9]/20" />

            </div>

            <Header />
            <Main>
                <h2 className="text-xl font-bold mb-4">Crear Nuevo Producto</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl p-6 rounded-xl bg-white/30 backdrop-blur-md shadow-lg">
                    <InputField<FormData>
                        id="name"
                        label="Nombre"
                        type="text"
                        register={register}
                        error={errors.name}
                        requiredMsg="El nombre es obligatorio"
                    />

                    <InputField<FormData>
                        id="description"
                        label="Descripción"
                        type="text"
                        register={register}
                        error={errors.description}
                        requiredMsg="La descripción es obligatoria"
                    />

                    <InputField<FormData>
                        id="price"
                        label="Precio"
                        type="number"
                        register={register}
                        error={errors.price}
                        requiredMsg="El precio es obligatorio"
                    />

                    <InputField<FormData>
                        id="discount"
                        label="Descuento (%)"
                        type="number"
                        register={register}
                        error={errors.discount}
                    />

                    <InputField<FormData>
                        id="stock"
                        label="Stock"
                        type="number"
                        register={register}
                        error={errors.stock}
                        requiredMsg="El stock es obligatorio"
                    />

                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Categoría
                        </label>
                        <select
                            id="category"
                            {...register('category', { required: 'La categoría es obligatoria' })}
                            className="w-full px-3 py-2 border rounded"
                            defaultValue=""
                        >
                            <option value="" disabled>Seleccioná una categoría</option>
                            <option value="yerbas">Yerbas</option>
                            <option value="mates">Mates</option>
                            <option value="termos">Termos</option>
                        </select>
                        {errors.category && (
                            <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <p className="font-medium">Atributos</p>
                        {fields.map((field, index) => (
                            <div key={field.id} className="grid grid-cols-2 gap-2 items-start">
                                <input
                                    placeholder="Nombre"
                                    {...register(`attributes.${index}.nombre` as const, { required: true })}
                                    className="w-full px-3 py-2 border rounded"
                                />
                                <input
                                    placeholder="Valor"
                                    {...register(`attributes.${index}.valor` as const, { required: true })}
                                    className="w-full px-3 py-2 border rounded"
                                />
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="text-red-600 col-span-2 text-sm"
                                >
                                    Eliminar atributo
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => append({ nombre: '', valor: '' })}
                            className="text-green-700 text-sm"
                        >
                            + Agregar atributo
                        </button>
                    </div>

                    <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded">
                        Crear Producto
                    </button>
                </form>
            </Main>
            <Footer />
        </div>
    );
}
