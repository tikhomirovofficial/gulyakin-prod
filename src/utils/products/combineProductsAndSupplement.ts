import {CartProductItem, ProductRes, Supplement} from "../../types/api.types";

const res: any[] = [
    {
        cart_id: 3,
        id: 8,
        price: 100.0,
        type: "PRODUCT",
        count: "",
        composition: "",
        image: ""
    }
]

export type CartProductSupplement = Omit<CartProductItem | Supplement, "product">
export const combinedArray = (data: CartProductItem[],): CartProductSupplement[] => {
    let result: CartProductSupplement[] = []

    result = data.flatMap(item => {
        const productData = {
            count: item.count,
            supplements: item.supplements,
            id: item.id,
            image: item.product.image,
            composition: item.product.composition,
            price: item.product.price,
            short_description: item.product.short_description,
            title: item.product.title,

        };

        const supplementData = item.supplements.map(supItem => {
            return {
                supplements: [],
                count: supItem,
                id: supItem.id,
                image: supItem.image,
                price: supItem.price,
                composition: item.product.composition,
                short_description: supItem.short_description,
                title: supItem.title
            };
        });

        return [productData, ...supplementData];
    });
    return result
}