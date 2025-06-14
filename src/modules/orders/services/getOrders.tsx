import toast from "react-hot-toast";
import { Order } from "../typesOrder";

export const getOrders = async (): Promise<Order[]> => { 
  try {
    const response = await fetch('/api/auth/order', {
      method: 'GET',
      credentials: 'include', 
    });

    if (!response.ok) {
      // throw new Error(`Error fetching orders: ${response.statusText}`);
      toast.error("Error al obtener las órdenes, por favor intente más tarde");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    // throw error;
    toast.error(`${error instanceof Error ? error.message : "Error al obtener las órdenes"}`);
    return [];
  }
}