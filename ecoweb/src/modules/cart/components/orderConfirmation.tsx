"use client";
import { useEffect, useState } from "react";
import { useCartStore } from "@/modules/cart/hook/cart";
import CartList from "@/modules/cart/components/viewCart";
import HeaderWizardSteps from "@/modules/cart/utils/headerWizard";
import Image from "next/image";
import { PopUp } from "@/shared/components/popup";
import { useRouter } from "next/navigation";
import { getUserCookie } from "@/shared/utils/cookies";
import type { User } from "@/modules/auth/typesAuth";

const OrderConfirmationPage = () => {
  const { cart, loadCart } = useCartStore();
  const [showPopup, setShowPopup] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const currentUser = getUserCookie();
    if (!currentUser) {
      router.push("/login"); // Redirigir si no está autenticado
    } else {
      setUser(currentUser);
    }

    loadCart();

    const handleStorageChange = () => loadCart();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [loadCart, router]);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  if (!user) return null;

  return (
    <main className="min-h-screen w-full bg-white">
      {/* ✅ Header a pantalla completa */}
      <HeaderWizardSteps currentStep={5} />

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6 text-green-700">
          ¡Pedido confirmado!
        </h1>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-2/3 space-y-4">
            {cart.length > 0 ? (
              cart.map((product) => (
                <div
                  key={product.id}
                  className="bg-white p-4 rounded-lg shadow-sm text-black flex items-start gap-4"
                >
                  <div className="w-20 h-20 relative flex-shrink-0">
                    <Image
                      src={product.images[0] || "/placeholder-product.png"}
                      alt={product.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-black">
                      {product.name}
                    </h3>
                    <p>Cantidad: {product.quantity}</p>
                    <p>Precio: €{product.price.toFixed(2)}</p>
                    <p>
                      Subtotal: €{(product.price * product.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <p className="text-lg text-gray-600">
                  No hay productos en el carrito
                </p>
              </div>
            )}
          </div>

          <div className="w-full md:w-1/3">
            <CartList showCheckoutButton={false} />

            <button
              type="button"
              onClick={() => setShowPopup(true)}
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition"
            >
              Finalizar
            </button>

            <PopUp
              isOpen={showPopup}
              onClose={() => setShowPopup(false)}
              title="Gracias por comprar en MateZone"
              message="Su pedido ha sido registrado con éxito, puede consultar el estado en Mis Pedidos"
              primaryButtonText="Seguir comprando"
              secondaryButtonText="Ir a Mis Pedidos"
              onPrimaryButtonClick={() => handleNavigation("/market")}
              onSecondaryButtonClick={() => handleNavigation("/user/orders")}
              showSuccessIcon={true}
              secondaryButtonHref="/user/orders"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrderConfirmationPage;