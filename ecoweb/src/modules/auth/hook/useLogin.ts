import { useRouter } from "next/navigation";
import { setUserCookie, setCookie } from "@/shared/utils/cookies";
import { LoginData } from "../typesAuth";
import { loginClient } from "../services/login";
import { ResponseLogin } from "../typesAuth";

export const useLogin = (reset: () => void) => {
  const router = useRouter();

  const onSubmit = async (data: LoginData) => {
    try {
      const response: ResponseLogin = await loginClient(data);

      // Guardar usuario y token en cookies
      setUserCookie(response.user);
      setCookie(response.token);

      router.push("/market");
      reset();
    } catch (error) {
      console.error(
        "Error inesperado:",
        error instanceof Error ? error.message : "Fallo en el login"
      );
    }
  };

  return { onSubmit };
};
