import Image from 'next/image';
import mate2 from '../../../../public/mate2.webp'
import pp from '../../../../public/pp.png'
import preparacion from '../../../../public/preparacion.webp'
const products = [
    {
        id: 1,
        name: 'Kit Matero Clásico',
        description: 'Incluye mate de madera, bombilla de acero y yerbera.',
        image: mate2,
    },
    {
        id: 2,
        name: 'Kit Matero Premium',
        description: 'Mate de calabaza, bombilla de alpaca y bolsa matera.',
        image: pp,
    },
    {
        id: 3,
        name: 'Set de Viaje',
        description: 'Perfecto para llevar a todas partes. Incluye termo.',
        image: preparacion,
    },
];

const ProductList = () => {
    return (
        <section id="productos" className="py-16 px-4 bg-green-50">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-10">
                    Kits materos para regalar... o quedártelos 🧉
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-4">
                            <Image
                                src={product.image}
                                alt={product.name}
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
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductList;