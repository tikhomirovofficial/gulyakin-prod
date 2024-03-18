import axios from 'axios'
import {getCookie} from "../../utils/common/CookieUtil";
import {getTokens} from "../../utils/auth/storeTokens";

const currentDomain = 3

const domains = [
    "http://dev.advafert.ru",
    "http://vps.advafert.ru:5000",
    "https://api.client.advafert.ru",
    "https://api.gulyakin.com"
]

export const domain = domains[currentDomain]
const URL = domain + "/api"

const authApi = axios.create({
    baseURL: URL,
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${getCookie('tokens')?.access}`,
        "Content-Type": 'application/json',
        'Accept': 'application/json',
    }
})
export const api = axios.create({
    baseURL: URL,
    withCredentials: true,
    headers: {
        "Content-Type": 'application/json',
        'Accept': 'application/json',
    }
})
authApi.interceptors.response.use(null, (ctx) => {
    const res = ctx
    if (res.code == "ERR_NETWORK") {
        //alert("ошибка соединения")
    }
    return res
})

authApi.interceptors.request.use((config) => {
    const tokens = getTokens();
    if (tokens?.access) {
        config.headers.Authorization = `Bearer ${tokens.access}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
export default authApi