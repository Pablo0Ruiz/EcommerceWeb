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
    <div className="relative min-h-screen">
      <Header />

      <main className="pt-[94px] px-8">
        <h1 className="text-3xl font-bold mb-6">Mis Pedidos</h1>

        {!user && <p>Debes iniciar sesión para ver tus pedidos.</p>}

        {user && orders.length === 0 && <p>No tienes pedidos registrados.</p>}

        {user && orders.length > 0 && (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white shadow rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">
                  Pedido #{order._id}
                </h2>
                <p>
                  <strong>Fecha:</strong>{" "}
                  {new Date(order.date).toLocaleString()}
                </p>
                <p>
                  <strong>Total:</strong> ${order.total.toFixed(2)}
                </p>
                <p>
                  <strong>Estado:</strong> {order.state}
                </p>
                <p>
                  <strong>Envío:</strong> {order.deliveryMethod}
                </p>

                <div className="mt-4">
                  <h3 className="font-medium text-lg">Artículos</h3>
                  <ul className="space-y-2">
                    {order.items.map((it, idx) => (
                      <li key={idx} className="flex justify-between">
                        <span>Producto ID: {it.product}</span>
                        <span>
                          {it.quantity} × ${it.unit_price.toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4">
                  <h3 className="font-medium text-lg">Dirección de envío</h3>
                  <p>
                    {order.shippingAddress.street},{" "}
                    {order.shippingAddress.number}
                  </p>
                  <p>
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
