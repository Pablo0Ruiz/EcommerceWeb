"use client"
import { useCartStore } from "@/modules/cart/hook/cart";

const ProductShippingSelector = ({ productId }: { productId: string }) => {
  const { shippingOptions, setProductShipping, cart } = useCartStore();
  const product = cart.find(item => item.id === productId);
  
  if (!product) return null;

  return (
    <div className="mt-3 pl-8">
      <h4 className="text-sm font-medium text-gray-700 mb-2">Método de envío:</h4>
      <div className="space-y-2">
        {shippingOptions.map((option) => (
          <div key={option.method} className="flex items-center">
            <input
              type="radio"
              id={`${productId}-${option.method}`}
              name={`shipping-${productId}`}
              checked={product.selectedShipping === option.method}
              onChange={() => setProductShipping(productId, option.method)}
              className="mr-2"
            />
            <label htmlFor={`${productId}-${option.method}`} className="text-sm">
              {option.label} {option.price > 0 && `(+${option.price}€)`}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductShippingSelector;