import { useRouter } from "next/navigation"
import { RegisterData, ResponseRegister } from "../typesAuth";
import { registerClient } from "../services/register";
import { setCookie } from "@/shared/utils/cookies";


export const useRegister=(reset: ()=> void)=>{
    const router = useRouter();

    const onSubmit = async (data: RegisterData)=> {
        console.log(data)
        try{
            const response: ResponseRegister = await registerClient(data)
            if(!response.success){
                console.error(response)
                throw new Error('Error al registrarte')
            }
            setCookie(response.token)
            router.push('/offers')
            reset()
        }catch(error){
            console.error(error instanceof Error ? error.message : ' registro de cliente fallido');
            
        }
    }

    return {onSubmit}
}