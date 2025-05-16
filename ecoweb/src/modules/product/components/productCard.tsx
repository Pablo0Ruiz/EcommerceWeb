import { Props } from "../typesProduct";
import Image from "next/image";

const ProductCards: React.FC<Props> = ({ producto, add, remove, disminuirItem }) => {
    return (
        <div className="flex flex-col sm:flex-row gap-4 p-4 border-b border-gray-200 last:border-b-0">
            {/* Imagen del producto */}
            <div className="w-full sm:w-24 h-24 relative">
                <Image
                    src={producto.imagenUrl}
                    alt={producto.nombre}
                    fill
                    className="object-cover rounded-lg"
                />
            </div>

            {/* Detalles del producto */}
            <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-800">{producto.nombre}</h2>
                <p className="text-gray-600 text-sm">{producto.descripcion}</p>
                
                {/* Precio y stock */}
                <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="font-bold text-gray-900">
                        {producto.precio}€
                    </span>
                    {producto.descuento && (
                        <span className="text-sm line-through text-gray-500">
                            {producto.precioOriginal}€
                        </span>
                    )}
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        {producto.stock > 5 ? "En stock" : "Quedan pocos"}
                    </span>
                </div>
            </div>

            {/* Controles de cantidad */}
            <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                        onClick={() => disminuirItem(producto.id)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    >
                        -
                    </button>
                    <span className="px-3 py-1 text-gray-800">
                        {producto.cantidad || 0}
                    </span>
                    <button
                        onClick={() => add(producto)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    >
                        +
                    </button>
                </div>
                <button
                    onClick={() => remove(producto.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
};

export default ProductCards;