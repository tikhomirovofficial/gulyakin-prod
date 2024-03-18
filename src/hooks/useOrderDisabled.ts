import {useAppDispatch, useAppSelector} from "../app/hooks";
import {useEffect, useState} from "react";
import {setOrderWarning} from "../features/main/mainSlice";
import {appConfig} from "../config/AppConfig";
import { log } from "console";
import useActualPrice from "./useActualPrice";

type OrderDisabledHook = {
    orderDisabled: boolean
}
type OrderDisabledProps = {
    isCurrentWorkTime: boolean,
}
const useOrderDisabled = (props: OrderDisabledProps): OrderDisabledHook => {
    const dispatch = useAppDispatch()
    const {
        isPickup,
        restaurant,
        addressId
    } = useAppSelector(state => state.forms.orderForm)
    const {orderDetails, pickupAddresses, canOrder, workTimes, deliverySettings} = useAppSelector(state => state.main)
    const cart = useAppSelector(state => state.cart)
    const actualPrice = useActualPrice()
    const [disabled, setDisabled] = useState(false)


    const getDisabledBtn = () => {
        
        if(props.isCurrentWorkTime) {
            const cartFilled = cart.items.length !== 0
            if (cartFilled) {
                
                if (!isPickup) {

                    
                    if (canOrder) {
                        const addressSelected = (addressId !== 0 && addressId !== -1) // Удостоверяемся, что указан адрес доставки
                        if (addressSelected) {
                            const isCarDelivery = orderDetails.delivery_type === 2 //Доставка на машине
                            if (isCarDelivery) {
                                if (actualPrice < deliverySettings.autoDeliveryPrice) {
                                    setDisabled(true)
                                    dispatch(setOrderWarning({
                                        title: "Доставка недоступна",
                                        description: `Мы доставим ваш заказ от ${deliverySettings.autoDeliveryPrice} ₽`
                                    }))
                                    
                                    return
                                }
                                setDisabled(false)
                                return;
                            }
                            setDisabled(false)
                            return;
                        }
                        dispatch(setOrderWarning({
                            title: "Доставка недоступна",
                            description: `Адрес доставки не выбран`
                        }))
                        setDisabled(true)
                        return;
                    }
                    dispatch(setOrderWarning({
                        title: "Заказ недоступен",
                        description: `Ваши товары находятся из разных магазинов!`
                    }))
                    setDisabled(true)
                    return;
                }

                if (!canOrder) {
                    dispatch(setOrderWarning({
                        title: "Заказ недоступен",
                        description: `Ваши товары находятся из разных магазинов!`
                    }))
                    
                    setDisabled(true)
                    return;
                }

                const pickupAddressSelected = restaurant !== 0 && restaurant !== -1

                if (pickupAddressSelected) {
                    const pickupAddressesExist = pickupAddresses.length > 0
                    if (!pickupAddressesExist && canOrder) {
                        dispatch(setOrderWarning({
                            title: "Самовывоз недоступен",
                            description: `Нет доступных точек для самовывоза`
                        }))
                        setDisabled(true)
                        
                        return;
                    }
                    setDisabled(false)
                    return;
                }
                dispatch(setOrderWarning({
                    title: "Самовывоз недоступен",
                    description: `Не выбран адрес`
                }))
                setDisabled(true)
                return;
            }
            dispatch(setOrderWarning({
                title: "Заказ недоступен",
                description: `Добавьте товары в корзину`
            }))
            setDisabled(true)
            return;
        }
        dispatch(setOrderWarning({
            title: "Заказ недоступен",
            description: `Ресторан работает с ${workTimes.startTime} до ${workTimes.endTime}`
        }))
        setDisabled(true)

    }
    useEffect(getDisabledBtn, [
        cart.items,
        cart.totalPrice,
        pickupAddresses,
        canOrder,
        isPickup,
        addressId,
        restaurant,
        orderDetails])

    return {
        orderDisabled: disabled
    }
};

export default useOrderDisabled;