import {arraysEqual} from "../utils/common/arrayEquals";
import {handleLogin, handleProductAdditives, handleYourAddress} from "../features/modals/modalsSlice";
import {CartCountSupplementsRequest} from "../types/api.types";
import {
    addToCart,
    editSupplementsCountCart,
    setProductAfterAddress,
    setProductAfterLogin
} from "../features/cart/cartSlice";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import useToken from "./useToken";
import useCartAdd from "./useCartAdd";

const useSouse = (product_id: number) => {
    const dispatch = useAppDispatch()
    const token = useToken()
    const {souse} = useAppSelector(state => state.products)
    const cart = useAppSelector(state => state.cart.items)
    const thisProduct = souse.filter(prodItem => prodItem.id === product_id)[0]

    const handleAddToCartClick = () => {
        if (token) {
            const product = souse.filter(item => item.id === product_id)[0]
            dispatch(addToCart({
                ...product,
                supplements: []
            }))
        }
    }
    return [
        handleAddToCartClick
    ]
};

export default useSouse;