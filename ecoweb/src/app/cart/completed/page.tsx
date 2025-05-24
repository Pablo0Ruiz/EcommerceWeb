"use client";
import { useEffect, useState } from "react";
import { useCartStore } from "@/modules/cart/hook/cart";
import CartList from "@/modules/cart/components/viewCart";
import HeaderWizardSteps from "@/modules/cart/components/headerWizard";
import Image from "next/image";
import { PopUp } from "@/shared/components/popup";
import { useRouter } from "next/navigation";
import { getUserCookie } from "@/shared/utils/cookies";
import type { Order, OrderItem } from "@/modules/orders/typesOrder";
import type { User } from "@/modules/auth/typesAuth";

const OrderConfirmationPage = () => {
  const { cart, loadCart, clearCart } = useCartStore();
  const [showPopup, setShowPopup] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadCart();
    const currentUser = getUserCookie();
    setUser(currentUser);

    const handleStorageChange = () => loadCart();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [loadCart]);

  useEffect(() => {
    const createMockOrder = (user: User, cartItems: typeof cart): Order => {
      const items: OrderItem[] = cartItems.map((item) => ({
        product: item.id,
        quantity: item.quantity,
        unit_price: item.price,
      }));

      const total = parseFloat(
        cartItems
          .reduce((sum, item) => sum + item.price * item.quantity, 0)
          .toFixed(2)
      );

      return {
        _id: `mock-order-${Date.now()}`,
        client: user._id,
        date: new Date().toISOString(),
        total,
        state: "pending",
        deliveryMethod: Array.from(
          new Set(cart.map((item) => item.selectedShipping || "standard"))
        ).join(", "),
        items,
        shippingAddress: user.address[0] || {
          street: "",
          number: "",
          postal: "",
          city: "",
          province: "",
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    };

    if (user && cart.length > 0) {
      const newOrder = createMockOrder(user, cart);

      const existingOrders = localStorage.getItem("orders");
      const parsedOrders: Order[] = existingOrders
        ? JSON.parse(existingOrders)
        : [];

      parsedOrders.push(newOrder);

      localStorage.setItem("orders", JSON.stringify(parsedOrders));
    }
  }, [user, cart]);

  const handleNavigation = (path: string) => {
    if (path === "/market") {
      clearCart();
    }
    router.push(path);
  };

  if (!user) {
    return (
      <main className="min-h-screen w-full bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p>Por favor inicia sesión para confirmar tu pedido</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <HeaderWizardSteps currentStep={4} />
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
              onSecondaryButtonClick={() => handleNavigation("/orders")}
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
