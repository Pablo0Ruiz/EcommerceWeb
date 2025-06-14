import { Order,OrderInput } from "@/modules/orders/typesOrder";
import toast from "react-hot-toast";

export const createOrder = async (orderData: OrderInput): Promise<Order> => { 

  const response = await fetch('/api/auth/order', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    toast.error("Error al crear la orden, verifica tus datos o intenta más tarde");
  }

  return response.json();
};