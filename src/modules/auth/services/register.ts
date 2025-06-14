
import toast from "react-hot-toast";
import { RegisterData,ResponseRegister } from "../typesAuth";

export const registerClient = async (data: RegisterData): Promise<ResponseRegister> =>{

    const response = await fetch('https://intelligent-karmen-areotar-52151d0d.koyeb.app/api/user/register',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });

    if(!response.ok){
        const errorData = await response.json()
        // throw new Error(errorData.message || 'Error al registrar el cliente')
        toast.error(`Error al registrarte: ${errorData.message || 'Inténtalo más tarde'}`);
    }
    const clientData = await response.json();
    return {success:true, token:clientData.token,user:clientData.user};
}