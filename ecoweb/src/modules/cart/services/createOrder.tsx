// src/modules/orders/services/orderService.ts
import { Order,OrderInput } from "@/modules/orders/typesOrder";

<<<<<<< HEAD
export const createOrder = async (orderData: OrderInput): Promise<Order> => { // aqui es donde va la llamada a la orden, no se si esta correctamente implementada
=======
export const createOrder = async (orderData: OrderInput): Promise<Order> => {
>>>>>>> 48f5ea6 (Refactor address and order management components; integrate new hooks for profile and order fetching, enhance error handling, and update address structure)
  const response = await fetch('/api/orders', {
    method: 'POST',
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