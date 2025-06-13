

import type { OrderItem, OrderInput } from "@/modules/orders/typesOrder";
import type { CartItem } from "@/modules/cart/typesCart";
import type { Address } from "@/modules/auth/typesAuth";
// orderUtils.ts
export const prepareOrderData = (
  cart: CartItem[],
  shippingAddress: Address
): OrderInput => {
  const items: OrderItem[] = cart.map((item) => ({
    product: item._id,
    quantity: item.quantity,
    unit_price: item.price,
  }));

  const total = parseFloat(
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
  );

  const determineDeliveryMethod = (): "standard" | "express" | "urgent" => {
    const methods = new Set(cart.map((item) => item.selectedShipping));
    if (methods.has("urgent")) return "urgent";
    if (methods.has("express")) return "express";
    return "standard";
  };

  return {
    date: new Date().toISOString(),
    total,
    state: "pending",
    deliveryMethod: determineDeliveryMethod(),
    items,
    shippingAddress,
  };
};
