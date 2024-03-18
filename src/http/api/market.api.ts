import {
    GetAddressInfoRequest,
    GetAddressInfoResponse,
    GetMarketInfoRequest,
    GetMarketInfoResponse, GetMarketsByCityRequest, GetMarketsByCityResponse
} from "../../types/api.types";
import {AxiosResponse} from "axios";
import {api} from "../instance/instances";
import {PATHS} from "./path.api";
import {ConvertDataToGetParams} from "../../utils/forms/ConvertDataToGetParams";

export class MarketApi {
    static async InfoById(requestData: GetMarketInfoRequest): Promise<AxiosResponse<GetMarketInfoResponse>> {
        const res: AxiosResponse<GetMarketInfoResponse> = await api.get(PATHS.MARKET_INFO + ConvertDataToGetParams(requestData));
        return res;
    }
    static async MarketsByCity(requestData: GetMarketsByCityRequest): Promise<AxiosResponse<GetMarketsByCityResponse>> {
        const res: AxiosResponse<GetMarketsByCityResponse> = await api.get(PATHS.MARKETS_BY_CITY + ConvertDataToGetParams(requestData));
        return res;
    }


}