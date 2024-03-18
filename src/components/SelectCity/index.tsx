import React, { FC } from 'react';
import styles from "./selectCity.module.scss";
import { ArrowMiniDown, ArrowMiniRightIcon } from "../../icons";
import RedButton from "../Buttons/RedButton";
import GrayButton from "../Buttons/GrayButton";
import List from "../List";
import { DropDownItem } from "../DropdownList";
import { setCurrentCity, setMarket, toggleAskCityVisible, toggleChangingGeo } from "../../features/main/mainSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addToStorage } from "../../utils/common/LocalStorageExplorer";
import { HasClassName } from "../../types/components.types";
import { setOrderForm } from "../../features/forms/formsSlice";
import { resetOrderForm } from "../../utils/common/resetOrderForm";
import { resetCart } from "../../features/cart/cartSlice";
import { useLocation, useNavigate } from "react-router-dom";
import useTheme from '../../hooks/useTheme';

type SelectCityProps = {
    classNamePopup?: string,
    askGeoPopupClass?: string
}
const SelectCity: FC<HasClassName & SelectCityProps> = ({ className, askGeoPopupClass, classNamePopup }) => {
    const dispatch = useAppDispatch()
    const location = useLocation()
    const navigation = useNavigate()
    const { cities, currentGeo, changingGeo, askCityVisible, isDarkTheme, isMobile } = useAppSelector(state => state.main)
    const handleChangingGeo = () => dispatch(toggleChangingGeo())
    const gTheme = useTheme()
    const handleAskCity = () => {
        dispatch(toggleAskCityVisible())
        addToStorage("city_accepted", currentGeo.city)
    }

    const handleNotYourCity = () => {
        handleChangingGeo()
        dispatch(toggleAskCityVisible())
    }

    const selectCity = (cityId: number) => {

        dispatch(setOrderForm({
            address: "", restaurant: -1,
            addressId: -1
        }))
        resetOrderForm()
        dispatch(resetCart())
        dispatch(setCurrentCity(cityId))
        handleChangingGeo()
        const isOrderPage = location.pathname == "/order"
        if (isOrderPage) {
            navigation("/")
        }
    }
    return (
        <div className={`${styles.logoText} ${className || ""} p-rel f-column gap-5`}>
            <p className={!isMobile ? gTheme("lt-c", "dk-c") : ""}>Доставка готовой еды</p>
            <div className={`d-f al-center gap-10`}>
                <p className={!isMobile ? gTheme("lt-c", "dk-c") : ""}>в городе</p>
                <div onClick={handleChangingGeo}
                    className={`${styles.city} d-f al-center gap-5 cur-pointer`}>
                    <b className={gTheme("lt-active-c", "dk-active-c")}>{
                        cities.length > 0 ?
                            !currentGeo.city ?
                                cities[0].name :
                                cities.filter(item => item.id === currentGeo.city)[0]?.name
                            : "..."
                    }</b>
                    {
                        !changingGeo ? <ArrowMiniRightIcon height={11} stroke={isDarkTheme ? "white" : "black"} /> : <ArrowMiniDown stroke={isDarkTheme ? "white" : "black"} height={10} />
                    }

                </div>
                {
                    askCityVisible ? <div
                        className={`${styles.geoPopup} ${styles.yourCity} ${askGeoPopupClass || ""} f-column gap-15 p-abs bg-white`}>
                        <b className={`txt-center`}>Это ваш город?</b>
                        <div className="d-f gap-5 jc-around">
                            <RedButton onClick={handleAskCity} className={styles.btn}>Да</RedButton>
                            <GrayButton onClick={handleNotYourCity}
                                className={styles.btn}>Другой</GrayButton>
                        </div>

                    </div> : null
                }
                {
                    changingGeo ?
                        <List
                            listBlockClassname={`${styles.geoPopup} ${gTheme("lt-white-bg", "dk-light-gray-bg")}  ${classNamePopup} f-column gap-15 p-abs bg-white `}
                            list={cities}
                            renderItem={(item) =>
                                <DropDownItem key={item.id}
                                    selectHandler={() => {
                                        selectCity(item.id)
                                    }}
                                    className={`${styles.selectCityItem} f-row-betw`}
                                    text={item.name} isCurrent={item.id === currentGeo.city}
                                />
                            } />
                        : null
                }


            </div>

        </div>
    );
};

export default SelectCity;