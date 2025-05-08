'use client'

import ProductCards from "@/modules/product/components/productCard";
import { Product } from "@/modules/product/typesProduct"
import { useCart } from "@/modules/cart/hook/cartUse";
import CartList from "@/modules/cart/components/viewCart";

const mockProduct: Product = {
    id: crypto.randomUUID(),
    imagenUrl: '/globe.svg',
    nombre: 'mate',
    descripcion: 'juego de mate',
    precio: 20,
    tipoEntrega: 'envio',
    stock: 10,
}



const ProductPage = () => {
    const add = useCart((state)=>state.add);
    const eliminar = useCart((state)=>state.remove);
    const restar = useCart((state)=>state.disminuirItem);

    return (
        <div>
            <h1>Detalles del producto</h1>
            <ProductCards 
            producto={mockProduct}
            add={add}
            remove={eliminar}
            disminuirItem={restar} />
            <div>
                <CartList/>
            </div>
        </div>
    )
}

export default ProductPage