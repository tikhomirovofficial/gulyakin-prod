import { getTokens } from "../utils/auth/storeTokens";
import { useAppSelector } from "../app/hooks";

const useActualPrice = () => {
    const { totalPrice, totalDiscountPrice } = useAppSelector(state => state.cart)
    const hasDiscount = totalPrice !== totalDiscountPrice
    return hasDiscount ? totalDiscountPrice !== undefined ? totalDiscountPrice : 0 : totalPrice
};

export default useActualPrice;