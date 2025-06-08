"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Header } from "@/modules/market/components/header";
import useGetOrders from "@/modules/orders/hook/useGetOrders";
import type { ProductsLanding } from "@/modules/landing/components/heroSection";
import { Order } from "@/modules/orders/typesOrder";
import { getUserCookie } from "@/shared/utils/cookies";
import { User } from "@/modules/auth/typesAuth";

const MisPedidosPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [products, setProducts] = useState<ProductsLanding[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    setUser(getUserCookie() || null);
    const localProducts = localStorage.getItem("products");
    setProducts(localProducts ? JSON.parse(localProducts) : []);
  }, []);

  useGetOrders(setOrders);

  const canReview = (state: string) => state === "received";

  const hasReviewed = (productId: string) => {
    if (!user) return false;
    const prod = products.find(p => p._id === productId);
    return prod?.reviews?.reviewTexts?.some(r =>
      typeof r.user === "object" ? r.user._id === user._id : r.user === user._id
    );
  };

  return (
    <div className="relative min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <main className="pt-[94px] px-4 sm:px-6 md:px-16 lg:px-32 pb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-green-700">
          Mis Pedidos
        </h1>

        {!user ? (
          <div className="text-center text-lg text-gray-600">
            Debés iniciar sesión para ver tus pedidos.
          </div>
        ) : orders === null ? (
          <div className="text-center text-lg text-gray-600">Cargando pedidos...</div>
        ) : !orders.length ? (
          <div className="text-center text-lg text-gray-600">
            No hay pedidos registrados.
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map(order => (
              <div
                key={order._id}
                className="bg-white shadow-md rounded-2xl p-4 sm:p-6 border border-gray-200 transition hover:shadow-lg"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                  <div>
                    <h2 className="text-xl md:text-2xl font-semibold text-green-800">
                      Pedido #{order._id}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {new Date(order.date).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${order.state === "received"
                          ? "bg-green-100 text-green-800"
                          : order.state === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                    >
                      {{
                        pending: "Pendiente",
                        "in-process": "En proceso",
                        sent: "Enviado",
                        received: "Recibido",
                        cancelled: "Cancelado",
                      }[order.state]}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base mb-4">
                  <p><strong>Total:</strong> {order.total.toFixed(2)}€</p>
                  <p><strong>Método de envío:</strong> {{
                    standard: "Estándar",
                    express: "Express",
                    urgent: "Urgente"
                  }[order.deliveryMethod] || "Desconocido"}</p>
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold text-lg mb-3 text-gray-700">Artículos</h3>
                  <ul className="space-y-4 border-t border-gray-200 pt-4">
                    {order.items.map((item, idx) => {
                      const productData = item.product;
                      const product = products.find(p => p._id === productData);
                      const reviewed = hasReviewed(productData);
                      const showReviewButton = canReview(order.state) && product && !reviewed;

                      return (
                        <li
                          key={idx}
                          className="flex flex-col sm:flex-row justify-between gap-4 text-sm text-gray-600 pb-4 border-b border-gray-100 last:border-0"
                        >
                          <div className="flex items-start gap-4">
                            {product && (
                              <div className="w-16 h-16 relative flex-shrink-0">
                                <Image
                                  src={product.images?.[0] || "/placeholder-product.png"}
                                  alt={product.name}
                                  fill
                                  className="object-cover rounded"
                                />
                              </div>
                            )}
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {product?.name || `Producto ID: ${productData}`}
                              </h4>
                              <p>Cantidad: {item.quantity}</p>
                              <p>Precio unitario: {item.unit_price.toFixed(2)}€</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <p className="font-medium">
                              Subtotal: {(item.quantity * item.unit_price).toFixed(2)}€
                            </p>
                            {showReviewButton && (
                              <button
                                onClick={() => router.push(`/review/${productData}`)}
                                className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition"
                              >
                                Escribir reseña
                              </button>
                            )}
                            {canReview(order.state) && reviewed && (
                              <span className="mt-2 text-green-600 text-sm">
                                Reseña enviada
                              </span>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold text-lg mb-2 text-gray-700">Dirección de envío</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Nombre:</strong> {user.name || "-"}</p>
                    <p><strong>Dirección:</strong> {order.shippingAddress?.street || "-"}{order.shippingAddress?.number ? `, ${order.shippingAddress.number}` : ""}</p>
                    <p>
                      {order.shippingAddress?.city || "-"}
                      {order.shippingAddress?.postal ? ` (${order.shippingAddress.postal})` : ""}
                      {order.shippingAddress?.province ? `, ${order.shippingAddress.province}` : ""}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MisPedidosPage;

