import { RegisterData } from "@/modules/auth/typesAuth";

export const PutProfile = async (data: unknown):Promise<RegisterData> =>{
    const response = await fetch('aca va el endpoint',{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    if(!response.ok){
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al actualizar su perfil');
    }

    return response.json()

}