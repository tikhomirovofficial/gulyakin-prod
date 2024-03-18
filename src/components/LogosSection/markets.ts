import {FC, ReactNode} from "react";
import styles from "./logosSection.module.scss";
import {
    FoodHallLogo,
    FoodPancakesLogo, GorSportLogo,
    GulenkiPelmeniLogo,
    GulibuliLogo,
    GustoLogo,
    IFoodLogo,
    ShrimpLogo, VorobushekLogo
} from "../../icons";
import {getImgPath} from "../../utils/common/getAssetsPath";

export type MarketItem = {
    mapSvg: string
    ComponentLogo: FC
    className: string,
    selectedClassName: string,
    forMarketId: number,
}

export const marketComponents: MarketItem[] = [
    {
        mapSvg: getImgPath("/logos/pelmen.svg"),
        ComponentLogo: GulenkiPelmeniLogo,
        className: `${styles.item} lt-neededFill f-c-col `,
        forMarketId: 2,
        selectedClassName: "lt-selectedNeededFill"
    },
    {
        mapSvg: getImgPath("/logos/logo_3.svg"),
        ComponentLogo: FoodPancakesLogo,
        className: `${styles.item} lt-neededFill f-c-col `,
        forMarketId: 3,
        selectedClassName: "lt-selectedNeededFill"
    },
    {
        mapSvg: getImgPath("/logos/ifood.svg"),
        ComponentLogo: IFoodLogo,
        className: `${styles.item} lt-neededIfood f-c-col `,
        forMarketId: 4,
        selectedClassName: `lt-selectedNeededIFood lt-selectedNeededIFood`
    },
    {
        mapSvg: getImgPath("/logos/vorob.svg"),
        ComponentLogo: VorobushekLogo,
        className: `${styles.item} lt-neededFill f-c-col `,
        forMarketId: 5,
        selectedClassName:  "lt-selectedNeededFill"
    },
    {
        mapSvg: getImgPath("/logos/gusto.svg"),
        ComponentLogo: GustoLogo,
        className: `${styles.item} lt-neededGusto f-c-col `,
        forMarketId: 6,
        selectedClassName: `lt-selectedNeededGusto`
    },
    {
        mapSvg: getImgPath("/logos/logo_gulyakin.svg"),
        ComponentLogo: FoodHallLogo,
        className: `${styles.item} lt-neededFill f-c-col`,
        forMarketId: 1,
        selectedClassName: "lt-selectedNeededFill"
    },
    {
        mapSvg: getImgPath("/logos/logo_5.svg"),
        ComponentLogo: ShrimpLogo,
        className: `${styles.item} lt-neededFill f-c-col `,
        forMarketId: 7,
        selectedClassName: "selectedNeededFill"
    },
    {
        mapSvg: getImgPath("/logos/logo_4.svg"),
        ComponentLogo: GulibuliLogo,
        className: `${styles.item} lt-neededFill f-c-col `,
        forMarketId: 8,
        selectedClassName: "lt-selectedNeededFill"
    },
    {
        mapSvg: getImgPath("/logos/sport.svg"),
        ComponentLogo: GorSportLogo,
        className: `${styles.item} lt-neededSport f-c-col `,
        forMarketId: 9,
        selectedClassName: "selectedSport"
    }

]