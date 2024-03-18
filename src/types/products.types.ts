import {Supplement} from "./api.types";

export type Product = {
    price: number
    imageUrl: string,
    name: string,
    is_multiple_supplements?: boolean,
    is_discount?: boolean,
    price_discount?: number,
    description: string,
    weight: number,
    dimensions: string
}

export type AdditiveProduct = Pick<Product, "name" | "imageUrl" |"price">

export type ProductAdditiveData = {
    id: number
    currentAdditive: number,
    cart_id?: number,
    is_combo: boolean,
    additives: Array<Supplement>
} & Product
