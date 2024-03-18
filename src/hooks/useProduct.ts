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

const useProduct = (product_id: number, addedSupplements: number[], neededWindow: boolean = true) => {
    const dispatch = useAppDispatch()
    const token = useToken()
    const handleAddedPopup = useCartAdd()

    const {addresses} = useAppSelector(state => state.profile)
    const {addressId, restaurant} = useAppSelector(state => state.forms.orderForm)
    const {items} = useAppSelector(state => state.products)
    const cart = useAppSelector(state => state.cart.items)

    const thisProduct = items.filter(prodItem => prodItem.id === product_id)[0]
    const handleWindowProduct = () => {
        if(neededWindow) {
            dispatch(handleProductAdditives())
        }
    }

    const saveChangesAdditives = () => {
        const cartProduct = cart.filter(item => item?.product !== undefined ? item.product.id === product_id && !item.is_combo : null)[0]
        const cart_id = cartProduct.id

        const supplementsThisCartProd = cartProduct?.supplements
        const supplementsThisProduct = thisProduct.supplements

        const supplementsIdsCartProd = supplementsThisCartProd?.map(item => {
            return item.id
        })
        const supplementsIdsProduct = supplementsThisProduct?.map(item => {
            return item.id
        })

        const addedEqualsCart = arraysEqual(supplementsIdsCartProd, addedSupplements)

        if (addedEqualsCart) {
            handleWindowProduct()
            return;
        }

        const changedData: CartCountSupplementsRequest = {
            cart_id: cart_id !== undefined ? cart_id : -1,
            supplements: supplementsIdsProduct.map(item => {
                const addedIncludesId = addedSupplements.includes(item)
                const thisSupplementProduct = supplementsThisProduct.filter(sup => sup.id === item)[0]
                const supplementCartId = thisSupplementProduct?.supplement_in_cart_id
                return {
                    supplements_id: item,
                    supplement_in_cart_id: supplementCartId !== undefined ? supplementCartId : 0,
                    added: addedIncludesId
                }
            })

        }

        dispatch(editSupplementsCountCart(changedData))
        handleWindowProduct()
    }

    const getAddedSupplements = () => {
        if(thisProduct?.supplements !== undefined) {
            return thisProduct.supplements.filter(item => {
                if (addedSupplements.includes(item.id)) {
                    return item
                }
            })
        }
        return []

    }

    const handleAddToCartClick = () => {
        const productDefferedData = {id: product_id, is_combo: false, supplements: addedSupplements}
        handleWindowProduct()
        if (token) {
            const deliveryIsDefined = (addressId !== -1 && addresses.length > 0) || restaurant !== -1
            if (deliveryIsDefined) {
                const product = items.filter(item => item.id === product_id)[0]
                dispatch(addToCart({
                    ...product,
                    supplements: getAddedSupplements()
                }))
                handleAddedPopup(thisProduct.title, thisProduct.weight)
                return;
            }
            dispatch(setProductAfterAddress(productDefferedData))
            dispatch(handleYourAddress())
            return
        }
        dispatch(setProductAfterLogin(productDefferedData))
        dispatch(handleLogin())

    }
    return [
        handleAddToCartClick,
        saveChangesAdditives,
        getAddedSupplements
    ]
};

export default useProduct;