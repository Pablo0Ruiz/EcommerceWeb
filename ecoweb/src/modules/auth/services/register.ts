import { ResponsePost } from "@/shared/utils/typesGlobal";
import { RegisterData } from "../typesAuth";

export const registerClient = async (data: RegisterData): Promise<ResponsePost> =>{
    const response = await fetch('aca va la url de la api',{
        method: 'POST',
        headers: {'Content-type': 'application'},
        body: JSON.stringify(data)
    });

    if(!response.ok){
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al registrar el cliente')
    }
    // const clientData = await response.json();
    return {success:true, message:'Registro exitoso'};
}