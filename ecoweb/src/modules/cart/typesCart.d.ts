import { Product } from "../product/typesProduct";

export interface CartItem extends Product {
  quantity: number;
  selectedShipping?: ShippingMethod; // Añadimos el método de envío por producto
}
export interface CartState {
  productos: CartItem[];
  add: (producto: Product) => void;
  remove: (id: string) => void;
  disminuirItem: (id: string) => void;
}

export interface CartStore {
  cart: CartItem[];
  shippingMethod: ShippingMethod;
  shippingOptions: ShippingOption[];
  setShippingMethod: (method: ShippingMethod) => void;
  setProductShipping: (productId: string, method: ShippingMethod) => void;
  calculateProductTotal: (productId: string) => number;
  calculateTotal: () => number;
  addToCart: (product: Product) => void;
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
