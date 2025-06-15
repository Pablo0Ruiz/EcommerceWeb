"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Header } from "@/modules/market/components/header";
import useGetOrders from "@/modules/orders/hook/useGetOrders";
import { Order } from "@/modules/orders/typesOrder";
import { getUserCookie } from "@/shared/utils/cookies";
import { User } from "@/modules/auth/typesAuth";
import { Product } from "@/modules/product/typesProduct";
import { getProduct } from "@/modules/product/getProduct";
import { ProductsLanding } from "@/modules/landing/components/heroSection";
import { OrderItem } from "@/modules/orders/typesOrder";
import { useDeleteReview } from "@/modules/reviews/hooks/useDeleteReview";
import toast from "react-hot-toast";

interface EnhancedOrder extends Omit<Order, 'items'> {
  items: OrderItem[];
}

const MisPedidosPage: React.FC = () => {
  const [originalOrders, setOriginalOrders] = useState<Order[] | null>(null);
  const [enhancedOrders, setEnhancedOrders] = useState<EnhancedOrder[] | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const router = useRouter();

  // Usar el hook personalizado para eliminar reseñas
  const { deleteReview, deletingReviewId, isDeleting } = useDeleteReview();

  useEffect(() => {
    setUser(getUserCookie() || null);
  }, []);

  // Función para navegar al producto
  const handleProductClick = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  // Función simplificada para eliminar reseña usando el hook
  const handleDeleteReview = async (product: ProductsLanding) => {
    if (!user) {
      toast.error("Debes iniciar sesión para eliminar reseñas");
      return;
    }

    await deleteReview(product, user, () => {
      // Callback personalizado para recargar datos
      window.location.reload();
    });
  };

  const { loading: loadingOrders, error: ordersError } = useGetOrders(setOriginalOrders);

  useEffect(() => {
    if (!user || !originalOrders) return; 
    const fetchProductsForOrders = async () => {
      setIsLoadingProducts(true);
      try {
        const enhancedOrdersPromises = originalOrders.map(async (order) => {
          const enhancedItemsPromises = order.items.map(async (item) => {
            const id = typeof item.product === 'string'
              ? item.product
              : (item.product as ProductsLanding)._id;

            try {
              const fullProduct = await getProduct(id);
              return { ...item, product: fullProduct };
            } catch (error) {
              toast.error(`${error instanceof Error ? error.message : 'Error al cargar el producto'}`);
              return item;
            }
          });
          const enhancedItems = await Promise.all(enhancedItemsPromises);
          return { ...order, items: enhancedItems };
        });
        const result = await Promise.all(enhancedOrdersPromises);
        setEnhancedOrders(result);
      } finally {
        setIsLoadingProducts(false);
      }
    };

    fetchProductsForOrders();
  }, [user, originalOrders]);

  const canReview = (state: string) => state === "pending";

  const hasReviewed = (product: ProductsLanding | Product) => {
    if (!user || !product?.reviews?.reviewTexts) return false;
    return product.reviews.reviewTexts.some((r) =>
      typeof r.user === "object" ? r.user._id === user._id : r.user === user._id
    );
  };

  const getUserReviewId = (product: ProductsLanding) => {
    if (!user || !product?.reviews?.reviewTexts) return null;
    const userReview = product.reviews.reviewTexts.find((review) =>
      typeof review.user === "object" 
        ? review.user._id === user._id 
        : review.user === user._id
    );
    return userReview?._id || null;
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
        ) : ordersError ? (
          <div className="text-center text-lg text-red-600">
            Error al cargar los pedidos. Por favor, intenta nuevamente.
          </div>
        ) : loadingOrders || !enhancedOrders || isLoadingProducts ? (
          <div className="text-center text-lg text-gray-600">
            Cargando pedidos...
          </div>
        ) : !enhancedOrders.length ? (
          <div className="text-center text-lg text-gray-600">
            No hay pedidos registrados.
          </div>
        ) : (
          <div className="space-y-8">
            {enhancedOrders.map((order) => (
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
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.state === "received"
                          ? "bg-green-100 text-green-800"
                          : order.state === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {
                        {
                          pending: "Pendiente",
                          "in-process": "En proceso",
                          sent: "Enviado",
                          received: "Recibido",
                          cancelled: "Cancelado",
                        }[order.state]
                      }
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base mb-4">
                  <p>
                    <strong>Total:</strong> {order.total.toFixed(2)}€
                  </p>
                  <p>
                    <strong>Método de envío:</strong>{" "}
                    {{
                      standard: "Estándar",
                      express: "Express",
                      urgent: "Urgente",
                    }[order.deliveryMethod] || "Desconocido"}
                  </p>
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold text-lg mb-3 text-gray-700">
                    Artículos
                  </h3>
                  <ul className="space-y-4 border-t border-gray-200 pt-4">
                    {order.items.map((item, idx) => {
                      const product =
                        typeof item.product === "object"
                          ? (item.product as ProductsLanding)
                          : null;

                      const reviewed = product && hasReviewed(product);
                      const showReviewButton =
                        canReview(order.state) && product && !reviewed;
                      const userReviewId = product ? getUserReviewId(product) : null;

                      return (
                        <li
                          key={idx}
                          className="flex flex-col sm:flex-row justify-between gap-4 text-sm text-gray-600 pb-4 border-b border-gray-100 last:border-0"
                        >
                          <div className="flex items-start gap-4">
                            {/* Imagen del producto - CLICKEABLE */}
                            {product ? (
                              <div 
                                className="w-16 h-16 relative flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                                onClick={() => handleProductClick(product._id)}
                              >
                                {product.images && product.images.length > 0 ? (
                                  <Image
                                    src={product.images[0]}
                                    alt={product.name || 'Producto'}
                                    fill
                                    className="object-cover rounded"
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none';
                                    }}
                                  />
                                ) : (
                                  <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                                    <span className="text-gray-400 text-xs">Sin imagen</span>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                                <span className="text-gray-400 text-xs">Cargando...</span>
                              </div>
                            )}
                            
                            <div>
                              {/* Nombre del producto - CLICKEABLE */}
                              <h4 
                                className="font-medium text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                                onClick={() => product && handleProductClick(product._id)}
                              >
                                {product?.name || `Producto ID: ${item.product}`}
                              </h4>
                              <p>Cantidad: {item.quantity}</p>
                              <p>
                                Precio unitario: {item.unit_price.toFixed(2)}€
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <p className="font-medium">
                              Subtotal:{" "}
                              {(item.quantity * item.unit_price).toFixed(2)}€
                            </p>
                            
                            {/* Botón para eliminar reseña (solo si ya tiene reseña) */}
                            {product && reviewed && (
                              <button
                                onClick={() => handleDeleteReview(product)}
                                disabled={deletingReviewId === userReviewId || isDeleting}
                                className="mt-2 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition disabled:bg-red-300 disabled:cursor-not-allowed"
                              >
                                {deletingReviewId === userReviewId ? "Eliminando..." : "Eliminar reseña"}
                              </button>
                            )}
                            
                            {/* Botón para escribir reseña (solo si no tiene reseña) */}
                            {showReviewButton && (
                              <button
                                onClick={() => {
                                  if (!product?._id) return;
                                  router.push(`/review/${product._id}`);
                                }}
                                className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition"
                                disabled={!product?._id}
                              >
                                Escribir reseña
                              </button>
                            )}
                            
                            {/* Estado de la reseña */}
                            {canReview(order.state) && reviewed && !isDeleting && (
                              <span className="mt-1 text-green-600 text-xs">
                                ✓ Reseña enviada
                              </span>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold text-lg mb-2 text-gray-700">
                    Dirección de envío
                  </h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <strong>Nombre:</strong> {user.name || "-"}
                    </p>
                    <p>
                      <strong>Dirección:</strong>{" "}
                      {order.shippingAddress?.street || "-"}
                      {order.shippingAddress?.number
                        ? `, ${order.shippingAddress.number}`
                        : ""}
                    </p>
                    <p>
                      {order.shippingAddress?.city || "-"}
                      {order.shippingAddress?.postal
                        ? ` (${order.shippingAddress.postal})`
                        : ""}
                      {order.shippingAddress?.province
                        ? `, ${order.shippingAddress.province}`
                        : ""}
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
