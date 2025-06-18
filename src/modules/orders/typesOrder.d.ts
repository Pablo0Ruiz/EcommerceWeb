import { Document } from 'mongoose';

export type OrderState = 'pending' | 'in-process' | 'sent' | 'received' | 'cancelled';
export type DeliveryMethod = 'standard' | 'express' | 'urgent';

export interface OrderItem {
  _id?: string;
  quantity: number;
  unit_price: number;
  product: string | ProductsLanding;
}

export interface ShippingAddress {
  street: string;
  number?: string;
  city: string;
  postal?: string;
  province?: string;
  // Nota: Falta 'nombre' que usas en la plantilla pero no en el controlador
}

export interface OrderInput {
  items: Array<{
    product: string;
    quantity: number;
    unit_price?: number; // Si también necesitas esto
  }>;
  deliveryMethod: DeliveryMethod;
  shippingAddress: ShippingAddress;
  date?: string; // Opcional
  total?: number; // Opcional
  state?: string; // Opcional
}

export interface Order extends Document {
  _id: string;
  client: string; // ID del usuario
  date: Date;
  total: number;
  state: OrderState;
  deliveryMethod: DeliveryMethod;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  createdAt?: Date;
  updatedAt?: Date;
}

// Para respuestas populadas
export interface PopulatedOrder extends Omit<Order, 'items'> {
  items: Array<{
    product: {
      _id: string;
      name: string;
    };
    quantity: number;
    unit_price: number;
  }>;
}