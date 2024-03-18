import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {GetOrderItem, GetOrderRequest, GetOrderResponse} from "../../types/api.types";
import {AxiosResponse} from "axios/index";
import {OrderApi} from "../../http/api/order.api";


type OrderHistorySliceType = {
    loading: boolean
    data: GetOrderItem
}

const initialState: OrderHistorySliceType = {
    data: {
        address: "",
        datetime: "2023-10-13T09:17:47.712379Z",
        is_active: false,
        is_payment: false,
        order_id: 0,
        is_delivery: false,
        delivery_price: 0,
        price: 0,
        products: []
    },
    loading: false

}

export const getOrderById = createAsyncThunk(
    'history/order/get',
    async (request: GetOrderRequest, {dispatch}) => {
        const res: AxiosResponse<GetOrderResponse> = await OrderApi.GetData(request)
        return res.data.order
    }
)

export const OrderHistorySlice = createSlice({
    name: "orders/history",
    initialState,
    reducers: {},

    extraReducers: builder => {
        builder.addCase(getOrderById.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getOrderById.fulfilled, (state, action) => {
            if (action.payload) {
                state.data = action.payload
            }
            state.loading = false
        })
        builder.addCase(getOrderById.rejected, (state, action) => {
            state.loading = false
        })
    }

})


export const ordersHistoryReducer = OrderHistorySlice.reducer