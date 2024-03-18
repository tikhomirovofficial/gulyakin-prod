import {getTokens} from "../utils/auth/storeTokens";
import {useAppSelector} from "../app/hooks";

const useAppColor = () => {
    const {darkAppColor, lightAppColor, isDarkTheme} = useAppSelector(state => state.main)
    return isDarkTheme ? darkAppColor : lightAppColor
};

export default useAppColor;