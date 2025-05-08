
import { useRouter } from "next/router";
import { Header } from "@/modules/offers/components/header";
import { Footer } from "@/modules/offers/components/footer";
import Image from "next/image";
import { Product } from "@/modules/product/typesProduct";

const products: Product[] = [
    {
        id: "1",
        imagenUrl: "/vercel.svg",
        nombre: "Vercel Hosting",
        descripcion: "Campaña especial de hosting para tus proyectos web. Incluye despliegues ilimitados, certificado SSL gratuito y CDN global.",
        precio: 92,
        tipoEntrega: "domicilio",
        stock: 2,
    },
    {
        id: "2",
        imagenUrl: "/window.svg",
        nombre: "Windows License",
        descripcion: "Licencia original de Windows para tu computadora. Compatible con todas las versiones recientes.",
        precio: 44,
        tipoEntrega: "tienda",
        stock: 4,
    },
];

export default function ProductDetail() {
    const router = useRouter();
    const { id } = router.query;

    const product = products.find((p) => p.id === id);

    if (!product) {
        return <div>Producto no encontrado</div>;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow container mx-auto p-4">
                <button
                    onClick={() => router.back()}
                    className="mb-4 text-blue-600 hover:underline"
                >
                    Volver atrás
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="relative h-96 w-full">
                            <Image
                                src={product.imagenUrl}
                                alt={product.nombre}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-3xl font-bold">{product.nombre}</h1>
                        <p className="text-2xl font-semibold text-blue-600">
                            ${product.precio}
                        </p>

                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h2 className="text-xl font-semibold mb-2">Descripción</h2>
                            <p className="text-gray-700">{product.descripcion}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <h3 className="font-semibold">Tipo de entrega</h3>
                                <p>{product.tipoEntrega}</p>
                            </div>
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <h3 className="font-semibold">Stock disponible</h3>
                                <p>{product.stock} unidades</p>
                            </div>
                        </div>

                        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition">
                            Añadir al carrito
                        </button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}