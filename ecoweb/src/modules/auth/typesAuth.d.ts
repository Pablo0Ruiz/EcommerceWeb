
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

export type ResponseLogin = {
    success: boolean,
    token: string
    user: {
        id: string
        name?: string
        email: string
        role: string
    }
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

