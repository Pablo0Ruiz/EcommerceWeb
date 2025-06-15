import { useRouter } from "next/navigation";
import { setUserCookie } from "@/shared/utils/cookies";
import { loginClient } from "@/modules/auth/services/login";
import { LoginData } from "../typesAuth";
import toast from "react-hot-toast";

export const useLogin = (reset: () => void) => {
  const router = useRouter();

  const onSubmit = async (data: LoginData) => {
    try {
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
      // Todos los errores se manejan aquí
      toast.error(
        `Error al iniciar sesión: ${
          error instanceof Error ? error.message : "Inténtalo más tarde"
        }`
      );
    }
  };

  return { onSubmit };
};
