import { ProductsLanding } from "../landing/components/heroSection";
import { Product } from "../product/typesProduct";

export type CategoryFilterProps = {
    categories: Category[];
    onCategoryChange: (category: Category) => void;
}

export interface OfferCard extends ProductsLanding{
    category?: string;
}

export interface PropsOffer {
    producto: ProductsLanding,
    add?: (producto: Product) => void;
    remove?: (id: string) => void;
    disminuirItem?: (id: string) => void;
}