export interface ProductAttribute {
    nombre: string;
    valor: string;
  }
  
  export interface ProductReview {
    user: string; // o ObjectId si prefieres
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
    id?: string; // Para el frontend
    _id?: string; // Para MongoDB
    name: string;
    description: string;
    price: number;
    discount?: number;
    stock?: number;
    category: string;
    sold?: number;
    attributes?: ProductAttribute[];
    images: string[];
    totalReview?: number;
    reviews?: ProductReviews;
  }
