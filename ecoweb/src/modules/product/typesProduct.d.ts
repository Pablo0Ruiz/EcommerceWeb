
export interface Product {
    id: string,
    imagenUrl: string,
    nombre: string,
    descripcion: string,
    precio: number,
    tipoEntrega: string,
    stock: number,

}

export interface Props {
    producto: Product,
    add: (producto: Product) => void;
    remove: (id: string) => void;
    disminuirItem: (id: string) => void;
}