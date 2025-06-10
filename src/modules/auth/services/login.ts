import { LoginData, ResponseLogin } from "../typesAuth";


export const loginClient = async (data: LoginData): Promise<ResponseLogin> =>{
    const response = await fetch('https://intelligent-karmen-areotar-52151d0d.koyeb.app/api/user/login',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })

    if(!response.ok){
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al iniciar sesion');
    }
    const dataLogin: ResponseLogin = await response.json()
    return {success: true, token: dataLogin.token,user: dataLogin.user}
}