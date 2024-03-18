import {useAppSelector} from "../app/hooks";
import {marketComponents} from "../components/LogosSection/markets";

const useMarketLogo = () => {
    const {market} = useAppSelector(state => state.main)
    return marketComponents.filter(item => item.forMarketId == market)[0].mapSvg
};

export default useMarketLogo;