import React, { useEffect } from 'react';
import LoginWindow from "./components/Windows/Login";
import BookingWindow from "./components/Windows/Booking";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import YourAddressWindow from "./components/Windows/YourAdress";
import ProductAdditives from "./components/Windows/ProductAdditives";
import CookiePopup from "./components/CookiePopup";
import DeliveryWay from "./components/Windows/DeliveryWay";
import NewAddress from "./components/Windows/NewAddress";
import AppRoutes from "./router/AppRoutes";
import Cart from "./components/Cart";
import { getCart, setDiscountPrice, setTotalPrice } from "./features/cart/cartSlice";
import { ScrollToTop } from "./components/ServiceComponents";
import { getAddressesUser } from "./features/profile/profileSlice";
import useToken from "./hooks/useToken";
import Header from "./components/Header";
import LogosSection from "./components/LogosSection";
import Footer from "./components/Footer";
import { getCombosByMarket, getProductByMarket, getSouses } from "./features/products/productsSlice";
import { getCategoriesByMarket } from "./features/categories/categoriesSlice";
import { addToStorage, getFromStorage } from "./utils/common/LocalStorageExplorer";
import {
    getAddressesByCity,
    getAddressesByMarketCity, getBookings, getCanOrderAddressesByCity,
    getCities,
    getDeliveries, getDeliverySettings, getMarketsByCity,
    getPayments,
    setIsMobile,
    setIsPhone,
    setWorkTimes
} from "./features/main/mainSlice";
import { setOrderForm } from "./features/forms/formsSlice";
import HeaderMobile from "./components/Header/mobile";
import MenuMobile from "./components/MenuMobile";
import CartWidget from "./components/Cart/widget";
import { isDateValid } from "./utils/forms/dataValidation";
import SuccessWindow from "./components/Windows/SuccessWindow";
import HistoryOrderWindow from "./components/Windows/HistoryOrder";
import { log } from 'console';
import { getDayOfWeekNumber } from './utils/datetime/getWeekDay';
import { deleteSeconds } from './utils/datetime/deleteSecondsInTime';

const MOBILE_WIDTH = 1100
const SMALL_WIDTH = 800


