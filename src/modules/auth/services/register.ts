
import { RegisterData,ResponseRegister } from "../typesAuth";

export const registerClient = async (data: RegisterData): Promise<ResponseRegister> =>{
    console.log('data entrando a registro',data)
    const response = await fetch('http://localhost:8000/api/user/register',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });

    if(!response.ok){
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al registrar el cliente')
    }
    const clientData = await response.json();
    return {success:true, token:clientData.token,user:clientData.user};
}