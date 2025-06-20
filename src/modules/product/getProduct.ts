import { ProductsLanding } from "@/modules/landing/components/heroSection";

export const getProduct = async (id: string): Promise<ProductsLanding> => {

  
  const response = await fetch(`/api/auth/product/${id}`, {
    method: 'GET',
    credentials: 'include',
  });



  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error response:', errorData);
    throw new Error(errorData.message || "Error al obtener el producto");
  }

  const data = await response.json();

  
  // Verificar si faltan campos importantes
  const requiredFields = ['_id', 'name', 'description', 'price', 'images'];
  const missingFields = requiredFields.filter(field => !data[field]);
  
  if (missingFields.length > 0) {
    console.warn('Missing fields in product:', missingFields);
  }
  
  return data;
};