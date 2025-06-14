import { User } from "@/modules/auth/typesAuth";
import { useCallback } from "react";
import { ChangePasswordInputs } from "../components/modalPerfil";
import toast from "react-hot-toast";

type ChangePasswordResponse = {
  message: string;
  data?: boolean;
};

export const useProfile = () => {
  const fetchProfile = useCallback(async (): Promise<User | null> => {
    try {
      const res = await fetch("/api/auth/user", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      if (!res.ok) {
        // console.error("Error al obtener perfil - Estado:", res.status);
        toast.error("Error al obtener perfil, por favor intente más tarde");
        return null;
      }
        
      return await res.json();
    } catch (error) {
      // console.error("Error en fetchProfile:", error);
      toast.error(`${error instanceof Error ? error.message : "Error al obtener perfil"}`);
      return null;
    }
  }, []);

  const updateProfile = async (data: Partial<User>): Promise<void> => {
    const res = await fetch("/api/auth/user", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      // throw new Error("Error al actualizar perfil");
      toast.error("Error al actualizar perfil, por favor intente más tarde");
    }
  };

  const changePassword = async (
    data: ChangePasswordInputs
  ): Promise<ChangePasswordResponse> => {
    const res = await fetch("/api/auth/user/change-password", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const body = await res.json();

    if (!res.ok) {
      // throw new Error(body.message || "UNKNOWN_ERROR");
      toast.error(body.message || "Error al cambiar la contraseña, por favor intente más tarde");
    }

    return body;
  };

  const fetchPassword = async (
    data: ChangePasswordInputs
  ): Promise<ChangePasswordResponse> => {
    try {
      const response = await changePassword(data);
      return response;
    } catch (err) {
      // console.error("Error al cambiar la contraseña:", err);
      // throw err;
      throw toast.error(`Error al cambiar la contraseña: ${err instanceof Error ? err.message : "Error desconocido"}`);
    }
  };
  return { fetchProfile, updateProfile, changePassword, fetchPassword };
};
