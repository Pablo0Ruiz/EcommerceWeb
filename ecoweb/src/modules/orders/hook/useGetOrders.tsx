import { useState, useEffect } from 'react';
import { Order } from '@/modules/orders/typesOrder'; // Asegúrate de usar la ruta absoluta
import { getOrders } from '../services/getOrders';
import { getUserCookie } from '@/shared/utils/cookies';


export const useGetOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const user = getUserCookie();
      if (!user || !('_id' in user)) {
        throw new Error('Usuario no autenticado');
      }
      
      const data = await getOrders(user._id);
      setOrders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener pedidos');
      console.error('Error fetching orders:', err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return { 
    orders, 
    loading, 
    error,
    refetch: fetchOrders 
  };
};