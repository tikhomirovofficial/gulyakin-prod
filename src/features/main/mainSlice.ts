import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addToStorage, getFromStorage } from "../../utils/common/LocalStorageExplorer";
import { AxiosResponse } from "axios";
import {
    AddressByCityItem,
    AddressByMarketCity,
    CanOrderAddressesByCityRequest,
    CanOrderAddressesByCityResponse,
    CanOrderByCityRequest,
    CanOrderByCityResponse, DeliveryAddress,
    GetAddressesByMarketCityRequest,
    GetAddressesByMarketCityResponse,
    GetBookingsRequest,
    GetBookingsResponse,
    GetByCityAddressesRequest,
    GetByCityAddressesResponse,
    GetCitiesResponse,
    GetDeliveryListResponse,
    GetDeliverySettingsResponse,
    GetMarketsByCityRequest,
    GetMarketsByCityResponse,
    GetOrderDeliveryRequest,
    GetOrderDeliveryResponse,
    GetPaymentListResponse,
    MarketByCityItem,
    OrderDeliveryDetails
} from "../../types/api.types";
import { AddressesApi } from "../../http/api/addresses.api";
import { OrderApi } from "../../http/api/order.api";
import { MarketApi } from "../../http/api/market.api";
import { getDayOfWeekNumber } from "../../utils/datetime/getWeekDay";
import { deleteSeconds } from "../../utils/datetime/deleteSecondsInTime";

type Market = {
    title: string,
    id: number
    link_id: number
}
type VariantType = {
    title: string,
    id: number
}

export type AddressType = {
    id: number,
    adress: string
    link: number
    lat: number
    long: number
    time: Array<string[]>
}
export type OrderWarning = {
    title: string
    description: string
}
export type WorkTimes = {
    startTime: string
    endTime: string,
    isAroundTime: boolean
}
type MainSliceState = {
    isDarkTheme: boolean,
    lightAppColor: string,
    darkAppColor: string,
    market: number,
    phone: string,
    cities: Array<{
        id: number,
        name: string
    }>
    changingGeo: boolean,
    addresses: Array<AddressByMarketCity>
    askCityVisible: boolean,
    currentGeo: {
        city: number
    }
    isMobile: boolean
    isPhone: boolean,
    canOrder: boolean
    workTimes: WorkTimes
    orderWarning: OrderWarning
    markets: Array<Market>
    payments: VariantType[],
    deliveryTypes: VariantType[],
    bookingAddresses: AddressType[],
    cityMarkets: MarketByCityItem[],
    orderDetails: OrderDeliveryDetails
    deliveryAddress: DeliveryAddress
    cityAddresses: AddressByCityItem[],
    pickupAddresses: AddressByCityItem[],
    deliverySettings: {
        personDeliveryPrice: number
        autoDeliveryPrice: number
    }
}
const initialState: MainSliceState = {
    market: getFromStorage('market') || -1,
    lightAppColor: "#9A9A9A",
    darkAppColor: "#F8CAA9",
    isDarkTheme: !true,
    phone: "+78005002797",
    cities: [],
    changingGeo: false,
    addresses: [],
    isMobile: false,
    isPhone: false,
    askCityVisible: !(getFromStorage("city_accepted") !== undefined && getFromStorage("city_accepted") !== null),
    currentGeo: {
        city: getFromStorage("city") || 0
    },
    payments: [],
    deliveryTypes: [],
    bookingAddresses: [
        {
            id: 0,
            adress: "",
            link: 0,
            lat: 0,
            long: 0,
            time: []
        }
    ],
    cityMarkets: [],
    cityAddresses: [],
    pickupAddresses: [],
    deliverySettings: {
        personDeliveryPrice: 0,
        autoDeliveryPrice: 0
    },
    deliveryAddress: {
        adress: "",
        id: 0,
        image: [],
        is_around_clock: false,
        lat: 0,
        long: 0,
        market: { id: 0, link: 0, name: "", short_description: "" },
        phone: "",
        time: [],
        timeaone: ""
    },
    workTimes: {
        startTime: "8:00",
        endTime: "23:00",
        isAroundTime: false
    },
    canOrder: true,
    orderWarning: {
        description: "",
        title: ""
    },

    orderDetails: {
        delivery_type: 0, price: 0
    },
    markets: [
        {
            id: 2,
            link_id: 2,
            title: "Гуленьки Пельменная"
        },
        {
            id: 3,
            link_id: 3,
            title: "Гуленьки Блинная"
        },
        {
            id: 4,
            link_id: 4,
            title: "IFOOD"
        },
        {
            id: 5,
            link_id: 1,
            title: "Фудхолл"
        },
        {
            id: 6,
            link_id: 5,
            title: "Воробушек"
        },
        {
            id: 7,
            link_id: 6,
            title: "GUSTO"
        },
        {
            id: 8,
            link_id: 7,
            title: "Креветочная"
        },
        {
            id: 9,
            link_id: 8,
            title: "Гулибули"
        }
    ]
}
export const getCities = createAsyncThunk(
    'cities/get',
    async (_, { dispatch }) => {
        const res: AxiosResponse<GetCitiesResponse> = await AddressesApi.Cities()
        if (res.data.siti.length) {
            return {
                cities: res.data.siti
            }
        }
        return {
            cities: []
        }
    }
)

