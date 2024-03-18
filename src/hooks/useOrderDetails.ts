import {useEffect} from 'react';
import {getDeliveryType, setOrderDetails} from "../features/main/mainSlice";
import {useAppDispatch, useAppSelector} from "../app/hooks";

const useOrderDetails = () => {
    const cart = useAppSelector(state => state.cart)
    const dispatch = useAppDispatch()
    const {addresses} = useAppSelector(state => state.profile)
    const {currentGeo} = useAppSelector(state => state.main)
    const {
        isPickup,
        addressId
    } = useAppSelector(state => state.forms.orderForm)

    const defineDeliveryType = () => {
        if (cart.totalPrice > 0) {
            if (!isPickup) {
                if (addresses.length > 0) {
                    const address = addresses.filter(item => item.id === addressId)[0]
                    if (address !== undefined) {
                        dispatch(getDeliveryType({
                            siti_id: currentGeo.city,
                            lat: address.lat,
                            lon: address.long
                        }))
                    }
                }
            }
        }
    }

    useEffect(defineDeliveryType, [isPickup, addressId, addresses, cart.totalPrice])

    useEffect(() => {
        if (isPickup) {
            dispatch(setOrderDetails({
                price: 0,
                delivery_type: 0
            }))
            return;
        }
    }, [isPickup])
};

export default useOrderDetails;