// src/modules/cart/utils/orderUtils.ts
import type { OrderItem, OrderInput } from "@/modules/orders/typesOrder";
import type { CartItem } from "@/modules/cart/typesCart";
import { Address } from "@/modules/auth/typesAuth";

export const prepareOrderData = (
  user: {_id:string } | null,
  cart: CartItem[],
  shippingAddress: Address
): OrderInput | null => {
  if (!user) return null;

  const items: OrderItem[] = cart.map((item) => ({
    product: item.id,
    quantity: item.quantity,
    unit_price: item.price,
  }));

  const total = parseFloat(
    cart.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2)
  );

  const determineDeliveryMethod = (): 'standard' | 'express' | 'urgent' => {
    const methods = new Set(cart.map((i) => i.selectedShipping));
    if (methods.has('urgent')) return 'urgent';
    if (methods.has('express')) return 'express';
    return 'standard';
  };

  return {
    client: user._id,
    date: new Date().toISOString(),
    total,
    state: "pending",
    deliveryMethod: determineDeliveryMethod(),
    items,
    shippingAddress,
  };
};
