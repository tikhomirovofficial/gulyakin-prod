import {Product} from "./products.types";

export type CartProduct = {
    id: number,
    canBeChanged?: boolean,
    isNotCanBeAdded?: boolean,
    count: number,
}
& Pick<Product, "price" | "imageUrl" | "name" | "description" >