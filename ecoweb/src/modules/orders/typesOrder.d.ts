import { ShippingAddress } from "../cart/typesOrder";

export interface Order {
  _id: string;
  client: string; // Solo el ID del usuario (Mongo ObjectId como string)
  date: string | Date;
  total: number;
  state: 'pending' | 'in-process' | 'sent' | 'received' | 'cancelled';
  deliveryMethod: string
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  deleted?: boolean;
  deletedAt?: string | Date;
  deletedBy?: string; // ID del usuario que borró, opcional
}

export interface OrderItem {
  product: string; // Solo el ID del producto (Mongo ObjectId como string)
  quantity: number;
  unit_price: number;
}

export interface OrderItemInput {
  product: string; // ID del producto
  quantity: number;
  unit_price: number;
}

export interface OrderInput {
  client: string; // ID del usuario
  date: string;
  total: number;
  state: 'pending' | 'in-process' | 'sent' | 'received' | 'cancelled';
  deliveryMethod: 'standard' | 'express' | 'urgent';
  items: OrderItemInput[];
  shippingAddress: ShippingAddress;
}
