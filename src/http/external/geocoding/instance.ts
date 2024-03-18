import axios from "axios";
import {appConfig} from "../../../config/AppConfig";

const URL = ""
export const geoApi = axios.create({
    baseURL: URL,
    headers: {
        "Content-Type": 'application/json',
        'Accept': 'application/json',
        Authorization: `Token ${appConfig.MAPS_API_KEY}`
    }
})