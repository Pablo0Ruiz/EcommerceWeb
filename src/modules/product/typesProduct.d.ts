import mongoose from "mongoose";
import { ProductsLanding } from "./productsLanding";
export interface ProductAttribute {
  nombre: string;
  valor: string;
  _id?: string;
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



export interface Product extends ProductsLanding {
  id?: string;
  updatedAt?: string;
  deleted?: boolean;

}