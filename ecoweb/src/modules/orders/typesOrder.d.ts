// modules/orders/typesOrder.d.ts
import { ShippingAddress } from "../cart/typesOrder";

export type OrderState = 'pending' | 'in-process' | 'sent' | 'received' | 'cancelled';
export type DeliveryMethod = 'standard' | 'express' | 'urgent';

export interface Order {
  _id: string;
  client: string; // ID del usuario
  date: Date | string;
  total: number;
  state: OrderState;
  deliveryMethod: DeliveryMethod; // Cambiado de string a tipo específico
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deleted?: boolean;
  deletedAt?: Date | string;
  deletedBy?: string;
}

export interface OrderItem {
  product: string; // ID del producto
  quantity: number;
}

export interface OrderItemInput {
  product: string;
  quantity: number;
}

export interface OrderInput {
  client: string;
  date?: Date | string;
  total: number;
  state?: OrderState;
  deliveryMethod: DeliveryMethod;
  items: OrderItemInput[];
  shippingAddress: ShippingAddress;
}