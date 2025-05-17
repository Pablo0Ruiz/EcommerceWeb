// shared/mockProduct/ProductList.ts
import { Product } from "../typesProduct";
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
    images: [image.mateKit, image.mate2],
    totalReview: 100000,
    reviews: {
      scoring: 4.2,
      totalRatings: 100000,
      reviewTexts: [
        {
          user: "64a1b2c3d4e5f6a7b8c9d0e1", // Mock ObjectId
          rating: 4,
          comment: "Excelente producto, mantiene el agua caliente como prometen",
          createdAt: new Date("2023-06-15T10:30:00Z")
        },
        {
          user: "64a1b2c3d4e5f6a7b8c9d0e2",
          rating: 5,
          comment: "El mejor termo que he comprado, calidad premium",
          createdAt: new Date("2023-05-24T14:15:00Z")
        },
        {
          user: "64a1b2c3d4e5f6a7b8c9d0e3",
          rating: 4,
          comment: "Muy buen termo aunque un poco pesado",
          createdAt: new Date("2023-04-10T08:45:00Z")
        }
      ]
    },
    createdAt: new Date("2023-01-10T08:00:00Z"),
    updatedAt: new Date("2023-06-20T09:15:00Z")
  },
  {
    id: "2",
    name: "Mate premium",
    description: "Mate de calabaza con virola de alpaca",
    price: 89.99,
    discount: 0,
    stock: 1,
    category: "Mates",
    sold: 0,
    attributes: [],
    images: [image.mate2],
    totalReview: 50000,
    reviews: {
      scoring: 4.8,
      totalRatings: 50000,
      reviewTexts: [
        {
          user: "64a1b2c3d4e5f6a7b8c9d0e4",
          rating: 5,
          comment: "Artesanía de primera calidad, muy satisfecho",
          createdAt: new Date("2023-06-18T16:45:00Z")
        },
        {
          user: "64a1b2c3d4e5f6a7b8c9d0e5",
          rating: 5,
          comment: "Perfecto para el mate diario, muy bonito",
          createdAt: new Date("2023-05-30T11:20:00Z")
        }
      ]
    },
    createdAt: new Date("2023-02-15T10:00:00Z"),
    updatedAt: new Date("2023-06-19T11:20:00Z")
  }
];