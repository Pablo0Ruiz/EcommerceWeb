
export type RegisterData = {
    name: string,
    surnames: string
    email: string,
    password: string
    phoneNumber: string;
}

export type LoginData = {
    email: string,
    password: string
}

export type Client = {
    id: string,
    nombre: string,
    email: string,
    token: string
}

// Actualiza tu tipo ResponseLogin
export type ResponseLogin = {
    success: boolean;
    token: string;
    user: {
        _id: string;  // Cambiado de 'id' a '_id'
        name: string;
        surnames: string;
        email: string;
        phoneNumber: string;
        role: string;
        address: Address[];
        urlToAvatar?: string;
    };
}
export interface ResponseRegister {
    success: boolean,
    token: string
    user: {
        name?: string,
        surnames?: string,
        email?: string
    }
    // id?: string
    // status?: number
    // role?: string
    // attempt?: string
    // phoneNumber?: string
    // deleted?: boolean
    // address?: string,
    // createdAt?: string
    // updatedAt?: string
    // __v?: number

    //dependiendo de la respuesta de la api se cambia el string por client
}



interface AuthResponse {
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
}

interface ApiResponse {
  success: boolean;
  data?: T;
  error?: string;
}


export interface User {
  _id: string;
  name: string;
  surnames: string;
  email: string;
  phoneNumber: string;
  address: Address[];
  urlToAvatar?: string;
}

export interface Address {
  nombre: string;  // Mantener para coincidir con el backend
  street: string;
  number: string;
  postal: string;
  city: string;
  province: string;
  isDefault?: boolean; 
  // Eliminar phoneNumber e isDefault o moverlos a donde corresponda
}