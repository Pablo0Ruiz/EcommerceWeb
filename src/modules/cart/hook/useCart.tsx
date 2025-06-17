import { useState } from "react";
import { createOrder } from "../services/createOrder";
import { Order, OrderInput } from "@/modules/orders/typesOrder";

export const useOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // En tu useOrder hook
  const createNewOrder = async (
    orderData: OrderInput
  ): Promise<Order | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const order = await createOrder(orderData);
      return order;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Error desconocido al crear la orden";
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  return {
    createNewOrder,
    isLoading,
    error,
  };
};

