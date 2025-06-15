import { RegisterData, ResponseRegister } from "../typesAuth";

export const registerClient = async (
  data: RegisterData
): Promise<ResponseRegister> => {
  try {
    console.log("Datos a enviar:", data);
    const response = await fetch(
      "https://intelligent-karmen-areotar-52151d0d.koyeb.app/api/user/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    const responseText = await response.text();
    console.log("Respuesta cruda del backend:", responseText);


    // Mapeo directo de strings de error
    const stringErrorMapping: Record<string, string> = {
      USER_EXISTS: "El usuario ya existe",
      INVALID_EMAIL: "Email no válido",
      WEAK_PASSWORD: "La contraseña debe tener al menos 8 caracteres",
      ERROR_REGISTER_USER: "Error al registrar el usuario",
      EMAIL_VERIFICATION_REQUIRED: "Verificación de email requerida",
      ACCOUNT_LOCKED_TOO_MANY_ATTEMPTS: 'El usuario ya existe', // no me preguntes como me di cuenta de este edge case
    };

    if (!response.ok) {
      // Buscamos coincidencia exacta en los strings de error
      const matchedError = Object.keys(stringErrorMapping).find(
        (error) => responseText.trim() === error
      );

      throw new Error(
        matchedError ? stringErrorMapping[matchedError] : responseText
      );
    }

    try {
      return JSON.parse(responseText);
    } catch {
      throw new Error("Respuesta inválida del servidor");
    }
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Error desconocido al registrar"
    );
  }
};
