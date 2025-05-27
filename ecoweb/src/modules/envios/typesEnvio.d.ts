export type ShippingMethod = 'standard' | 'express' | 'urgent';

export interface ShippingOption {
  method: ShippingMethod;
  label: string;
  price: number;
  deliveryTime: string;
}

