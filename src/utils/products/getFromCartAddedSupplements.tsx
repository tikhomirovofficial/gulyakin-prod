import {CartProductItem, Supplement} from "../../types/api.types";

export const getFromCartAddedSupplements = (cart: CartProductItem[], id: number, supplements: Supplement[]) => {
    return supplements?.length > 0 ?
        cart.some(cartProd => cartProd.product.id === id) ?
            cart.filter(cartProd => cartProd.product.id === id)[0]?.supplements.map(cartSup => cartSup.id) : []
        : []
}