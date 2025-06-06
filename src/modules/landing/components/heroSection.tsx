'use client'

import Image from 'next/image';
import Link from 'next/link';
import useLanding from '../services/useLanding';
import { useState } from 'react';

type ReviewUser = {
    _id: string;
    name: string;
};

type ReviewText = {
    user: ReviewUser;
    rating: number;
    comment: string;
    _id: string;
    createdAt: string;
};

type Reviews = {
    scoring: number;
    totalRatings: number;
    reviewTexts: ReviewText[];
};

type ProductAttribute = {
    nombre: string;
    valor: string;
    _id: string;
};

export type ProductsLanding = {
    reviews: Reviews;
    _id: string;
    name: string;
    description: string;
    price: number;
    discount: number;
    stock: number;
    category: string;
    sold: number;
    attributes: ProductAttribute[];
    images: string[];

};

const Hero = () => {
    const [products, setProducts] = useState<ProductsLanding[]>([]);

    useLanding(setProducts);
    return (
        <section id="inicio" className="bg-green-50 py-16 px-4 md:px-0">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="md:w-1/2 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
                        El sabor de nuestra tierra <br /> en cada sorbo 🍃
                    </h1>
                    <p className="text-gray-700 mb-6 text-lg">
                        Descubrí los mejores mates, bombillas y kits materos artesanales. Envío a todo el país.
                    </p>
                    <Link href="/market">
                        <button className="bg-green-600 text-white px-6 py-3 rounded-full text-lg hover:bg-green-700 transition">
                            ¡Comprar ahora!
                        </button>
                    </Link>
                </div>
                <div className="md:w-1/2">
                    <Image
                        src={products[0]?.images[0] || '/logo.png'}
                        alt="Imagen de mate artesanal"
                        width={500}
                        height={500}
                        className="rounded-2xl shadow-lg mx-auto"
                    />
                </div>
            </div>
        </section>
    )
}

export default Hero;