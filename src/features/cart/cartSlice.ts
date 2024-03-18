import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    AddToCartComboRequest,
    AddToCartComboResponse,
    AddToCartRequest,
    AddToCartResponse,
    CartCountSupplementsRequest,
    CartCountSupplementsResponse,
    CartProductDeleteRequest,
    CartProductItem,
    CartResetResponse,
    ChangeCountCartRequest,
    ChangeCountCartResponse,
    EditCartComboRequest,
    EditCartComboResponse,
    GetCartResponse,
    ProductRes
} from "../../types/api.types";
import {AxiosResponse} from "axios";
import {handleTokenRefreshedRequest} from "../../utils/auth/handleThunkAuth";
import {CartApi} from "../../http/api/cart.api";


type DefferedAddingProduct = {
    id: number,
    is_combo: boolean,
    selected_product?: number
    supplements?: number[]
} | null

type CartSliceState = {
    items: Array<CartProductItem>,
    addProductAfterLogin: DefferedAddingProduct,
    addProductAfterAddress: DefferedAddingProduct,
    totalPrice: number,
    totalDiscountPrice?: number,
    notDiscountTotalPrice: number,
    cartAdded: boolean,
    cartClassOpened: boolean
    cartAddedPopupInfo: {
        title: string
        weight: number
    }
    cartCounts: Record<string, number>
}

const initialState: CartSliceState = {
    items: [],
    addProductAfterLogin: null,
    addProductAfterAddress: null,
    totalPrice: 0,
    notDiscountTotalPrice: 0,
    totalDiscountPrice: 0,
    cartCounts: {},
    cartAdded: true,
    cartClassOpened: false,
    cartAddedPopupInfo: {title: "", weight: 0}

}

export const getCart = createAsyncThunk(
    'cart/get',
    async (_, {dispatch}) => {
        const res: AxiosResponse<GetCartResponse> = await handleTokenRefreshedRequest(CartApi.GetProducts)
        return {
            cart: res.data.cart,
            total_price: res.data.price,
            total_price_discount: res.data.total_price_discount,
            sup_counts: res.data.supplement_counts
        }
    }
)
export const addToCart = createAsyncThunk(
    'cart/add',
    async (request: ProductRes, {dispatch}) => {
        const productCartReq: AddToCartRequest = {
            products: [
                {
                    product: request.id,
                    supplements: request.supplements.map((item) => {
                        return {
                            count: 1,
                            id: item.id,
                        }
                    }),
                    count: 1
                }
            ]
        }
        const res: AxiosResponse<AddToCartResponse> = await handleTokenRefreshedRequest(CartApi.AddProduct, productCartReq)
        return {
            product: request,
            data: res.data
        }
    }
)
export const addToCartCombo = createAsyncThunk(
    'cart/add/combo',
    async (request: AddToCartComboRequest, {dispatch}) => {

        const res: AxiosResponse<AddToCartComboResponse> = await handleTokenRefreshedRequest(CartApi.AddCombo, {combo: request.combo})
        return {
            combo: request.combo,
            combo_prod: request.combo_prod,
            data: res.data
        }
    }
)
export const editCartCombo = createAsyncThunk(
    'cart/edit/combo',
    async (request: EditCartComboRequest, {dispatch}) => {

        const res: AxiosResponse<EditCartComboResponse> = await handleTokenRefreshedRequest(CartApi.EditCombo, {combos: request.combos})
        return {
            data: res.data
        }
    }
)
export const editCountCart = createAsyncThunk(
    'cart/edit',
    async (request: Pick<ProductRes, "id"> & ChangeCountCartRequest, {dispatch}) => {
        const reqData: ChangeCountCartRequest = {
            cart_id: request.cart_id,
            count: request.count
        }
        const res: AxiosResponse<ChangeCountCartResponse> = await handleTokenRefreshedRequest(CartApi.EditProductCount, reqData)

        return {
            count: request.count,
            product_id: request.cart_id,
            data: res.data
        }
    }
)
export const editSupplementsCountCart = createAsyncThunk(
    'cart/supplements/edit',
    async (request: CartCountSupplementsRequest, {dispatch}) => {

        const res: AxiosResponse<CartCountSupplementsResponse> = await handleTokenRefreshedRequest(CartApi.EditSupplementsCount, request)
        return {
            cart_id: request.cart_id,
            supplements_list: res.data.supplements_list
        }
    }
)
export const removeFromCart = createAsyncThunk(
    'cart/remove',
    async (request: CartProductDeleteRequest, {dispatch}) => {
        const res: AxiosResponse<AddToCartResponse> = await handleTokenRefreshedRequest(CartApi.RemoveProduct, {
            cart_id: request.cart_id
        })
        return {
            res: res,
            cart_id: request.cart_id
        }
    }
)
export const resetCart = createAsyncThunk(
    'cart/reset',
    async (_, {dispatch}) => {
        const res: AxiosResponse<CartResetResponse> = await handleTokenRefreshedRequest(CartApi.Reset)
        return res.data
    }
)

