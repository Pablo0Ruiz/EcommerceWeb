import { useEffect, useState } from 'react';
import { getOrders } from '../services/getOrders';
import { Order } from '../typesOrder';
import toast from 'react-hot-toast';

const useGetOrders = (setOrders: (orders: Order[]) => void) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const orders = await getOrders();
        setOrders(orders);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
        
        setError(errorMessage);
        
        // Mostrar toast de error
        if (errorMessage.includes('Unauthorized')) {
          toast.error('No autorizado. Por favor, inicia sesión.');
        } else {
          toast.error(`Error al cargar pedidos: ${errorMessage}`);
        }
        
        // Setear orders vacío en caso de error para evitar estados inconsistentes
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [setOrders]);

  return { loading, error };
};

export default useGetOrders;

