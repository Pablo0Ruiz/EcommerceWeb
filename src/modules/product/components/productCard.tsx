"use client";

import Image from "next/image";
import { useCartStore } from "@/modules/cart/hook/cart";

type ProductCardProduct = {
  id?: string;
  _id?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  attributes?: { nombre: string; valor: string }[];
  quantity: number;
  selectedShipping?: string;
};

interface ProductCardPropsFixed {
  producto: ProductCardProduct;
  add: (id: string) => void;
  remove: (id: string) => void;
  disminuirItem: (id: string) => void;
}

const ProductCards: React.FC<ProductCardPropsFixed> = ({
  producto,
  add,
  remove,
  disminuirItem,
}) => {
  const { shippingOptions, setProductShipping } = useCartStore();
  const isOutOfStock = producto.quantity >= producto.stock;

  return (
    <div className="relative flex flex-col sm:flex-row gap-4 p-4 border-b border-gray-200 last:border-b-0 bg-white rounded-lg shadow-sm">
      <div className="w-full sm:w-24 h-24 relative">
        <Image
          src={producto.images?.[0] || "/placeholder-product.png"}
          alt={producto.name}
          fill
          className="object-cover rounded-lg"
          priority
        />
      </div>

      {/* Info del producto */}
      <div className="flex-1 flex flex-col gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {producto.name}
          </h2>
          <p className="text-gray-600 text-sm">{producto.description}</p>
        </div>

        {/* Precio y stock */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold text-gray-900">
            {producto.price.toFixed(2)}€
          </span>
          {/* If you want to show original price with discount, add logic here */}
          <span
            className={`text-xs px-2 py-1 rounded ${producto.stock > 5
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
              }`}
          >
            {producto.stock > 5 ? "En stock" : "Quedan pocos"}
          </span>
        </div>

        {/* Envío */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">
            Método de envío:
          </h3>
          <div className="flex flex-col gap-1">
            {shippingOptions.map((option) => (
              <label key={option.method} className="flex items-center text-sm text-gray-700">
                <input
                  type="radio"
                  name={`shipping-${producto.id ?? producto._id}`}
                  checked={(producto.selectedShipping || "standard") === option.method}
                  onChange={() => setProductShipping(producto.id ?? producto._id ?? "", option.method)}
                  className="mr-2"
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>

        {/* Especificaciones */}
        {producto.attributes && producto.attributes.length > 0 && (
          <div className="mt-1">
            <h3 className="text-sm font-medium text-gray-700">
              Especificaciones:
            </h3>
            <ul className="text-xs text-gray-500">
              {producto.attributes.map((attr, i) => (
                <li key={i}>{attr.nombre}: {attr.valor}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Controles */}
        <div className="flex flex-col sm:flex-row items-center gap-2 self-center sm:self-start">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => disminuirItem(producto.id ?? producto._id ?? "")}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
              disabled={isOutOfStock}
            >
              -
            </button>
            <span className="px-3 py-1 text-gray-800">{producto.quantity || 0}</span>
            <button
              onClick={() => add(producto.id ?? producto._id ?? "")}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
              disabled={isOutOfStock}
            >
              +
            </button>
          </div>
          <button
            onClick={() => remove(producto.id ?? producto._id ?? "")}
            className="absolute bottom-4 right-4 text-red-600 hover:text-red-800"
          >
            <Image
              src="/trash.png"
              alt="Eliminar"
              width={20}
              height={20}
              className="hover:opacity-80"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCards;
