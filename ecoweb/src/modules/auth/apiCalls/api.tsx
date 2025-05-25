import { RegisterData } from "../typesAuth";
import { ApiResponse } from "../typesAuth";
import { apiClient } from "@/shared/components/axiosInit";
import axios from "axios";

/**
 * Función para registrar un nuevo usuario
 * @param userData Datos del usuario a registrar
 * @returns Promise con la respuesta del servidor
 */
export const registerUser = async (userData: RegisterData): Promise<ApiResponse> => {
  try {
    // Normalizamos el email a minúsculas
    const normalizedData = {
      ...userData,
      email: userData.email.toLowerCase()
    };

    const response = await apiClient.post('/user/register', normalizedData);
    
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    // Manejo de errores
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error desconocido al registrar'
      };
    }
    
    return {
      success: false,
      error: 'Error inesperado al registrar usuario'
    };
  }
};