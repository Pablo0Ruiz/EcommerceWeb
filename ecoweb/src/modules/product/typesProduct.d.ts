import mongoose from "mongoose";
export interface ProductAttribute {
  nombre: string;
  valor: string;
}

export interface ProductReview {
  user: string | mongoose.Types.ObjectId; // Mejor usar ObjectId para consistencia con el modelo
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface ProductReviews {
  scoring: number;
  totalRatings: number;
  reviewTexts: ProductReview[];
}
//que coño pasa
export interface Product {
  id: string; // Para el frontend
  _id?: mongoose.Types.ObjectId | string; // Más preciso para MongoDB
  name: string;
  description: string;
  price: number;
  discount: number; // Cambiado a no opcional para coincidir con el modelo (default: 0)
  stock: number; // Cambiado a no opcional para coincidir con el modelo (default: 0)
  category: string;
  sold: number; // Cambiado a no opcional para coincidir con el modelo (default: 0)
  attributes: ProductAttribute[]; // Cambiado a no opcional (array vacío si no hay)
  images: string[];
  totalReview?: number; // Mantenido como opcional como en el modelo
  reviews?: ProductReviews; // Mantenido como opcional como en el modelo
  createdAt?: Date; // Añadido para los timestamps
  updatedAt?: Date; // Añadido para los timestamps
  deleted?: boolean; // Añadido para mongoose-delete
}