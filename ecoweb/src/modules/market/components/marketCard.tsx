import { PropsOffer } from "@/modules/market/typesHome";
import Image from "next/image";
import Link from "next/link";


const OfferCard: React.FC<PropsOffer> = ({ producto, add, remove, disminuirItem }) => {
    return (
        <div className="border p-4 rounded-md shadow-md hover:shadow-lg transition">
            <Link href={`/${producto.id}`}>
                <div className="cursor-pointer">
                    <Image
                        src={producto.images[0]}
                        alt={producto.name}
                        width={300}
                        height={200}
                    />
                </div>
                <h2 className="text-xl font-semibold">{producto.name}</h2>
                <p className="text-gray-700">{producto.description}</p>
                <p className="text-gray-700">{producto.price}</p>
            </Link>
            {add && remove && disminuirItem && (
                <div className="flex gap-2 mt-4 flex-wrap">
                    <button
                        onClick={() => add(producto)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    >
                        Añadir al carrito
                    </button>
                    <button
                        onClick={() => disminuirItem(producto.id)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                    >
                        -
                    </button>
                    <button
                        onClick={() => remove(producto.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                        Eliminar
                    </button>
                </div>
            )}
        </div>
    );
};


export default OfferCard