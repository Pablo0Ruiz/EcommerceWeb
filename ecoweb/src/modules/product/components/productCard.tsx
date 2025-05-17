import Image from "next/image";
import { ProductCardProps } from "../productProps";
import { useCartStore } from "@/modules/cart/hook/cart";
import { CartItem } from "@/modules/cart/typesCart";


const ProductCards: React.FC<ProductCardProps> = ({
  producto,
  add,
  remove,
  disminuirItem,
}) => {
  const { shippingOptions, setProductShipping } = useCartStore();
  const cartItem = producto as CartItem;

  const currentShipping = shippingOptions.find(
    (o) => o.method === (cartItem.selectedShipping || "standard")
  )!;

  const precioOriginal =
    producto.discount > 0
      ? (producto.price / (1 - producto.discount / 100)).toFixed(2)
      : producto.price.toFixed(2);

  return (
    <div className="relative flex flex-col sm:flex-row gap-4 p-4 border-b border-gray-200 last:border-b-0 bg-white rounded-lg shadow-sm">
      {/* Imagen del producto */}
      <div className="w-full sm:w-24 h-24 relative">
        <Image
          src={producto.images[0]}
          alt={producto.name}
          fill
          className="object-cover rounded-lg"
          priority
        />
      </div>

      {/* Contenedor principal de información */}
      <div className="flex-1 flex flex-col gap-3">
        {/* Información básica del producto */}
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
          {producto.discount > 0 && (
            <span className="text-sm line-through text-gray-500">
              {precioOriginal}€
            </span>
          )}
          <span
            className={`text-xs px-2 py-1 rounded ${
              producto.stock > 5
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {producto.stock > 5 ? "En stock" : "Quedan pocos"}
          </span>
        </div>

        {/* Opciones de envío */}
        <div className="mt-2">
          <h3 className="text-sm font-medium text-gray-700 mb-1">
            Método de envío:
          </h3>
          <div className="flex flex-col gap-2">
            {shippingOptions.map((option) => (
              <div key={option.method} className="flex items-center">
                <input
                  type="radio"
                  id={`${producto.id}-${option.method}`}
                  name={`shipping-${producto.id}`}
                  checked={currentShipping.method === option.method}
                  onChange={() =>
                    setProductShipping(producto.id, option.method)
                  }
                  className="mr-2"
                />
                <label
                  htmlFor={`${producto.id}-${option.method}`}
                  className="text-sm text-gray-700"
                >
                  {option.label} {option.price > 0 && `(+${option.price}€)`}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Mostrar atributos si existen */}
        {producto.attributes.length > 0 && (
          <div className="mt-1">
            <h3 className="text-sm font-medium text-gray-700">
              Especificaciones:
            </h3>
            <ul className="text-xs text-gray-500">
              {producto.attributes.map((attr, index) => (
                <li key={index}>
                  {attr.nombre}: {attr.valor}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Controles de cantidad */}
      <div className="flex flex-col sm:flex-row items-center gap-2 self-center sm:self-start">
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={() => disminuirItem(producto.id || (producto._id as string))}
            className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
            disabled={!producto.quantity || producto.quantity <= 0}
          >
            -
          </button>
          <span className="px-3 py-1 text-gray-800">
            {producto.quantity || 0}
          </span>
          <button
            onClick={() => add(producto)}
            className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
            disabled={producto.quantity >= producto.stock} // Deshabilitar si alcanzó el stock máximo
          >
            +
          </button>
        </div>
      </div>

      {/* Botón Eliminar - Posicionado abajo a la derecha */}
      <button
        onClick={() => remove(producto.id || (producto._id as string))}
        className="absolute bottom-4 right-4 text-red-600 hover:text-red-800 text-sm"
      >
        <Image
        src="/trash.png"
        alt=""
        width={20}
        height={20}
        className="hover:opacity-80"
        />
      </button>
    </div>
  );
};

export default ProductCards;