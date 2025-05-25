import type { Order, OrderItem } from "@/modules/orders/typesOrder";
import type { User } from "@/modules/auth/typesAuth";
import type { CartItem } from "@/modules/cart/typesCart";

export const createNewOrder = (
  user: User | null,
  cart: CartItem[]
): Order | null => {
  if (!user) return null;

  const items: OrderItem[] = cart.map((item) => ({
    product: item.id,
    quantity: item.quantity,
    unit_price: item.price,
  }));

  const total = parseFloat(
    cart.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2)
  );

  return {
    _id: `mock-order-${Date.now()}`,
    client: user._id,
    date: new Date().toISOString(),
    total,
    state: "pending",
    deliveryMethod: Array.from(
      new Set(cart.map((i) => i.selectedShipping || "standard"))
    ).join(", "),
    items,
    shippingAddress: user.address[0] || {
      street: "",
      number: "",
      postal: "",
      city: "",
      province: "",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

export const saveOrderToLocalStorage = (order: Order): void => {
  const existing = JSON.parse(localStorage.getItem("orders") || "[]") as Order[];
  existing.push(order);
  localStorage.setItem("orders", JSON.stringify(existing));
};