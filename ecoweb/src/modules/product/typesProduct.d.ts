import mongoose from "mongoose";

export interface ProductAttribute {
  nombre: string;
  valor: string;
}

export interface ProductReview {
  user: string | mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface ProductReviews {
  scoring: number;
  totalRatings: number;
  reviewTexts: ProductReview[];
}

export interface Product {
  id: string;
  _id?: mongoose.Types.ObjectId | string;
  name: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  category: string;
  sold: number;
  attributes: ProductAttribute[];
  images: string[];
  totalReview?: number;
  reviews?: ProductReviews;
  createdAt?: Date;
  updatedAt?: Date;
  deleted?: boolean;
}