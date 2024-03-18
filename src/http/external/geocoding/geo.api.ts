import {AxiosResponse} from "axios/index";
import {PATHS} from "../../api/path.api";
import {geoApi} from "./instance";
import {QueryRequest, SuggestionsResponse} from "../../../types/geo.api.types";

export class GeoApi {
    static async Suggestions(request: QueryRequest) {
        const res: AxiosResponse<SuggestionsResponse> = await geoApi.post(PATHS.GEO_SUGGESTIONS, request);
        return res;
    }
}
