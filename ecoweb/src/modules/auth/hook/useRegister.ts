import { useRouter } from "next/navigation"
import { RegisterData } from "../typesAuth";
import { ResponsePost } from "@/shared/utils/typesGlobal";
import { registerClient } from "../services/register";
import { setCookie } from "@/shared/utils/cookies";


export const useRegister=(reset: ()=> void)=>{
    const router = useRouter();

    const onSubmit = async (data: RegisterData)=> {
        try{
            const response: ResponsePost = await registerClient(data)
            if(!response.success){
                throw new Error('Error al registrarte')
            }
            setCookie('esperar cuerpo de la api para cambiar el typo de responsepost a uno independiente')
            router.push('/nombre de la pagina')
            reset()
        }catch(error){
            console.error(error instanceof Error ? error.message : ' registro de cliente fallido');
        }
    }

    return {onSubmit}
}