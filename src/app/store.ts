import { configureStore } from '@reduxjs/toolkit'
import {profileReducer} from "../features/profile/profileSlice";
import {modalsReducer} from "../features/modals/modalsSlice";
import {mainReducer} from "../features/main/mainSlice";
import {restaurantsReducer} from "../features/restaurants/restaurantsSlice";
import {cartReducer} from "../features/cart/cartSlice";
import {formsReducer} from "../features/forms/formsSlice";
import {productsReducer} from "../features/products/productsSlice";
import {categoriesReducer} from "../features/categories/categoriesSlice";
import {ordersHistoryReducer} from "../features/orders-history/orderHistorySlice";

export const store = configureStore({
    reducer: {
        profile: profileReducer,
        modals: modalsReducer,
        main: mainReducer,
        restaurants: restaurantsReducer,
        cart: cartReducer,
        forms: formsReducer,
        products: productsReducer,
        categories: categoriesReducer,
        ordersHistory: ordersHistoryReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch