import { useEffect } from "react";
import { ProductsLanding } from "../components/heroSection";
import toast from "react-hot-toast";

export default function useLanding(setProducts: (products: ProductsLanding[]) => void) {
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/auth/product', {
          method: 'GET',
        });
        const data: ProductsLanding[] = await response.json();
        setProducts(data);
      } catch (error) {
        // console.error('Error fetching products:', error);
        toast.error(`${error instanceof Error ? error.message : "Error al cargar los productos"}`);
      }
    };
    fetchProducts();
  }, [setProducts]);
  
}
