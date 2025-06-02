import { Order } from "../typesOrder";

<<<<<<< HEAD
export const getOrders = async (userId: string): Promise<Order[]> => { //aqui va la llamada
=======
export const getOrders = async (userId: string): Promise<Order[]> => {
>>>>>>> 48f5ea6 (Refactor address and order management components; integrate new hooks for profile and order fetching, enhance error handling, and update address structure)
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