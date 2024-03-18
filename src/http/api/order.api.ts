import {
    CanOrderAddressesByCityRequest, CanOrderAddressesByCityResponse,
    CanOrderByCityRequest, CanOrderByCityResponse,
    CreateOrderRequest,
    CreateOrderResponse,
    GetDeliveryListResponse,
    GetDeliverySettingsResponse,
    GetHistoryOrdersResponse, GetOrderDeliveryRequest, GetOrderDeliveryResponse,
    GetOrderRequest,
    GetOrderResponse,
    GetPaymentListResponse,
    SendPaymentRequest,
    SendPaymentResponse
} from "../../types/api.types";
import {AxiosResponse} from "axios";
import authApi, {api} from "../instance/instances";
import {PATHS} from "./path.api";
import {ConvertDataToGetParams} from "../../utils/forms/ConvertDataToGetParams";

export class OrderApi {
    static async DeliveriesWays(): Promise<AxiosResponse<GetDeliveryListResponse>> {
        const res: AxiosResponse<GetDeliveryListResponse> = await api.get(PATHS.DELIVERY_OPTIONS);
        return res;
    }

    static async PaymentsWays(): Promise<AxiosResponse<GetPaymentListResponse>> {
        const res: AxiosResponse<GetPaymentListResponse> = await api.get(PATHS.PAYMENT_OPTIONS);
        return res;
    }
    static async DeliverySettings(): Promise<AxiosResponse<GetDeliverySettingsResponse>> {
        const res: AxiosResponse<GetDeliverySettingsResponse> = await api.get(PATHS.ORDER_SETTINGS);
        return res;
    }

    static async GetData(request: GetOrderRequest): Promise<AxiosResponse<GetOrderResponse>> {
        const res: AxiosResponse<GetOrderResponse> = await authApi.get(PATHS.GET_ORDER + ConvertDataToGetParams(request));
        if (!res.data) {
            throw res
        }
        return res;
    }
    static async GetTypeDelivery(request: GetOrderDeliveryRequest): Promise<AxiosResponse<GetOrderDeliveryResponse>> {
        const res: AxiosResponse<GetOrderDeliveryResponse> = await authApi.get(PATHS.GET_TYPE_DELIVERY + ConvertDataToGetParams(request));
        if (!res.data) {
            throw res
        }
        return res;
    }

    static async GetHistory(): Promise<AxiosResponse<GetHistoryOrdersResponse>> {
        const res: AxiosResponse<GetHistoryOrdersResponse> = await authApi.get(PATHS.ORDER_HISTORY);
        if (!res.data) {
            throw res
        }
        return res;
    }

    static async Create(requestData: CreateOrderRequest): Promise<AxiosResponse<CreateOrderResponse>> {
        const res: AxiosResponse<CreateOrderResponse> = await authApi.post(PATHS.CREATE_ORDER, {...requestData});
        if (!res.data) {
            throw res
        }
        return res;
    }

    static async PaymentConfirmation(requestData: SendPaymentRequest): Promise<AxiosResponse<SendPaymentResponse>> {
        const res: AxiosResponse<SendPaymentResponse> = await api.post(PATHS.PAYMENT_CONFIRMATION, {...requestData});
        return res;
    }

    static async GetCanOrderByCity(requestData: CanOrderByCityRequest): Promise<AxiosResponse<CanOrderByCityResponse>> {
        const res: AxiosResponse<CanOrderByCityResponse> = await authApi.get(PATHS.ACCESSIBILITY_ORDER_CITY + ConvertDataToGetParams(requestData));
        if (!res.data) {
            throw res
        }
        return res;
    }
    static async GetCanOrderAddressesByCity(requestData: CanOrderAddressesByCityRequest): Promise<AxiosResponse<CanOrderAddressesByCityResponse>> {
        const res: AxiosResponse<CanOrderAddressesByCityResponse> = await authApi.get(PATHS.ACCESSIBILITY_ORDER_CITY_ADDRESSES + ConvertDataToGetParams(requestData));
        if (!res.data) {
            throw res
        }
        return res;
    }

}