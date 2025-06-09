// import { Product } from "../product/typesProduct";
import {ProductsLanding} from "../landing/components/heroSection";
export interface CartItem extends ProductsLanding {
  quantity: number;
  selectedShipping?: ShippingMethod; 
}

export interface CartStore {
  cart: CartItem[];
  shippingMethod: ShippingMethod;
  shippingOptions: ShippingOption[];
  setShippingMethod: (method: ShippingMethod) => void;
  setProductShipping: (productId: string, method: ShippingMethod) => void;
  calculateProductTotal: (productId: string) => number;
  calculateTotal: () => number;
  addToCart: (product: ProductsLanding) => void;
  removeFromCart: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;
  loadCart: () => void;
}

export interface CartListProps {
  showCheckoutButton?: boolean;
  showNextButton?: boolean;
  nextStepPath?: string;
  nextButtonLabel?: string;
}
