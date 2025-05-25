"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Order } from "@/modules/orders/typesOrder";
import { User } from "@/modules/auth/typesAuth";
import { getUserCookie } from "@/shared/utils/cookies";
import { Header } from "@/modules/market/components/header";

const MisPedidosPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const loadUser = useCallback(() => {
    const cookieUser = getUserCookie();
    setUser(cookieUser);
  }, []);

  const loadOrders = useCallback(() => {
    const data = localStorage.getItem("orders");
    if (data) {
      setOrders(JSON.parse(data));
    } else {
      setOrders([]);
    }
  }, []);

  useEffect(() => {
    loadUser();
    loadOrders();
  }, [loadUser, loadOrders]);

  return (
    <div className="relative min-h-screen bg-gray-50 text-gray-800">
      <Header />

      <main className="pt-[94px] px-6 md:px-16 lg:px-32 pb-12">
        <h1 className="text-4xl font-bold mb-8 text-center text-green-700">
          Mis Pedidos
        </h1>

        {!user && (
          <div className="text-center text-lg text-gray-600">
            Debes iniciar sesión para ver tus pedidos.
          </div>
        )}

        {user && orders.length === 0 && (
          <div className="text-center text-lg text-gray-600">
            No tienes pedidos registrados.
          </div>
        )}

        {user && orders.length > 0 && (
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 transition hover:shadow-lg"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                  <h2 className="text-xl md:text-2xl font-semibold text-green-800">
                    Pedido #{order._id}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {new Date(order.date).toLocaleString()}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
                  <p>
                    <strong>Total:</strong> ${order.total.toFixed(2)}
                  </p>
                  <p>
                    <strong>Estado:</strong>{" "}
                    <span className="capitalize">{order.state}</span>
                  </p>
                  <p>
                    <strong>Método de envío:</strong> {order.deliveryMethod}
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold text-lg mb-2 text-gray-700">
                    Artículos
                  </h3>
                  <ul className="space-y-2 border-t border-gray-200 pt-2">
                    {order.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex justify-between text-sm text-gray-600"
                      >
                        <span>Producto ID: {item.product}</span>
                        <span>
                          {item.quantity} × ${item.unit_price.toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold text-lg mb-2 text-gray-700">
                    Dirección de envío
                  </h3>
                  <p className="text-sm text-gray-600">
                    {order.shippingAddress.street},{" "}
                    {order.shippingAddress.number}
                  </p>
                  <p className="text-sm text-gray-600">
                    {order.shippingAddress.city} ({order.shippingAddress.postal}
                    ), {order.shippingAddress.province}
                  </p>
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
