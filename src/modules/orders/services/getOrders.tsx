import { Order } from "../typesOrder";

export const getOrders = async (): Promise<Order[]> => {
  try {
    const response = await fetch('/api/auth/order', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Obtener texto de respuesta primero
    const responseText = await response.text();

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized');
      }
      
      let errorMessage = 'Error al obtener pedidos';
      if (responseText) {
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage = responseText;
        }
      }
      throw new Error(errorMessage);
    }

    // Verificar si hay contenido antes de parsear
    if (!responseText.trim()) {
      return []; // Retornar array vacío si no hay contenido
    }

    try {
      const data = JSON.parse(responseText);
      return Array.isArray(data) ? data : [];
    } catch (parseError) {
      // Log solo para debugging, no re-lanzar
      console.warn('Error parsing orders JSON:', parseError);
      throw new Error('Respuesta inválida del servidor');
    }

  } catch (error) {
    // Log solo para debugging, no re-lanzar múltiples veces
    if (error instanceof Error && error.message === 'Unauthorized') {
      // No hacer log para errores de autorización esperados
    } else {
      console.warn('Service error:', error);
    }
    throw error;
  }
};