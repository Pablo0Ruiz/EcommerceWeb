import { useCart } from "../hook/cartUse";
import { totalPrecioCarrito } from "../utils/totalProduct";
import CheckoutSteps from "./checkoutSteps";

const CartList = () => {
    const productos = useCart(state => state.productos)
    const eliminar = useCart(state => state.remove)
    const disminuirItem = useCart(state => state.disminuirItem)
    const subTotal = totalPrecioCarrito(productos)
    const entrega = 4
    const total = subTotal + entrega

    return (
        <div className="bg-white border rounded-lg shadow-md p-6">
            <CheckoutSteps currentStep={1} />
            <h2 className="text-2xl font-bold text-green-700 mb-4">Resumen de compra</h2>

            <ul className="divide-y divide-gray-200 mb-4">
                {productos.map(producto => (
                    <li key={producto.id} className="py-4">
                        <div className="flex justify-between items-center flex-wrap">
                            <span className="text-gray-800 font-medium">{producto.nombre} x {producto.cantidad}</span>
                            <div className="flex gap-2 mt-2 md:mt-0">
                                <button onClick={() => disminuirItem(producto.id)} className="text-sm bg-yellow-500 text-white px-2 py-1 rounded">
                                    -
                                </button>
                                <button onClick={() => eliminar(producto.id)} className="text-sm bg-red-600 text-white px-2 py-1 rounded">
                                    🗑
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="text-sm text-gray-600 space-y-1">
                <p>Subtotal: €{subTotal.toFixed(2)}</p>
                <p>Entrega urgente: €{entrega.toFixed(2)}</p>
                <p className="font-bold text-gray-900 mt-2">Total: €{total.toFixed(2)}</p>
            </div>

            <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition">
                Realizar pedido
            </button>
        </div>
    )
}

export default CartList;