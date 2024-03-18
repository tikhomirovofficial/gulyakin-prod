import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RestaurantDetails} from "../../types/restaurants.types";
import {GetAddressInfoRequest, GetAddressInfoResponse} from "../../types/api.types";
import {AxiosResponse} from "axios";
import {AddressesApi} from "../../http/api/addresses.api";

type RestaurantsSliceType = {

    chosen: {
        loading: boolean
        data: RestaurantDetails
    },
    selectedInPickup: number,
    selectedInDelivery: number,
}
export const getRestaurantData = createAsyncThunk(
    'restaurant/get',
    async (request: GetAddressInfoRequest, {dispatch}) => {

        const res: AxiosResponse<GetAddressInfoResponse> = await AddressesApi.AddressInfoById(request)
        return res.data
    }
)
const initialState: RestaurantsSliceType = {
    chosen: {
        loading: false,
        data: {
            adress: "",
            id: 0,
            image: [],
            lat: 0,
            phone: "",
            long: 0,
            market: {
                description: "", id: 0, link: "", name: "", short_description: ""

            },
            time: [],
            timeaone: 0,
            work_with: 0,
            works_until: 0
        }
    },
    selectedInPickup: -1,
    selectedInDelivery: -1,

}


export const RestaurantsSlice = createSlice({
    name: "restaurants",
    initialState,
    reducers: {
        setChosenRestaurant: (state, action: PayloadAction<RestaurantDetails>) => {
            state.chosen.data = action.payload
        },
        setSelectedInPickup: (state, action: PayloadAction<number>) => {
            state.selectedInPickup = action.payload
        },
        setSelectedInDelivery: (state, action: PayloadAction<number>) => {
            state.selectedInDelivery = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(getRestaurantData.fulfilled, (state, action) => {
            state.chosen.data = action.payload.data
            state.chosen.loading = false
        })
        builder.addCase(getRestaurantData.pending, (state, action) => {
            state.chosen.loading = true
        })
        builder.addCase(getRestaurantData.rejected, (state, action) => {
            state.chosen.loading = false
        })
    }
})

export const {
    setSelectedInPickup,
    setSelectedInDelivery
} = RestaurantsSlice.actions


export const restaurantsReducer = RestaurantsSlice.reducer