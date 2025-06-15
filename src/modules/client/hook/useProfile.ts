import { User } from "@/modules/auth/typesAuth";
import { useCallback } from "react";
import { ChangePasswordInputs } from "../components/modalPerfil";


type ChangePasswordResponse = {
  message: string;
  data?: boolean;
};

export const useProfile = () => {
  const fetchProfile = useCallback(async (): Promise<User> => {
    // <- Cambiado a no retornar null
    try {
      const res = await fetch("/api/auth/user", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al obtener perfil");
      }

      return await res.json();
    } catch (error) {
      console.error("Error en fetchProfile:", error);
      throw error; // Propaga el error
    }
  }, []);

  const updateProfile = async (data: Partial<User>): Promise<void> => {
    try {
      const res = await fetch("/api/auth/user", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al actualizar perfil");
      }
    } catch (error) {
      console.error("Error en updateProfile:", error);
      throw error; // Propaga el error para manejo en el componente
    }
  };

  const changePassword = async (
    data: ChangePasswordInputs
  ): Promise<ChangePasswordResponse> => {
    const res = await fetch("/api/auth/user/change-password", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const body = await res.json();

    if (!res.ok) {
      throw new Error(body.message || "UNKNOWN_ERROR");
    }

    return body;
  };

  const fetchPassword = async (
    data: ChangePasswordInputs
  ): Promise<ChangePasswordResponse> => {
    return await changePassword(data);
  };
  return { fetchProfile, updateProfile, changePassword, fetchPassword };
};
