import React from 'react';
import {handleOrderPickup, handleSelectAddressId, handleSelectRestaurant} from "../features/forms/formsSlice";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {getFromStorage} from "../utils/common/LocalStorageExplorer";


type OrderAddressHook = {
    getCurrentPickupAddress: () => any
    getCurrentDeliveryAddress: () => any
    handleChangeDeliveryType: () => any
}
const useOrderAddress = (): OrderAddressHook => {
    const marketAddresses = useAppSelector(state => state.main.cityAddresses)
    const {addresses} = useAppSelector(state => state.profile)
    const dispatch = useAppDispatch()
    const {
        isPickup,
        restaurant,
        addressId
    } = useAppSelector(state => state.forms.orderForm)

    const restFromStorage = getFromStorage('order_form')?.restaurant
    const addressFromStorage = getFromStorage('order_form')?.addressId

    const getCurrentPickupAddress = () => {
        if (restFromStorage !== -1) {
            return restFromStorage
        }
        if (restaurant !== -1) {
            return restaurant
        }
        if (marketAddresses.length > 0) {
            return marketAddresses[0].id
        }
        return 0
    }
    const getCurrentDeliveryAddress = () => {
        if (addressFromStorage !== -1) {
            return addressFromStorage
        }
        if (addressId !== -1) {
            return addressId
        }
        if (addresses.length > 0) {
            return addresses[0].id
        }
        return 0
    }
    const handleChangeDeliveryType = () => {
        dispatch(handleOrderPickup())
        if (!isPickup) {
            dispatch(handleSelectRestaurant(getCurrentPickupAddress()))
        } else {
            dispatch(handleSelectAddressId(getCurrentDeliveryAddress()))

        }

    }
    return {
        handleChangeDeliveryType,
        getCurrentDeliveryAddress,
        getCurrentPickupAddress
    }
};

export default useOrderAddress;