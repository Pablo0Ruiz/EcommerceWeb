import { Product } from "../product/typesProduct";

export type CategoryFilterProps = {
    categories: Category[];
    onCategoryChange: (category: Category) => void;
}

export interface OfferCard extends Product{
    category?: string;
}

export interface PropsOffer {
    producto: Product,
    add?: (producto: Product) => void;
    remove?: (id: string) => void;
    disminuirItem?: (id: string) => void;
}