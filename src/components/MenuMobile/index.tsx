import React from 'react';
import styles from './menuMobile.module.scss'
import { Logo, MiniClose, ProfileIcon, ThinClose, VkIcon } from "../../icons";
import SelectCity from "../SelectCity";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { handleLogin, setMobileMenu } from "../../features/modals/modalsSlice";
import useToken from "../../hooks/useToken";
import { formatPhoneNumber } from '../../utils/forms/formatePhone';

const MenuMobile = () => {
    const dispatch = useAppDispatch()
    const { mobileMenu } = useAppSelector(state => state.modals)
    const { phone } = useAppSelector(state => state.main)
    const token = useToken()
    const handleClose = () => {
        dispatch(setMobileMenu(false))
    }
    const login = () => {
        handleClose()
        dispatch(handleLogin())
    }

    return (
        <div className={`${styles.menu} ${mobileMenu ? styles.menuOpened : ""} f-column p-fix top-0 h-100v left-0 w-100v t-transform-4`}>
            <div className={`${styles.header} f-03  w-100p pd-20-0`}>
                <div className="wrapper w-100p d-f jc-between ">
                    <div className="f-column gap-20">
                        <Link onClick={handleClose} to={"/"}>
                            <Logo fill={"white"} />
                        </Link>

                        <SelectCity askGeoPopupClass={styles.askGeo} classNamePopup={styles.menuSelectPopup} className={styles.menuSelectCity} />
                    </div>
                    <div className={`${styles.closeWrapper} w-content d-f`}>
                        <div onClick={handleClose} className="w-content h-content">
                            <ThinClose fill={"white"} width={20} height={20} />
                        </div>

                    </div>
                </div>


            </div>
            <div className={`h-100p f-1 w-100p f-column`}>
                <div className={`w-100p ${styles.menuLinkContainer}`}>
                    <div className="wrapper w-100p">
                        <div className="f-column pd-20-0">
                            {
                                !token ? <div onClick={login} className={`${styles.menuItemLink} d-f al-center gap-10`}>
                                    <ProfileIcon />
                                    <b>Кабинет</b>
                                </div> :
                                    <Link onClick={handleClose} to={"/profile"}>
                                        <div className={`${styles.menuItemLink} d-f al-center gap-10`}>
                                            <ProfileIcon />
                                            <b>Кабинет</b>
                                        </div>
                                    </Link>
                            }

                        </div>
                    </div>
                </div>

                <div className="wrapper w-100p h-100p">
                    <div className="f-column jc-between h-100p gap-10 pd-20-0">
                        <Link onClick={handleClose} className={`${styles.navItem} f-c-col p-rel`} to={"/"}>
                            О нас
                        </Link>
                        <Link onClick={handleClose} className={`${styles.navItem} f-c-col p-rel`} to={"/"}>
                            Каталог
                        </Link>
                        <Link onClick={handleClose} className={`${styles.navItem} f-c-col p-rel`} to={"/"}>
                            Контакты
                        </Link>
                        <Link onClick={handleClose} className={`${styles.navItem} f-c-col p-rel`} to={"/empty"}>
                            Вакансии
                        </Link>
                        <Link onClick={handleClose} className={`${styles.navItem} f-c-col p-rel`} to={"/empty"}>
                            Инвестиции
                        </Link>
                        <Link onClick={handleClose} className={`${styles.navItem} f-c-col p-rel`} to={"/empty"}>
                            Предложить помещение
                        </Link>
                        <Link onClick={handleClose} className={`${styles.navItem} f-c-col p-rel`} to={"/empty"}>
                            Поставщикам
                        </Link>
                        <Link onClick={handleClose} className={`${styles.navItem} f-c-col p-rel`} to={"/empty"}>
                            Помощь
                        </Link>
                    </div>
                </div>

            </div>
            <div className={`${styles.footer} pd-20-0 f-4`}>
                <div className="wrapper">
                    <div className="f-column gap-20">
                        <div className="f-column gap-10">
                            <b>Контакты</b>
                            <a href="mailto:gm.group@internet.ru">gm.group@internet.ru</a>
                            <a href={`tel:${phone}`}>{formatPhoneNumber(phone)}</a>
                        </div>
                        <div className={`d-f gap-10`}>
                            <a target={"_blank"} href="https://vk.com/gulyakin86" className={`f-c-col ${styles.socialItem}`}>
                                <VkIcon />
                            </a>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default MenuMobile;