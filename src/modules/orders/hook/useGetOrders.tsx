
import { useEffect } from 'react';
import { Order } from '@/modules/orders/typesOrder';
import { getOrders } from '../services/getOrders';

export default function useGetOrders(setOrders: (orders: Order[]) => void) {
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrders([]); 
      }
    };
    fetchOrders();
  }, [setOrders]);
}

