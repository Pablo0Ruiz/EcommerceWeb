import { Order, OrderInput } from "@/modules/orders/typesOrder";
import toast from "react-hot-toast";

export const createOrder = async (orderData: OrderInput): Promise<Order> => {
  try {
    const response = await fetch('/api/auth/order', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al crear la orden");
    }

    return await response.json() as Order; // Asegura el tipo

  } catch (error) {
    toast.error(
      `Error al crear la orden: ${
        error instanceof Error ? error.message : "Inténtalo más tarde"
      }`
    );
    throw error; // Propaga el error para manejo adicional si es necesario
  }
};