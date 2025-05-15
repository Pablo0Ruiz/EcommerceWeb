'use client'

import ProductCards from "@/modules/product/components/productCard";
import { Product } from "@/modules/product/typesProduct"
import { useCart } from "@/modules/cart/hook/cartUse";
import CartList from "@/modules/cart/components/viewCart";
import HeaderWizardSteps from "@/modules/cart/components/headerWizard";

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
    const add = useCart((state) => state.add);
    const eliminar = useCart((state) => state.remove);
    const restar = useCart((state) => state.disminuirItem);

    return (
        <main className="min-h-screen w-full bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <HeaderWizardSteps currentStep={1} />

                <h1 className="text-3xl font-bold mb-6 text-green-700">Detalles del producto</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ProductCards
                        producto={mockProduct}
                        add={add}
                        remove={eliminar}
                        disminuirItem={restar}
                    />

                    <CartList />
                </div>
            </div>
        </main>
    )
}

export default ProductPage