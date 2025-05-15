export type ResponseGet ={
    status: number,
    producto:string[]
}

export const GetProduct = async (): Promise<ResponseGet>=>{
    const response = await fetch('aca va la api')
    if(!response.ok){
        
        throw new Error('no se pudo obtener los producto') 
    }
    return await response.json()
}