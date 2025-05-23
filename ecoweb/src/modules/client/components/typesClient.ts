// modules/client/typesClient.ts
export interface Address {
  id: string;
  name: string;
  street: string;
  floor: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}