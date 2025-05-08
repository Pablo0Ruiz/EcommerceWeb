import { Props } from "../typesProduct";
import Image from "next/image";



const ProductCards: React.FC<Props> = ({ producto, add, remove, disminuirItem }) => {
    return (
        <div className="border p-4 rounded-b-md shadow-md">
            <Image 
                src={producto.imagenUrl} 
                alt={producto.nombre} 
                width={300}
                height={200} 
                />
            <h2 className="text-xl font-semibold">{producto.nombre}</h2>
            <p className="text-gray-700">{producto.descripcion}</p>
            <p className="text-gray-700">{producto.precio}</p>
            <div className="flex gap-2">
                <button onClick={()=> add(producto)} className="bg-blue-500 text-white p-2 rounded">
                    añadir al carrito
                </button>
                <button onClick={()=> disminuirItem(producto.id)} className="bg-yellow-500 text-white p-2 rounded">
                    restar cantidad de productos
                </button>
                <button onClick={()=> remove(producto.id)} className="bg-red-500 text-white p-2 rounded">
                    eliminar producto del carrito
                </button>
            </div>
        </div>
    )
}


export default ProductCards