function App() {
    const dispatch = useAppDispatch()
    const token = useToken()
    const {
        bookingOpened,
        loginOpened,
        yourAddress,
        cartOpened,
        cookiesAccepted,
        deliveryWay,
        productAdditives,
        newAddress,
        orderHistory,
        addressSuccess,
        bodyLocked
    } = useAppSelector(state => state.modals)
    const { mobileMenu } = useAppSelector(state => state.modals)
    const { items } = useAppSelector(state => state.cart)
    const orderForm = useAppSelector(state => state.forms.orderForm)
    const profile = useAppSelector(state => state.profile)

    const { market, cities, currentGeo, isMobile, cityAddresses, pickupAddresses, isDarkTheme } = useAppSelector(state => state.main)

    const handleResize = () => {
        dispatch(setIsMobile(window.innerWidth <= MOBILE_WIDTH))
        dispatch(setIsPhone(window.innerWidth <= SMALL_WIDTH))
    }


    useEffect(() => {
        window.addEventListener('resize', () => {
            setTimeout(handleResize, 800)
        })
        handleResize()
        dispatch(getDeliveries())
        dispatch(getPayments())
        dispatch(getDeliverySettings())

    }, [])

    useEffect(() => {
        if (orderForm?.restaurant != -1 || orderForm?.addressId != -1) {
            addToStorage("order_form", {
                restaurant: orderForm.restaurant,
                address: orderForm.address.val,
                addressId: orderForm.addressId

            })
        }
    }, [orderForm])

    useEffect(() => {

        dispatch(setTotalPrice(
            items.reduce((prev, cur) => {
                const curProduct = cur.product
                const cartProductDefined = curProduct !== undefined
                const cartProductHasSupplements = cur.supplements !== undefined


                if (cartProductDefined) {

                    if (cartProductHasSupplements) {

                        return prev + (cur.count * curProduct.price) + (cur.supplements.reduce((p, c) => {
                            return p + c.price
                        }, 0))
                    }
                    return prev + (cur.count * curProduct.price)

                }
                return prev

            }, 0)
        ))
        dispatch(setDiscountPrice(
            items.reduce((prev, cur) => {
                const curProduct = cur.product
                const cartProductDefined = curProduct !== undefined
                const cartProductHasSupplements = cur.supplements !== undefined

                if (cartProductDefined) {

                    if (cartProductHasSupplements) {

                        return prev + (cur.count * (curProduct.price_discount || 0)) + (cur.supplements.reduce((p, c) => {
                            return p + c.price
                        }, 0))
                    }
                    return prev + (cur.count * (curProduct.price_discount || 0))

                }
                return prev

            }, 0)
        ))

    }, [items])

    useEffect(() => {
        const date = new Date()

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        dispatch(getCategoriesByMarket({ market_id: market }))
        dispatch(getProductByMarket({
            market_id: market,
            date: `${day}-${month}-${year}`
        }))
        dispatch(getCombosByMarket({ market_id: market }))
        dispatch(getSouses())
        if (!cities.length) {
            dispatch(getCities())
        }
        const gettedOrderForm = getFromStorage("order_form")
        if (gettedOrderForm !== undefined && gettedOrderForm !== null) {
            const restaurantId = gettedOrderForm?.restaurant
            const addressId = gettedOrderForm?.addressId
            if (restaurantId != -1 || addressId != -1) {
                dispatch(setOrderForm({
                    restaurant: gettedOrderForm.restaurant,
                    address: gettedOrderForm.address,
                    addressId: gettedOrderForm.addressId
                }))
            }
        }

    }, [market])

    useEffect(() => {
        if (token) {
            dispatch(getCart())
            dispatch(getAddressesUser())
        }
    }, [token])
    useEffect(() => {
        if (isDarkTheme) {
            document.body.classList.add("dk-white-bg")
        }
    }, [isDarkTheme])

    useEffect(() => {
        if (cities.length > 0) {
            dispatch(getAddressesByMarketCity({
                market_id: market,
                siti_id: currentGeo.city
            }))
        }
    }, [cities, currentGeo.city, market])

    useEffect(() => {
        window.scrollTo(0, 0)
        if (cities.length > 0) {
            dispatch(getBookings({
                siti_id: currentGeo.city
            }))
            dispatch(getMarketsByCity({
                siti_id: currentGeo.city
            }))
            dispatch(getAddressesByCity({
                siti_id: currentGeo.city
            }))
        }
    }, [cities, currentGeo.city])

    useEffect(() => {
        if (token) {
            const hasAddresses = cityAddresses.length > 0
            const hasCart = items.length > 0
            const hasDeliveryAddress = orderForm.addressId > 0
            const userHasAddresses = profile.addresses.length > 0
            const defaultAddressId = 17

            if (hasCart && hasAddresses) {
                dispatch(getCanOrderAddressesByCity({
                    siti_id: currentGeo.city,
                    adress_id: hasDeliveryAddress ? orderForm.addressId : userHasAddresses ? profile.addresses[0].id : defaultAddressId
                }))
            }
        }

    }, [cityAddresses, items, orderForm.addressId, orderForm.isPickup])
    useEffect(() => {
        const appNode = document.body
        if(appNode !== null && (mobileMenu || deliveryWay.opened)) {
            appNode?.classList.add("of-y-hide")
        } else {
            appNode?.classList.remove("of-y-hide")
        }
    }, [mobileMenu, deliveryWay.opened])

    // useEffect(() => {
    //     if(orderForm.isPickup && orderForm.restaurant > 0) {
    //         const currentRest = pickupAddresses.filter(item => item.id === orderForm.restaurant)[0]
    //         const weekDay = getDayOfWeekNumber()
    //         console.log(currentRest)
    //         if(currentRest.time !== undefined) {
    //             dispatch(
    //                 setWorkTimes({
    //                     startTime: deleteSeconds(currentRest.time[weekDay - 1][0]),
    //                     endTime: deleteSeconds(currentRest.time[weekDay - 1][1]),
    //                     isAroundTime: false
    //                 })
    //             )
    //         }

    //         // dispatch(setWorkTimes({

    //         // }))

    //     }
    // }, [orderForm.isPickup, pickupAddresses, orderForm.restaurant])

    return (
        <>
            <ScrollToTop />
            <div className={`App f-column jc-between`}>
                <div className="f-column">
                    {isMobile ? <HeaderMobile /> : <Header />}
                    <LogosSection />
                    <AppRoutes isAuth={false} />
                </div>
                <Footer />
                <SuccessWindow closeHandle={() => { }} isOpened={addressSuccess.opened} title={addressSuccess.title} />
                {isMobile ? <CartWidget /> : null}
                {loginOpened ? <LoginWindow /> : null}
                {yourAddress ? <YourAddressWindow /> : null}
                {deliveryWay.opened ? <DeliveryWay /> : null}
                {productAdditives ? <ProductAdditives /> : null}
                {orderHistory ? <HistoryOrderWindow /> : null}
                {newAddress ? <NewAddress /> : null}
                {cartOpened ? <Cart /> : null}
                <CookiePopup isOpened={cookiesAccepted} />
            </div>
            {isMobile ? <MenuMobile /> : null}
        </>


    );
}

export default App;
