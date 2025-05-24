// import { ResponsePost } from "@/shared/utils/typesGlobal";
// import { OpcionEnvio } from "../typesEnvio";

// const fetchOpcionesEnvio= async(data: OpcionEnvio): Promise<ResponsePost> =>{
//     const response = await fetch('aca va la api',{
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(data)
//     })
//     if(!response.ok){
//         const errorData = await response.json()
//         throw new Error(errorData.message || 'Error al iniciar sesion');
//     }

//     // const envioData = await response.json()
//     return {success: true, message: 'envio exito'}
// }

// export default fetchOpcionesEnvio
