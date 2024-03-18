import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Category, GetCategoriesByMarketRequest, GetCategoriesByMarketResponse} from "../../types/api.types";
import {AxiosResponse} from "axios/index";
import {ProductsApi} from "../../http/api/products.api";


type CategoriesSliceState = {
    category: Category[],
    isLoading: boolean
}

const initialState: CategoriesSliceState = {
    category: [],
    isLoading: false
}
export const getCategoriesByMarket = createAsyncThunk(
    'categories/by-market',
    async (request: GetCategoriesByMarketRequest, {dispatch}) => {
        const res: AxiosResponse<GetCategoriesByMarketResponse> = await ProductsApi.CategoriesByMarket(request)
        return res.data.category
    }
)

export const CategoriesSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},

    extraReducers: builder => {
        builder.addCase(getCategoriesByMarket.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getCategoriesByMarket.fulfilled, (state, action) => {
            if (action.payload) {
                state.category = action.payload
            }
            state.isLoading = false
        })
        builder.addCase(getCategoriesByMarket.rejected, (state, action) => {
            state.isLoading = false
        })
    }

})

export const {} = CategoriesSlice.actions


export const categoriesReducer = CategoriesSlice.reducer