import { useAppDispatch, useAppSelector } from "../app/hooks";


const useTheme = () => {
    const {isDarkTheme} = useAppSelector(state => state.main)
    const getTheme = (lightStyle: string, darkStyle: string): string => {
        return isDarkTheme ? darkStyle : lightStyle
    }
    return getTheme
};

export default useTheme;