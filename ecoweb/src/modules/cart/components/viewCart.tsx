import { useCart } from "../hook/cartUse";

const CartList = () => {
    const productos = useCart(state => state.productos)
    const eliminar = useCart(state => state.remove)
    const disminuirItem = useCart(state => state.disminuirItem)

    return (
        <div>
            <h2>Lista de compras</h2>
            <ul>
                {productos.map(producto => (
                    <li key={producto.id}>
                        {producto.nombre} - {producto.cantidad}
                        <button onClick={() => disminuirItem(producto.id)}>Disminuir cantidad</button>
                        <button onClick={() => eliminar(producto.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CartList