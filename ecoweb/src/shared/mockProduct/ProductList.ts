// data/products.ts
import { Product } from "@/shared/mockProduct/product";
import { image } from "@/shared/components/imag";

export const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Termo super bueno",
    description: "Mantiene el agua caliente 24h",
    price: 199.98,
    discount: 10, // 10% de descuento
    stock: 50,
    category: "Termos",
    sold: 100000,
    attributes: [
      { nombre: "Material", valor: "Acero inoxidable" },
      { nombre: "Capacidad", valor: "1 litro" }
    ],
    images: [image.mateKit],
    totalReview: 100000,
    reviews: {
      scoring: 4.2,
      totalRatings: 100000,
      reviewTexts: []
    }
  },
  {
    id: "2",
    name: "Mate premium",
    description: "Mate de calabaza con virola de alpaca",
    price: 89.99,
    discount: 0,
    stock: 0,
    category: "Mates",
    sold: 0,
    attributes: [],
    images: [image.mate2],
    totalReview: 50000,
    reviews: {
      scoring: 4.8,
      totalRatings: 50000,
      reviewTexts: []
    }
  }

];