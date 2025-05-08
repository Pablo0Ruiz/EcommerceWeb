
export interface RegisterData {
    nombre: string,
    email: string,
    password: string
}

export interface LoginData {
    email: string,
    password: string
}

export interface Client {
    id: string,
    nombre: string,
    email: string,
    token: string
}

export interface ResponseLogin {
    success: boolean,
    token: string
    user: {
        id: string,
        email: string
    }
    //dependiendo de la respuesta de la api se cambia el string por client
}

