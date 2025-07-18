import { Product } from "./typesProduct";
import { CartItem } from "../cart/typesCart";

export interface ProductCardProps {
  producto: CartItem;
  add: (product: Product) => void;
  remove: (productId: string) => void;
  disminuirItem: (productId: string) => void;
}