export const getDeliveries = createAsyncThunk(
    'deliveries/get',
    async (_, { dispatch }) => {
        const res: AxiosResponse<GetDeliveryListResponse> = await OrderApi.DeliveriesWays()
        return res.data.delivery_list
    }
)
export const getDeliverySettings = createAsyncThunk(
    'delivery/settings/get',
    async (_, { dispatch }) => {
        const res: AxiosResponse<GetDeliverySettingsResponse> = await OrderApi.DeliverySettings()
        return res.data
    }
)

export const getCanOrderByCity = createAsyncThunk(
    'can/order/get',
    async (request: CanOrderByCityRequest, { dispatch }) => {
        const res: AxiosResponse<CanOrderByCityResponse> = await OrderApi.GetCanOrderByCity(request)
        return res.data
    }
)
export const getCanOrderAddressesByCity = createAsyncThunk(
    'can/pickup/addresses/get',
    async (request: CanOrderAddressesByCityRequest, { dispatch }) => {
        const res: AxiosResponse<CanOrderAddressesByCityResponse> = await OrderApi.GetCanOrderAddressesByCity(request)
        return res.data
    }
)
export const getMarketsByCity = createAsyncThunk(
    'markets/city/get',
    async (request: GetMarketsByCityRequest, { dispatch }) => {
        const res: AxiosResponse<GetMarketsByCityResponse> = await MarketApi.MarketsByCity(request)
        if (res?.data) {
            if (res.data.market.length) {
                dispatch(setMarket(res.data.market[0].id))
            }
        }
        return res.data.market
    }
)
export const getBookings = createAsyncThunk(
    'bookings/get',
    async (request: GetBookingsRequest, { dispatch }) => {
        const res: AxiosResponse<GetBookingsResponse> = await AddressesApi.Bookings(request)
        return res.data.booking
    }
)
export const getDeliveryType = createAsyncThunk(
    'delivery/type/get',
    async (request: GetOrderDeliveryRequest, { dispatch }) => {
        const res: AxiosResponse<GetOrderDeliveryResponse> = await OrderApi.GetTypeDelivery(request)
        return res.data
    }
)
export const getAddressesByCity = createAsyncThunk(
    'addresses/city/get',
    async (request: GetByCityAddressesRequest, { dispatch }) => {
        const res: AxiosResponse<GetByCityAddressesResponse> = await AddressesApi.AddressesByCityId(request)
        return res.data.adress
    }
)

