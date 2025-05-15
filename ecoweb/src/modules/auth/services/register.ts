
import { RegisterData,ResponseRegister } from "../typesAuth";

export const registerClient = async (data: RegisterData): Promise<ResponseRegister> =>{
    const response = await fetch('http://localhost:8000/api/user/register',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });

    if(!response.ok){
        const errorData = await response.json()
        console.error(errorData)
        throw new Error(errorData.message || 'Error al registrar el cliente')
    }
    const clientData = await response.json();
    console.log(clientData)
    return {success:true, token:clientData.token,user:clientData.user};
}