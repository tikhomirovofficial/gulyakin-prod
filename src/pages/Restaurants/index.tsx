import React, {FC} from 'react';
import {Cap} from "../../icons";
import styles from './restaurants.module.scss'
import GradientGrayBtn from "../../components/Buttons/GradientGrayButton";
import {Map, Placemark, YMaps} from '@pbe/react-yandex-maps';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {RestaurantItemType} from "../../types/restaurants.types";
import {Link} from "react-router-dom";
import {getImgPath} from "../../utils/common/getAssetsPath";
import {marketComponents} from "../../components/LogosSection/markets";
import useMarketLogo from "../../hooks/useMarketLogo";
import useTheme from '../../hooks/useTheme';

const logosIsMax = true

type RestaurantItemProps = {
    link: string
} & Pick<RestaurantItemType, "cityArea" | "canOnlineOrder" | "street">
const RestaurantItem: FC<RestaurantItemProps> = ({cityArea, street, link, canOnlineOrder}) => {
    const gTheme = useTheme()
    return (
        <Link to={link} className={`${styles.itemWrapper}  ${gTheme("lt-sidewrapperItem", "dk-sidewrapperItem")} `}>
            <div className={`${styles.item} ${gTheme("lt-restaurantItem", "dk-restaurantItem")}`}>
                <div className={`f-column gap-10 `}>
                    <div className="f-column f-1 gap-5">
                        <b>{street}</b>
                        <p>{cityArea}</p>
                    </div>

                    <span className={`${!canOnlineOrder && "hidden"} ${styles.bottomText}`}>
                        Доступно онлайн бронирование столика
                    </span>
                </div>
            </div>
        </Link>
    )
}

const Restaurants: FC = () => {
    const {addresses, currentGeo, cities, market, cityMarkets, bookingAddresses, isDarkTheme} = useAppSelector(state => state.main)
    const logo = useMarketLogo()
    const gTheme = useTheme()
    const getAddressesCoords = () => {
        if (addresses.length > 0) {
            return [addresses[0].long, addresses[0].lat]
        }
        return [0, 0]
    }

    return (
        <>
            <div className={`${styles.main} f-column gap-20`}>
                <div className={`${styles.restaurantsMap} w-100p`}>
                    <div className={`${styles.block} f-column gap-25`}>
                        <div className="wrapper d-f jc-start w-100p">
                            <Link to={"/"}>
                                <GradientGrayBtn className={`${styles.backButton} cur-pointer d-f gap-10`}>
                                <Cap fill={isDarkTheme ? "#c3c3c3" : "black"}/>
                                    <p>Вернуться в меню</p>
                                </GradientGrayBtn>
                            </Link>
                        </div>

                        <div className="f-column gap-20">
                            <div className="wrapper w-100p">
                                <div className={`sectionTitle ${gTheme("lt-coal-c", "dk-gray-c")}`}>
                                    {addresses.length} кафе в {cityMarkets.length > 0 ? cityMarkets.filter(marketItem => marketItem.id === market)[0]?.market : ""} городе {cities.length > 0 ? cities.filter(city => city.id === currentGeo.city)[0]?.name : ""}
                                </div>
                            </div>
                            <div className={`${styles.restContainer} wrapper w-100p`}>
                                <div className={`of-hide w-100p  f-row-betw ${styles.restaurantsSection}`}>
                                    <div className={`${styles.restaurantsContainer} f-column h-100p`}>
                                        <div className={`${styles.sideWrapper} ${gTheme("lt-sidewrapper", "dk-sidewrapper")} f-column wrapper`}>
                                            {
                                                addresses.map(item => (
                                                    <RestaurantItem key={item.id} link={`/restaurants/${item.id}`}
                                                                    street={item.adress}
                                                                    canOnlineOrder={bookingAddresses.some(b_address => b_address.id === item.id)}
                                                                    cityArea={""}/>
                                                ))
                                            }
                                        </div>
                                    </div>


                                    <div className={`${styles.map} h-100p f-1`}>
                                        <YMaps>
                                            <Map className={`${styles.mapContainer} h-100p w-100p`}
                                                 state={{center: getAddressesCoords(), zoom: 16}}>
                                                {
                                                    addresses.map(item => (
                                                        <Placemark key={item.id} geometry={[item.long, item.lat]} options={
                                                            {
                                                                iconLayout: 'default#image', // Используем стандартный макет изображения
                                                                iconImageHref: logo, // Укажите URL вашей кастомной иконки
                                                                iconImageSize: [52, 52], // Размер вашей иконки
                                                                iconImageOffset: [-26, -52],
                                                            }
                                                        }/>
                                                    ))
                                                }

                                            </Map>

                                        </YMaps>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>

    );
};

export default Restaurants;