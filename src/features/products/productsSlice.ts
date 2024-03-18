import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    Combo,
    GetCombosByMarketRequest,
    GetCombosByMarketResponse,
    GetProductsByMarketRequest,
    GetProductsByMarketResponse, GetSousesRequest, GetSousesResponse,
    ProductRes
} from "../../types/api.types";
import {AxiosResponse} from "axios";
import {ProductsApi} from "../../http/api/products.api";


type ProductsSliceState = {
    productsLoading: boolean
    items: ProductRes[]
    combos: Combo[]
    souse: ProductRes[]
}

const initialState: ProductsSliceState = {
    productsLoading: false,
    items: [],
    combos: [],
    souse: []
}
export const getProductByMarket = createAsyncThunk(
    'product/by-market',
    async (request: GetProductsByMarketRequest, {dispatch}) => {
        const res: AxiosResponse<GetProductsByMarketResponse> = await ProductsApi.ProductsByMarket(request)
        return res.data.products
    }
)
export const getCombosByMarket = createAsyncThunk(
    'combos/by-market',
    async (request: GetCombosByMarketRequest, {dispatch}) => {
        const res: AxiosResponse<GetCombosByMarketResponse> = await ProductsApi.CombosByMarket(request)
        return res.data.combos
    }
)
export const getSouses = createAsyncThunk(
    'souses/by-market',
    async (_, {dispatch}) => {
        const res: AxiosResponse<GetSousesResponse> = await ProductsApi.Souses()
        return res.data.souse
    }
)
export const ProductsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getProductByMarket.fulfilled, (state, action) => {
            if (action.payload) {
                state.items = action.payload
            }
            state.productsLoading = false
        })
        builder.addCase(getProductByMarket.pending, (state, action) => {
            state.productsLoading = true
        })
        builder.addCase(getProductByMarket.rejected, (state, action) => {
            state.productsLoading = false
        })
        builder.addCase(getCombosByMarket.fulfilled, (state, action) => {
            if (action.payload) {
                state.combos = action.payload
            }
        })
        builder.addCase(getSouses.fulfilled, (state, action) => {
            if (action.payload) {
                state.souse = action.payload
            }
        })
    }
})

export const {} = ProductsSlice.actions


export const productsReducer = ProductsSlice.reducer