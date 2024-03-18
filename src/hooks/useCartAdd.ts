import {
    cartAddedClose,
    cartAddedOpen,
    resetCartAddedPopupInfo,
    setCartAddedPopupInfo
} from "../features/cart/cartSlice";
import {useAppDispatch} from "../app/hooks";


const UseCartAdd = () => {
    const dispatch = useAppDispatch()
    const handleOpenAddedPopup = (title: string, weight: number) => {
        dispatch(setCartAddedPopupInfo({
            title,
            weight
        }))
        dispatch(cartAddedOpen())

        setTimeout(() => {
            dispatch(cartAddedClose())
            // setTimeout(() => {
            //     dispatch(resetCartAddedPopupInfo())
            // }, 300)
        }, 2000)
    }
    return handleOpenAddedPopup

};

export default UseCartAdd;