import { useRouter } from "next/navigation";
import { setUserCookie } from "@/shared/utils/cookies";
import { loginClient } from "@/modules/auth/services/login";
import { LoginData } from "../typesAuth";
import toast from "react-hot-toast";

export const clearAllCookies = () => {
  // Limpiar cookies específicas conocidas
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "regEmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  // Limpiar todas las demás cookies
  document.cookie.split(";").forEach((cookie) => {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
    if (name) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  });
};

export const useLogin = (reset: () => void) => {
  const router = useRouter();

  const onSubmit = async (data: LoginData) => {
    try {
      // LIMPIAR TODAS LAS COOKIES ANTES DEL LOGIN
      clearAllCookies();

      const response = await loginClient(data);

      setUserCookie(response.user);

      await fetch("/api/auth/set-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: response.token }),
      });

      if (response.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/market");
      }
      reset();
    } catch (error) {
      toast.error(
        `Error al iniciar sesión: ${
          error instanceof Error ? error.message : "Inténtalo más tarde"
        }`
      );
    }
  };

  return { onSubmit };
};
