import { Order, OrderInput } from "@/modules/orders/typesOrder";
import toast from "react-hot-toast";

export const createOrder = async (orderData: OrderInput): Promise<Order> => {
  try {
    console.log("Datos de la orden a enviar:", orderData);
    
    const response = await fetch('/api/auth/order', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    // Obtener el texto de la respuesta primero
    const responseText = await response.text();
    console.log('Response status:', response.status);
    console.log('Response text:', responseText);

    if (!response.ok) {
      let errorMessage = "Error al crear la orden";
      
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

    // Verificar si hay contenido antes de parsear JSON
    if (!responseText.trim()) {
      throw new Error('Respuesta vacía del servidor');
    }

    try {
      const data = JSON.parse(responseText);
      return data as Order;
    } catch (parseError) {
      console.error('Error parsing JSON response:', parseError);
      console.error('Response was:', responseText);
      throw new Error('Respuesta inválida del servidor');
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Inténtalo más tarde";
    toast.error(`Error al crear la orden: ${errorMessage}`);
    throw error;
  }
};