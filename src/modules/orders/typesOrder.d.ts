
import { ShippingAddress } from "../cart/typesOrder";

export type OrderState = 'pending' | 'in-process' | 'sent' | 'received' | 'cancelled';
export type DeliveryMethod = 'standard' | 'express' | 'urgent';

export interface Order {
  _id: string;
  client: string; 
  date: Date | string;
  total: number;
  state: OrderState;
  deliveryMethod: DeliveryMethod; 
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deleted?: boolean;
  deletedAt?: Date | string;
  deletedBy?: string;
}

export interface OrderItem {
  product: string; 
  quantity: number;
  unit_price: number;
}

export interface OrderItemInput {
  product: string;
  quantity: number;
  unit_price: number;
}
export interface ShippingAddress {
  nombre: string;
  street: string;
  number?: string;
  city: string;
  postal?: string;
  province?: string;
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