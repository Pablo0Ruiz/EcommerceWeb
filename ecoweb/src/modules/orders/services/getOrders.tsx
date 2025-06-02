import { Order } from "../typesOrder";

export const getOrders = async (userId: string): Promise<Order[]> => {
  try {
    const response = await fetch(`/api/orders?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching orders: ${response.statusText}`);
    }

    const data = await response.json();
    return data.orders as Order[];
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
}