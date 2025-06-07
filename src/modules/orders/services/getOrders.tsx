import { Order } from "../typesOrder";

export const getOrders = async (): Promise<Order[]> => { 
  try {
    const response = await fetch('/api/auth/order', {
      method: 'GET',
      credentials: 'include', 
    });

    if (!response.ok) {
      throw new Error(`Error fetching orders: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
}