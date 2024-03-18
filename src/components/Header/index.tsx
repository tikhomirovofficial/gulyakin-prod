import React from 'react';
import {Link} from "react-router-dom";
import styles from "../../pages/Main/main.module.scss";
import {CartIcon, Logo, ProfileIcon} from "../../icons";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {handleCartOpened, handleLogin} from "../../features/modals/modalsSlice";
import {formatNumberWithSpaces} from "../../utils/common/numberWithSpaces";
import useToken from "../../hooks/useToken";
import SelectCity from "../SelectCity";
import AddedPopup from "../AddedPopup";
import useTheme from '../../hooks/useTheme';
import useActualPrice from '../../hooks/useActualPrice';


const Header = () => {
    const dispatch = useAppDispatch()

    const {totalPrice, cartClassOpened, cartAdded, cartAddedPopupInfo, items, totalDiscountPrice} = useAppSelector(state => state.cart)
    const {cities, currentGeo, changingGeo, askCityVisible, isDarkTheme} = useAppSelector(state => state.main)
    const token = useToken()
    const handleCart = () => dispatch(handleCartOpened())

    const actualPrice = useActualPrice()

    const gTheme = useTheme()


    return (
        <header className={`${styles.header} ${gTheme("lt-white-bg", "dk-white-bg")}`}>
            <div className="wrapper">
                <div className={`${styles.block} pd-30-0 f-row-betw gap-40`}>
                    <div className={`${styles.left} d-f al-center gap-35`}>
                        <Link to={"/"} className="">
                            <Logo fill={isDarkTheme ? "white" : "black"}/>
                        </Link>
                        <SelectCity/>
                    </div>

                    <nav className={"d-f gap-20 f-1"}>
                        <Link className={`${styles.item} ${gTheme("lt-header-nav", "dk-header-nav")} f-c-col p-rel`} to={"/empty"}>
                            <div className={`${styles.text} ${gTheme("c-black", "c-white")} w-100p h-100p p-abs left-0`}>
                                О нас
                            </div>
                            <div className="hidden">О нас</div>
                        </Link>
                        <Link className={`${styles.item} f-c-col p-rel ${gTheme("lt-header-nav", "dk-header-nav")}`} to={"/"}>
                            <div className={`${styles.text } ${gTheme("c-black", "c-white")} w-100p h-100p p-abs left-0`}>
                                Каталог
                            </div>
                            <div className="hidden">Каталог</div>
                        </Link>
                        <Link className={`${styles.item} f-c-col p-rel ${gTheme("lt-header-nav", "dk-header-nav")}`} to={"/"}>
                            <div className={`${styles.text} ${gTheme("c-black", "c-white")} w-100p h-100p p-abs left-0`}>
                                Контакты
                            </div>
                            <div className="hidden">Контакты</div>
                        </Link>
                        <Link className={`${styles.item} f-c-col p-rel ${gTheme("lt-header-nav", "dk-header-nav")}`} to={"/empty"}>
                            <div className={`${styles.text} ${gTheme("c-black", "c-white")} w-100p h-100p p-abs left-0`}>
                                Вакансии
                            </div>
                            <div className="hidden">Вакансии</div>
                        </Link>
                        <Link className={`${styles.item} f-c-col p-rel ${gTheme("lt-header-nav", "dk-header-nav")}`} to={"/empty"}>
                            <div className={`${styles.text} ${gTheme("c-black", "c-white")} w-100p h-100p p-abs left-0`}>
                                Инвестиции
                            </div>
                            <div className="hidden">Инвестиции</div>
                        </Link>
                        <Link className={`${styles.item} f-c-col p-rel ${gTheme("lt-header-nav", "dk-header-nav")}`} to={"/empty"}>
                            <div className={`${styles.text} ${gTheme("c-black", "c-white")} w-100p h-100p p-abs left-0`}>
                                Предложить помещение
                            </div>
                            <div className="hidden">Предложить помещение</div>
                        </Link>
                        <Link className={`${styles.item} f-c-col p-rel ${gTheme("lt-header-nav", "dk-header-nav")}`} to={"/empty"}>
                            <div className={`${styles.text} ${gTheme("c-black", "c-white")} w-100p h-100p p-abs left-0`}>
                                Поставщикам
                            </div>
                            <div className="hidden">Поставщикам</div>
                        </Link>
                        <Link className={`${styles.item}  ${gTheme("lt-header-nav", "dk-header-nav")} f-c-col p-rel`} to={"/empty"}>
                            <div className={`${styles.text} w-100p h-100p p-abs left-0 ${gTheme("c-black", "c-white")}`}>
                                Помощь
                            </div>
                            <div className="hidden">Помощь</div>
                        </Link>

                    </nav>

                    <div className={`${styles.right} d-f al-center gap-20 p-rel`}>
                        {
                            !token ?
                                <div onClick={() => dispatch(handleLogin())}
                                     className={`${styles.profileBtn} ${gTheme("lt-profile-btn", "dk-profile-btn")} btn d-f al-center gap-5 cur-pointer`}>
                                    <ProfileIcon fill={isDarkTheme ? "white" : "black"} height={22} width={16}/>
                                    <b className={gTheme("c-black", "c-white")} >
                                        Кабинет
                                    </b>
                                </div> :

                                <Link to={"/profile"}
                                      className={`${styles.profileBtn} ${gTheme("lt-profile-btn", "dk-profile-btn")} btn d-f al-center gap-5 cur-pointer`}>
                                    <ProfileIcon fill={isDarkTheme ? "white" : "black"} height={22} width={16}/>
                                    <b className={gTheme("c-black", "c-white")} >
                                        Кабинет
                                    </b>
                                </Link>
                        }
                        <AddedPopup/>
                        <div
                            onClick={handleCart}
                            className={`${items.length > 0 ? gTheme("lt-cart-btn-filled", "dk-cart-btn-filled"): gTheme("lt-cart-btn-unfilled", "dk-cart-btn-unfilled")} ${styles.cartBtn} gap-5 btn d-f al-center cur-pointer`}>
                            <CartIcon stroke={isDarkTheme ? "white" : "black"} fill={isDarkTheme ? "white" : "black"} height={22} width={22}/>
                            <b className={gTheme("c-black", "c-white")}>
                                {formatNumberWithSpaces(actualPrice)} ₽
                            </b>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;