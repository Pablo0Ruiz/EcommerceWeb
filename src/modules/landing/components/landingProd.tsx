'use client';

import Image from 'next/image';

import useLanding from '../services/useLanding';
import { useState } from 'react';
import { ProductsLanding } from './heroSection';
import Link from 'next/link';


const ProductList = () => {
    const [products, setProducts] = useState<ProductsLanding[]>([]);

    useLanding(setProducts);
    return (
        <section id="productos" className="py-16 px-4 bg-green-50">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-10">
                    Kits materos para regalar... o quedártelos 🧉
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <Link href={'/market'} key={product._id}>
                        <div key={product._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-4">
                            <Image
                                src={product?.images[0] || '/logo.png'}
                                alt={product?.name}
                                width={300}
                                height={200}
                                className="rounded-md mx-auto mb-4 object-cover"
                            />
                            <h3 className="text-xl font-semibold text-green-700 mb-2">{product.name}</h3>
                            <p className="text-gray-600 mb-4">{product.description}</p>
                            <button className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition">
                                Ver más
                            </button>
                        </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductList;