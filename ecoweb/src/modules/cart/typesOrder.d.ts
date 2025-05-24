
export interface OrderItem {
  product: string; // ID del producto como string
  quantity: number;
  unit_price: number;
}

export interface ShippingAddress {
  street: string;
  number: string;
  postal: string;
  city: string;
  province: string;
}

export type OrderState = 'pending' | 'in-process' | 'sent' | 'received' | 'cancelled';
export type DeliveryMethod = 'standard' | 'express' | 'urgent';

export interface Order {
  id: string; // ID principal como string (equivalente a _id de MongoDB)
  client: string; // ID del usuario como string
  date: string; // Fecha como ISO string (ej: "2023-10-25T12:00:00Z")
  total: number;
  state: OrderState;
  deliveryMethod: DeliveryMethod;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  createdAt?: string; // Opcional - Fecha de creación como ISO string
  updatedAt?: string; // Opcional - Fecha de actualización como ISO string
}