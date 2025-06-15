"use client";
import { useEffect, useState } from "react";
import { useCartStore } from "@/modules/cart/hook/cart";
import HeaderWizardSteps from "@/modules/cart/utils/headerWizard";
import Image from "next/image";
import { PopUp } from "@/shared/components/popup";
import { useRouter } from "next/navigation";
import { getUserCookie } from "@/shared/utils/cookies";
import { doesCookieExist } from "@/shared/utils/cookies";
import type { User } from "@/modules/auth/typesAuth";

const OrderConfirmationPage = () => {
  const { cart, loadCart, calculateTotal } = useCartStore();
  const [showPopup, setShowPopup] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [hasRegEmailCookie, setHasRegEmailCookie] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const currentUser = getUserCookie();
    if (!currentUser) {
      router.push("/login");
    } else {
      setUser(currentUser);
    }

    const cookieExists = doesCookieExist("regEmail");
    console.log("Cookie 'regEmail' exists:", cookieExists);
    setHasRegEmailCookie(!!cookieExists);

    loadCart();
  }, [loadCart, router]);
const handleNavigation = (path: string) => {
  localStorage.removeItem("cart");
  setTimeout(() => {
    router.push(path);
  }, 100);
};


  if (!user) return null;

  return (
    <main className="min-h-screen w-full bg-white">
      <HeaderWizardSteps currentStep={4} />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6 text-green-700">
          ¡Pedido confirmado!
        </h1>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-2/3 space-y-4">
            {cart.length > 0 ? (
              cart.map((product) => (
                <div
                  key={product._id}
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
            <div className="bg-white border rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-green-700 mb-4">
                Total: €{calculateTotal().toFixed(2)}
              </h2>

              <button
                type="button"
                onClick={() => setShowPopup(true)}
                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition"
              >
                Finalizar
              </button>
            </div>

            <PopUp
              isOpen={showPopup}
              onClose={() => setShowPopup(false)}
              title="Gracias por comprar en MateZone"
              message="Su pedido ha sido registrado con éxito, puede consultar el estado en Mis Pedidos"
              primaryButtonText="Seguir comprando"
              onPrimaryButtonClick={() => handleNavigation("/market")}
              showSuccessIcon={true}
              {...(!hasRegEmailCookie && {
                secondaryButtonText: "Ir a Mis Pedidos",
                onSecondaryButtonClick: () => handleNavigation("/user/orders"),
                secondaryButtonHref: "/user/orders",
              })}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrderConfirmationPage;
