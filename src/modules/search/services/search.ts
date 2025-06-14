import { ProductsLanding } from "@/modules/landing/components/heroSection";
import toast from "react-hot-toast";


export const getSearch = async (params: URLSearchParams): Promise<ProductsLanding[]> => {
    try {

        const query = new URLSearchParams(params).toString();
        console.log('query:',query.toString())
        const response = await fetch(`/api/auth/product?${query}`, {
            method: 'GET',
            credentials: 'include',
        });
        console.log('response:',response)
        if (!response.ok) {
            // throw new Error(`Error fetching orders: ${response.statusText}`);
            toast.error("Error al obtener los productos, por favor intente más tarde");
        }

        const data = await response.json();
        console.log('esto es data:',data)
        
        return data;
    } catch (error) {
        // console.error('Error fetching orders:', error);
        // throw error;
        toast.error(`${error instanceof Error ? error.message : "Error al obtener los productos"}`);
        return [];
    }
}