import {getTokens} from "../utils/auth/storeTokens";
import {decodeToken} from "react-jwt";

const useToken = () => {
    const tokens = getTokens();
    const refresh: string | undefined = tokens?.refresh;
    const decoded = decodeToken(refresh || "") as { user_id?: string } || {};
    const hasUserId = "user_id" in decoded;
    const isRefreshValid = !!(refresh && hasUserId);
    return isRefreshValid
};

export default useToken;