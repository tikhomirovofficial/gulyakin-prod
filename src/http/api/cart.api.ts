import {
    AddressAddResponse, AddToCartComboRequest, AddToCartComboResponse,
    AddToCartRequest, AddToCartResponse,
    CartCountSupplementsRequest,
    CartCountSupplementsResponse,
    CartProductDeleteRequest,
    CartProductDeleteResponse, CartResetResponse,
    ChangeCountCartRequest,
    ChangeCountCartResponse, EditCartComboRequest, EditCartComboResponse,
    GetCartResponse
} from "../../types/api.types";
import {AxiosResponse} from "axios";
import authApi, {api} from "../instance/instances";
import {PATHS} from "./path.api";

export class CartApi {
    static async AddProduct(requestData: AddToCartRequest): Promise<AxiosResponse<AddToCartResponse>> {
        const res: AxiosResponse<AddToCartResponse> = await authApi.post(PATHS.ADD_TO_CART, {...requestData});
        if(!res.data) {
            throw res
        }
        return res;
    }
    static async AddCombo(requestData: AddToCartComboRequest): Promise<AxiosResponse<AddToCartComboResponse>> {
        const res: AxiosResponse<AddToCartComboResponse> = await authApi.post(PATHS.ADD_TO_CART_COMBO, {...requestData});
        if(!res.data) {
            throw res
        }
        return res;
    }
    static async EditCombo(requestData: EditCartComboRequest): Promise<AxiosResponse<EditCartComboResponse>> {
        const res: AxiosResponse<EditCartComboResponse> = await authApi.post(PATHS.EDIT_CART_COMBO, {...requestData});
        if(!res.data) {
            throw res
        }
        return res;
    }

    static async GetProducts(): Promise<AxiosResponse<GetCartResponse>> {
        const res: AxiosResponse<GetCartResponse> = await authApi.get(PATHS.VIEW_CART);
        if(!res.data) {
            throw res
        }
        return res;
    }
    static async EditProductCount(requestData: ChangeCountCartRequest): Promise<AxiosResponse<ChangeCountCartResponse>> {
        const res: AxiosResponse<ChangeCountCartResponse> = await authApi.post(PATHS.EDIT_CART_ITEM, {...requestData});
        if(!res.data) {
            throw res
        }
        return res;
    }
    static async EditSupplementsCount(requestData: CartCountSupplementsRequest): Promise<AxiosResponse<CartCountSupplementsResponse>> {
        const res: AxiosResponse<CartCountSupplementsResponse> = await authApi.post(PATHS.EDIT_CART_SUPPLEMENTS, {...requestData});
        if(!res.data) {
            throw res
        }
        return res;
    }
    static async RemoveProduct(requestData: CartProductDeleteRequest): Promise<AxiosResponse<CartProductDeleteResponse>> {
        const res: AxiosResponse<CartProductDeleteResponse> = await authApi.post(PATHS.DELETE_CART_ITEM, {...requestData});
        if(!res.data) {
            throw res
        }
        return res;
    }
    static async Reset(): Promise<AxiosResponse<CartResetResponse>> {
        const res: AxiosResponse<CartResetResponse> = await authApi.get(PATHS.RESET_CART);
        if(!res.data) {
            throw res
        }
        return res;
    }
}