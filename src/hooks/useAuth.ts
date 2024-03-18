import {getTokens} from "../utils/auth/storeTokens";
import {useAppSelector} from "../app/hooks";

const useAuth = () => {
    const {phone} = useAppSelector(state => state.profile.data)

    const refresh = getTokens()?.refresh

    if (!refresh) {
        return false
    }

    return phone.length > 0
};

export default useAuth;