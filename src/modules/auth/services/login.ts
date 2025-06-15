import { LoginData, ResponseLogin } from "../typesAuth";

export const loginClient = async (data: LoginData): Promise<ResponseLogin> => {
  try {
    const response = await fetch('https://intelligent-karmen-areotar-52151d0d.koyeb.app/api/user/login',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const responseText = await response.text();
    
    // Mapeo directo de strings de error
    const stringErrorMapping: Record<string, string> = {
      'USER_NOT_EXIST': 'El usuario no existe',
      'TOO_MANY_ATTEMPTS_WAIT_30_MIN': 'Demasiados intentos. Espera 30 minutos',
      'USER_NOT_VALIDATED': 'Cuenta no validada. Revisa tu email',
      'ACCOUNT_LOCKED_TOO_MANY_ATTEMPTS': 'Cuenta bloqueada por intentos fallidos',
      'INVALID_PASSWORD': 'Contraseña incorrecta',
      'ERROR_LOGIN_USER': 'Error al iniciar sesión'
    };

    if (!response.ok) {
      // Buscamos coincidencia exacta en los strings de error
      const matchedError = Object.keys(stringErrorMapping).find(error => 
        responseText.trim() === error
      );
      
      throw new Error(matchedError ? stringErrorMapping[matchedError] : responseText);
    }

    try {
      return JSON.parse(responseText);
    } catch {
      throw new Error('Respuesta inválida del servidor');
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Error desconocido');
  }
};