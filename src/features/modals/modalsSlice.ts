import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ProductAdditiveData} from "../../types/products.types";
import {getImgPath} from "../../utils/common/getAssetsPath";
import {addToStorage, getFromStorage} from "../../utils/common/LocalStorageExplorer";

type ModalSliceState = {
    loginOpened: boolean,
    bookingOpened: boolean,
    yourAddress: boolean,
    productAdditives: boolean,
    cookiesAccepted: boolean,
    deliveryWay: {
        opened: boolean
        variant: number
    },
    newAddress: boolean,
    bodyLocked: boolean,
    mobileMenu: boolean
    isChangingModeAdditives: boolean,
    orderHistory: boolean
    productAdditivesData: ProductAdditiveData,
    cartOpened: boolean,
    addressSuccess: {
        opened: boolean,
        title: string
    }
}

const initialState: ModalSliceState = {
    loginOpened: false,
    bookingOpened: false,
    yourAddress: false,
    productAdditives: false,
    orderHistory: false,
    bodyLocked: false,
    cookiesAccepted: getFromStorage("cookie_accepted") || false,
    deliveryWay: {
        opened: false,
        variant: 0
    },
    cartOpened: false,
    mobileMenu: false,
    newAddress: false,
    isChangingModeAdditives: false,
    productAdditivesData: {
        id: 0,
        description: "",
        imageUrl: "",
        name: "",
        dimensions: "",
        price: 0,
        is_combo: false,
        weight: 0,
        currentAdditive: 0,
        additives: [
        ],

    },
    addressSuccess: {
        opened: false,
        title: "Адрес успешно выбран!"
    }


}

export const ModalsSlice = createSlice({
    name: "modals",
    initialState,
    reducers: {
        handleCookieAccepted: (state) => {
            if(!state.cookiesAccepted) {
                state.cookiesAccepted = !state.cookiesAccepted
                addToStorage("cookie_accepted", true)
            }
        },
        setChangingAdditivesMode: (state, action: PayloadAction<boolean>) => {
            state.isChangingModeAdditives = action.payload
        },
        handleBooking: (state) => {
            state.bodyLocked = !state.bodyLocked
            state.bookingOpened = !state.bookingOpened
        },
        handleCartOpened: (state) => {
            state.bodyLocked = !state.bodyLocked
            state.cartOpened = !state.cartOpened
        },
        handleHistoryOrder: (state) => {
            state.bodyLocked = !state.bodyLocked
            state.orderHistory = !state.orderHistory
        },
        handleLogin: (state) => {
            state.bodyLocked = !state.bodyLocked
            state.loginOpened = !state.loginOpened
        },
        handleYourAddress: state => {
            state.bodyLocked = !state.bodyLocked
            state.yourAddress = !state.yourAddress
        },
        handleProductAdditives: state => {
            state.bodyLocked = !state.bodyLocked
            if(state.productAdditives) {
                state.isChangingModeAdditives = false
            }
            state.productAdditives = !state.productAdditives
        },
        setMobileMenu: (state, action: PayloadAction<boolean>) => {
            state.bodyLocked = !state.bodyLocked
          state.mobileMenu = action.payload
        },
        handleNewAddress: state => {
            state.bodyLocked = !state.bodyLocked
          state.newAddress = !state.newAddress
        },
        handleDeliveryWayWindow: (state) => {
            state.bodyLocked = !state.bodyLocked
            state.deliveryWay = {
                opened: !state.deliveryWay.opened,
                variant: state.deliveryWay.variant
            }
        },
        handleDeliveryVariant: (state, action: PayloadAction<number>) => {
            state.deliveryWay = {
                opened: state.deliveryWay.opened,
                variant: action.payload
            }
        },
        setProductAdditivesData: (state, action: PayloadAction<ProductAdditiveData>) => {
            state.productAdditivesData = action.payload
        },
        setAddressSuccess: (state, action: PayloadAction<boolean>) => {
            state.addressSuccess.opened = action.payload
        },
        setAddressSuccessTitle: (state, action) => {
            state.addressSuccess = {
                ...state.addressSuccess,
                title: action.payload
            }
        }

    }
})

export const {
    handleBooking,
    handleLogin,
    handleYourAddress,
    handleProductAdditives,
    setProductAdditivesData,
    handleCookieAccepted,
    handleDeliveryWayWindow,
    handleDeliveryVariant,
    handleNewAddress,
    setChangingAdditivesMode,
    handleCartOpened,
    handleHistoryOrder,
    setAddressSuccess,
    setAddressSuccessTitle,
    setMobileMenu,
} = ModalsSlice.actions


export const modalsReducer = ModalsSlice.reducer