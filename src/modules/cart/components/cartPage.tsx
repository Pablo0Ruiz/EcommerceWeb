"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductCards from "@/modules/product/components/productCard";
import { useCartStore } from "@/modules/cart/hook/cart";
import CartList from "@/modules/cart/components/viewCart";
import HeaderWizardSteps from "@/modules/cart/utils/headerWizard";
import carrito from "@/../public/carrito.png";

const CartPage = () => {
  const { cart, loadCart, addToCart, removeFromCart, decreaseQuantity } = useCartStore();

  useEffect(() => {
    loadCart();
    const handleStorageChange = () => loadCart();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [loadCart]);

  return (
    <main className="min-h-screen w-full relative overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <Image
          src={carrito}
          alt="Fondo del carrito"
          fill
          className="object-cover"
          style={{ objectPosition: "center 33%" }}
          quality={100}
          priority
        />
      </div>

      <HeaderWizardSteps currentStep={1} />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <Link
            href="/market"
            className="flex items-center text-white hover:text-gray-200 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al mercado
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-6 text-white">Detalles del carrito</h1>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-2/3 space-y-4">
            {cart.length > 0 ? (
              cart.map((product) => (
                <ProductCards
                  key={product._id}
                  producto={product}
                  add={() => addToCart(product)}
                  remove={() => removeFromCart(product._id)}
                  disminuirItem={() => decreaseQuantity(product._id)}
                />
              ))
            ) : (
              <p className="text-gray-500 p-4 bg-white rounded-lg">
                No hay productos en el carrito
              </p>
            )}
          </div>

          <div className="w-full md:w-1/3">
            <CartList
              showNextButton={true}
              nextStepPath="/cart/delivery"
              nextButtonLabel="Siguiente"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;