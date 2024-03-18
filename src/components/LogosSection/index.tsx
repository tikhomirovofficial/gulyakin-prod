import React, {FC, useEffect, useRef, useState} from 'react';
import styles from "./logosSection.module.scss";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {marketComponents, MarketItem} from "./markets";
import {setMarket} from "../../features/main/mainSlice";
import {Link} from "react-router-dom";
import {HasClassName} from "../../types/components.types";
import useTheme from '../../hooks/useTheme';

type LogoItemProps = {
    id: number
} & Pick<MarketItem, "forMarketId"> & HasClassName
const LogoItem: FC<LogoItemProps> = ({forMarketId, id, className}) => {
    const dispatch = useAppDispatch()
    const {market, cityMarkets} = useAppSelector(state => state.main)
    const {restaurant} = useAppSelector(state => state.forms.orderForm)
    const getByForId = (forId: number) => {
        return marketComponents.find(item => item.forMarketId === forId) || null
    }

    const gettedMarket = getByForId(forMarketId)

    if (gettedMarket !== null) {
        const isSelected = forMarketId === market
        const ComponentLogo = gettedMarket.ComponentLogo
        const classNameLogo = gettedMarket.className
        const classNameSelected = gettedMarket.selectedClassName
        const handleToMarket = () => {
            dispatch(setMarket(id))
            // if(restaurant === -1) {
            //     resetOrderForm()
            //     dispatch(setOrderForm({
            //         address: "", restaurant: -1,
            //         addressId: -1
            //     }))
            // }
        }

        return (
            <div onClick={handleToMarket}
                 className={`${classNameLogo} lt-hover-active-bg ${isSelected ? classNameSelected : null} ${className || ""}`}>
                <ComponentLogo/>
            </div>
        )
    }
    return null

}

const LogosSection = () => {
    const {cityMarkets} = useAppSelector(state => state.main)
    const [neededSlider, setNeededSlider] = useState(false)
    const gTheme = useTheme()

    const getByForId = (forId: number) => {
        return marketComponents.find(item => item.forMarketId === forId) || null
    }
    const logosSectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (logosSectionRef.current) {
            const logosNode = logosSectionRef.current
            setNeededSlider(logosNode.scrollWidth > logosNode.clientWidth)
        }
    }, [cityMarkets])

    return (
        <div className={`pd-40-0 ${gTheme("lt-light-gray-bg", "dk-light-gray-bg")}`}>
            <div className="wrapper w-100p">
                {
                    neededSlider ?
                        <Swiper
                            spaceBetween={20}
                            slidesPerView={"auto"}
                            className={`${styles.logos}`}>
                            {
                                cityMarkets.map(marketItem => (
                                    getByForId(marketItem.link) !== null ?
                                        <SwiperSlide key={marketItem.id} className={"w-content"}>
                                            <Link to={"/"}>
                                                <LogoItem key={marketItem.id} id={marketItem.id}
                                                          forMarketId={marketItem.link}/>
                                            </Link>
                                        </SwiperSlide> : null
                                ))
                            }
                        </Swiper> :
                        <div ref={logosSectionRef} className={`${styles.logos} f-row-betw gap-20`}>
                            {
                                cityMarkets.map(marketItem => (
                                    getByForId(marketItem.link) !== null ?
                                        <Link key={marketItem.id} className={"f-1"} to={"/"}>
                                            <LogoItem className={styles.nonSliderElement} key={marketItem.id} id={marketItem.id}
                                                      forMarketId={marketItem.link}/>
                                        </Link>
                                        : null
                                ))
                            }
                        </div>
                }
            </div>
        </div>
    );
};

export default LogosSection;