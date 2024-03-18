import React from 'react';
import {Link} from "react-router-dom";
import styles from "../../pages/Main/main.module.scss";
import {Burger, Geo, Logo} from "../../icons";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {setMobileMenu} from "../../features/modals/modalsSlice";
import GradientGrayBtn from "../Buttons/GradientGrayButton";
import useTheme from '../../hooks/useTheme';


const HeaderMobile = () => {
    const dispatch = useAppDispatch()
    const gTheme = useTheme()
    const {isDarkTheme} = useAppSelector(state => state.main)
    const handleOpen = () => {
        dispatch(setMobileMenu(true))
    }
    return (
        <header className={`${styles.headerMobile} ${gTheme("lt-white-bg", "dk-white-bg")}`}>
            <div className="wrapper">
                <div className={`${styles.block} pd-20-0 f-row-betw gap-40`}>
                    <div className={`${styles.left} d-f al-center gap-35`}>
                        <Link to={"/"} className="">
                            <Logo fill={isDarkTheme ? "white" : "black"}/>
                        </Link>
                        <Link to={"/restaurants"}>
                            <GradientGrayBtn
                                className={`${styles.btnRests} cur-pointer d-f al-center gap-10`}>
                                <Geo stroke={isDarkTheme ? "white" : "black"}/>
                                <p>Рестораны на карте</p>
                            </GradientGrayBtn>
                        </Link>

                    </div>
                    <div onClick={handleOpen} className="w-content h-content">
                        <Burger stroke={isDarkTheme ? "#c3c3c3" : "#434343"} height={30} width={30}/>
                    </div>

                </div>
            </div>
        </header>
    );
};

export default HeaderMobile;