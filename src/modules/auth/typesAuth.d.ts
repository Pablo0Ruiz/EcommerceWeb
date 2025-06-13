
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



export type ResponseLogin = {
    success: boolean;
    token: string;
    user: {
        _id: string;  
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
      _id: string;  
        name?: string,
        surnames?: string,
        email?: string
    }
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

export interface ApiResponse<T = T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: number;
    details?: T;
  } | string;
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
  _id?: string;
  name: string;  
  street: string;
  number: string;
  postal: string;
  city: string;
  province: string;
  isDefault?: boolean; 
}



interface LoginResponse {
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
}

export interface regEmailResponse {
  token: string;
  user: {
    _id: string;
    email: string;
  };
}