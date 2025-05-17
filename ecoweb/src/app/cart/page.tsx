"use client"
import { useEffect } from "react";
import ProductCards from "@/modules/product/components/productCard";
import { useCartStore } from "@/modules/cart/hook/cart";
import CartList from "@/modules/cart/components/viewCart";
import HeaderWizardSteps from "@/modules/cart/components/headerWizard";

const CartPage = () => {
    const { cart, loadCart, addToCart, removeFromCart, decreaseQuantity } = useCartStore();

    // Cargar productos al montar el componente
    useEffect(() => {
        loadCart();
        
        // Escuchar cambios en el localStorage
        const handleStorageChange = () => {
            loadCart();
        };

        window.addEventListener('storage', handleStorageChange);
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [loadCart]);

    return (
        <main className="min-h-screen w-full bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <HeaderWizardSteps currentStep={1} />

                <h1 className="text-3xl font-bold mb-6 text-green-700">Detalles del producto</h1>

                <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-2/3 space-y-4">
                        {cart.length > 0 ? (
                            cart.map((product) => (
                                <ProductCards
                                    key={product.id}
                                    producto={product}
                                    add={addToCart}
                                    remove={removeFromCart}
                                    disminuirItem={decreaseQuantity}
                                />
                            ))
                        ) : (
                            <p className="text-gray-500 p-4 bg-white rounded-lg">
                                No hay productos en el carrito
                            </p>
                        )}
                    </div>

                    <div className="w-full md:w-1/3">
                        <CartList />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default CartPage;