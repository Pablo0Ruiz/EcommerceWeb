import { Order,OrderInput } from "@/modules/orders/typesOrder";

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
    throw new Error('Error al crear la orden');
  }

  return response.json();
};