export const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        cartAddedOpen: state => {
            state.cartAdded = true
            state.cartClassOpened = true

        },
        setCartAddedPopupInfo: (state, action: PayloadAction<{
            title: string,
            weight: number
        }>) => {
            state.cartAddedPopupInfo = {
                title: action.payload.title,
                weight: action.payload.weight
            }
        },
        resetCartAddedPopupInfo: state => {
            state.cartAddedPopupInfo = {
                title: "",
                weight: 0
            }
        },
        cartAddedClose: state => {
            state.cartClassOpened = false
        },
        setProductAfterLogin: (state, action: PayloadAction<DefferedAddingProduct>) => {
            state.addProductAfterLogin = action.payload
        },
        setProductAfterAddress: (state, action: PayloadAction<DefferedAddingProduct>) => {
            state.addProductAfterAddress = action.payload
        },
        addProduct: (state, action: PayloadAction<CartProductItem>) => {
            state.items = [
                ...state.items,
                action.payload
            ]
        },
        plusProduct: (state, action: PayloadAction<number>) => {
            state.items = state.items.map(item => {
                if (item.product.id == action.payload) {

                    return {
                        ...item,
                        count: item.count + 1
                    }
                }
                return item
            })

        },
        minusProduct: (state, action: PayloadAction<number>) => {
            const productToMinus = state.items.find(item => item.id === action.payload);

            if (productToMinus) {
                if (productToMinus.count > 1) {
                    state.items = state.items.map(item => {
                        if (item.id == action.payload) {
                            return {
                                ...item,
                                count: item.count - 1
                            }
                        }
                        return item
                    })
                }
            }

        },
        removeProduct: (state, action: PayloadAction<number>) => {
            const productToRemove = state.items.find(item => item.product.id === action.payload);

            if (productToRemove) {
                const totalThisPrice = productToRemove.count * productToRemove.product.price;
                state.totalPrice -= totalThisPrice;
            }

            state.items = state.items.filter(item => item.product.id !== action.payload);

        },
        setTotalPrice: (state, action: PayloadAction<number>) => {
            state.totalPrice = ~~(action.payload)
        },
        setDiscountPrice: (state, action: PayloadAction<number>) => {
            state.totalDiscountPrice = ~~(action.payload)
        }
    },
    extraReducers: builder => {

        builder.addCase(getCart.fulfilled, (state, action) => {
            if (action.payload) {
                
                state.items = action.payload.cart
                // const resultPrice = action.payload.cart.reduce((prev, cur) => {
                //     //console.log(prev + (cur.count * cur.product.price))
                //     const productPrice = cur.product.is_discount ? cur.product.price_discount || 0: cur.product.price
                //     return prev + (cur.count * productPrice)
                // }, 0)
                state.totalPrice = action.payload.total_price
                state.totalDiscountPrice = action.payload.total_price_discount
                
                state.cartCounts = action.payload.sup_counts
            }

        })

        builder.addCase(addToCart.fulfilled, (state, action) => {
            const product = action.payload.product
            const res = action.payload.data
            if (action.payload) {
                const newState = [
                    ...state.items,
                    {
                        is_combo: false,
                        id: res.list_id[0],
                        product: {

                            composition: product.composition,
                            id: product.id,
                            title: product.title,
                            image: product.image,
                            dimensions: product.dimensions,
                            is_discount: product.is_discount,
                            price_discount: ~~(product.price_discount || 0),
                            price: product.price,
                            short_description: product.short_description,
                        },
                        supplements: product.supplements,
                        count: 1
                    }
                ]
                state.items = newState
            }
        })
        builder.addCase(addToCartCombo.fulfilled, (state, action) => {
            const comboRes = action.payload.data
            const comboProduct = action.payload.combo_prod
            const comboFromReq = action.payload.combo[0]
            const selectedProductId = comboFromReq.selected_product
            const compositionFromProds = comboProduct.products?.map(item => item.title).join(', ') || ""

            const newState: CartProductItem[] = [
                ...state.items,
                {
                    count: 1,
                    id: comboRes.list_id[0],
                    is_combo: true,
                    product: {
                        composition: compositionFromProds,
                        dimensions: "г",
                        drinks: comboProduct.drinks,
                        id: comboProduct.id,
                        image: comboProduct.image,
                        price: comboProduct.price,
                        products: comboProduct.products,
                        selected_product: {
                            id: selectedProductId,
                            title: comboProduct.drinks?.filter(item => item.id === selectedProductId)[0].title || ""
                        },
                        short_description: "",
                        title: comboProduct.title

                    },
                    supplements: []
                }
            ]
            state.items = newState
        })
        builder.addCase(editCartCombo.fulfilled, (state, action) => {
            const editedCombo = action.payload.data.product[0]
            state.items = state.items.map(item => {
                if (item.id === editedCombo.id && item.is_combo) {
                    return editedCombo
                }
                return item
            })
        })

        builder.addCase(editCountCart.fulfilled, (state, action) => {
            const cartProductId = action.payload.product_id
            if (action.payload) {
                const newState = state.items.map(item => {
                    if (item.id === cartProductId) {
                        item.count = action.payload.count
                        return item
                    }
                    return item
                })
                state.items = newState

            }

        })

        builder.addCase(editSupplementsCountCart.fulfilled, (state, action) => {
            state.items = state.items.map(cartItem => {
                if (action.payload.cart_id === cartItem.id) {
                    return {
                        ...cartItem,
                        supplements: action.payload.supplements_list
                    }
                }
                return cartItem
            })

        })

        builder.addCase(removeFromCart.fulfilled, (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.cart_id)
        })

        builder.addCase(resetCart.fulfilled, (state, action) => {
            state.items = []
        })


    }
})

export const {
    addProduct,
    plusProduct,
    minusProduct,
    setTotalPrice,
    setDiscountPrice,
    removeProduct,
    setProductAfterLogin,
    setProductAfterAddress,
    cartAddedClose,
    setCartAddedPopupInfo,
    resetCartAddedPopupInfo,
    cartAddedOpen
} = CartSlice.actions


export const cartReducer = CartSlice.reducer