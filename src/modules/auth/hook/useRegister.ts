import { useRouter } from "next/navigation";
import { RegisterData } from "../typesAuth";
import { registerClient } from "../services/register";
import { setUserCookie } from "@/shared/utils/cookies";
import { clearAllCookies } from "./useLogin";
import toast from "react-hot-toast";
import { useState } from "react";


export const useRegister = (reset: () => void) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: RegisterData) => {
    clearAllCookies(); // Limpiar todas las cookies al iniciar el registro
    if (loading) return; // protección extra contra doble clic

    setLoading(true);
    try {
      const response = await registerClient(data);

      setUserCookie(response.user);

      await fetch("/api/auth/set-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: response.token }),
      });

      router.push("/email-verification");
      reset();
    } catch (error) {
      toast.error(
        `Error al registrarte: ${
          error instanceof Error ? error.message : "Verifica tus datos"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return { onSubmit, loading };
};
