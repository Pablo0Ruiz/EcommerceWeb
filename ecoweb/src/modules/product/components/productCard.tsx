import { Props } from "../typesProduct";
import Image from "next/image";



const ProductCards: React.FC<Props> = ({ producto, add, remove, disminuirItem }) => {
    return (
        <div className="bg-white border rounded-lg shadow-md p-6">
            <Image 
                src={producto.imagenUrl} 
                alt={producto.nombre} 
                width={300}
                height={200} 
                className="rounded-lg mb-4 object-cover"
                />
            <h2 className="text-2xl font-bold text-gray-800">{producto.nombre}</h2>
            <p className="text-gray-600 mb-2">{producto.descripcion}</p>
            <p className="text-green-600 font-semibold text-lg mb-4">{producto.precio}</p>
            <div className="flex gap-2 flex-wrap">
                <button onClick={()=> add(producto)} className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition">
                    añadir al carrito
                </button>
                <button onClick={()=> disminuirItem(producto.id)} className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg transition">
                    restar cantidad de productos
                </button>
                <button onClick={()=> remove(producto.id)} className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition">
                    eliminar producto del carrito
                </button>
            </div>
        </div>
    )
}


export default ProductCards