export const getPayments = createAsyncThunk(
    'payments/get',
    async (_, { dispatch }) => {
        const res: AxiosResponse<GetPaymentListResponse> = await OrderApi.PaymentsWays()
        return res.data.payment_list
    }
)
export const getAddressesByMarketCity = createAsyncThunk(
    'addresses/get',
    async (request: GetAddressesByMarketCityRequest, { dispatch }) => {
        const res: AxiosResponse<GetAddressesByMarketCityResponse> = await AddressesApi.AddressInfoByCityAndMarketId(request)
        return res.data.adress
    }
)
export const MainSlice = createSlice({
    name: "main",
    initialState,
    reducers: {
        setWorkTimes: (state, action: PayloadAction<WorkTimes>) => {
            state.workTimes = action.payload
        },
        setCurrentCity: (state, action: PayloadAction<number>) => {
            state.currentGeo.city = action.payload
            addToStorage("city", action.payload)
            if (!getFromStorage("city_accepted")) {
                addToStorage("city_accepted", true)
            }
        },
        toggleChangingGeo: (state) => {
            state.changingGeo = !state.changingGeo
        },
        toggleAskCityVisible: (state) => {
            state.askCityVisible = !state.askCityVisible
        },
        setMarket: (state, action: PayloadAction<number>) => {
            state.market = action.payload
        },
        setIsMobile: (state, action: PayloadAction<boolean>) => {
            state.isMobile = action.payload
        },
        setIsPhone: (state, action: PayloadAction<boolean>) => {
            state.isPhone = action.payload
        },
        setOrderDetails: (state, action) => {
            state.orderDetails = action.payload
        },
        setOrderWarning: (state, action: PayloadAction<OrderWarning>) => {
            state.orderWarning = action.payload
        },
    },
    extraReducers: builder => {
        builder.addCase(getCities.fulfilled, (state, action) => {
            state.cities = action.payload.cities
            if (!state.currentGeo.city) {
                state.currentGeo.city = action.payload.cities[0].id
            }
        })
        builder.addCase(getAddressesByMarketCity.fulfilled, (state, action) => {
            state.addresses = action.payload
        })
        builder.addCase(getDeliveries.fulfilled, (state, action) => {
            state.deliveryTypes = action.payload
        })
        builder.addCase(getBookings.fulfilled, (state, action) => {
            state.bookingAddresses = action.payload
        })

        builder.addCase(getPayments.fulfilled, (state, action) => {
            state.payments = action.payload
        })
        builder.addCase(getDeliverySettings.fulfilled, (state, action) => {
            state.deliverySettings = {
                personDeliveryPrice: action.payload.people_min,
                autoDeliveryPrice: action.payload.car_min
            }
        })
        builder.addCase(getMarketsByCity.fulfilled, (state, action) => {
            state.cityMarkets = action.payload
        })
        builder.addCase(getCanOrderByCity.fulfilled, (state, action) => {
            state.canOrder = action.payload.status
        })
        builder.addCase(getAddressesByCity.fulfilled, (state, action) => {
            state.cityAddresses = action.payload
        })
        builder.addCase(getCanOrderAddressesByCity.fulfilled, (state, action) => {
            if (action.payload.status) {
                state.canOrder = action.payload.status
                state.pickupAddresses = action.payload.adress
                state.deliveryAddress = action.payload.delivery_adress

                const dayWeek = getDayOfWeekNumber() - 1
                const addressWorkTimes = action.payload.delivery_adress.time[dayWeek]

                if (addressWorkTimes !== undefined) {
                    const startTime = deleteSeconds(addressWorkTimes[0])
                    const endTime = deleteSeconds(addressWorkTimes[1])
                    state.workTimes = {
                        startTime,
                        endTime,
                        isAroundTime: action.payload.delivery_adress.is_around_clock
                    }
                }

                return;
            }
            state.canOrder = action.payload.status
        })
        builder.addCase(getDeliveryType.fulfilled, (state, action) => {
            if (action.payload.status) {
                state.canOrder = action.payload.status
                state.orderDetails = {
                    delivery_type: action.payload.delivery_type,
                    price: action.payload.price
                }
                return
            }
            state.orderDetails = {
                delivery_type: 0,
                price: 0
            }
        })
    }
})

export const {
    setCurrentCity,
    setOrderWarning,
    setIsMobile,
    setOrderDetails,
    setIsPhone,
    toggleChangingGeo,
    toggleAskCityVisible,
    setMarket,
    setWorkTimes,
} = MainSlice.actions


export const mainReducer = MainSlice.reducer