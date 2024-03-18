import React, { useMemo } from 'react';
import styles from './cart.module.scss'
import { CartIcon } from "../../icons";
import { handleCartOpened } from "../../features/modals/modalsSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import AddedPopup from "../AddedPopup";
import useTheme from '../../hooks/useTheme';
import useAppColor from '../../hooks/useAppColor';

const CartWidget = () => {
    const dispatch = useAppDispatch()
    const { items } = useAppSelector(state => state.cart)
    const gTheme = useTheme()
    const appColor = useAppColor()
    const { market, cities, currentGeo, isMobile, isDarkTheme, phone } = useAppSelector(state => state.main)
    const totalCount = useMemo(() => {
        return items.reduce((prev, cur) => {
            return prev + cur.count
        }, 0)
    }, [items])

    return (
        <div className={`p-fix ${styles.widgetBar} f-column gap-10`}>
            <a href={`tel:${phone}`} className={`${styles.widget} f-c-col p-rel`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 22 22" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.98995 3.87351C2.30627 3.34875 4.05018 1.44377 5.2929 1.50127C5.66469 1.53311 5.99334 1.75698 6.26037 2.01783H6.2614C6.87351 2.61756 8.62974 4.88094 8.72834 5.35745C8.97175 6.52611 7.57806 7.19978 8.00428 8.37769C9.09089 11.0364 10.9632 12.9086 13.6232 13.994C14.8002 14.4212 15.4739 13.0287 16.6427 13.2711C17.1192 13.3707 19.3839 15.1257 19.9826 15.7388V15.7388C20.2425 16.0048 20.4684 16.3344 20.4992 16.7062C20.5454 18.0155 18.5222 19.7829 18.1278 20.0088C17.1973 20.6753 15.9833 20.663 14.5034 19.975C10.3737 18.2569 3.77391 11.782 2.02384 7.49657C1.35421 6.02496 1.30902 4.8029 1.98995 3.87351Z" stroke="#434343" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M13.5654 1.75C17.2674 2.161 20.1904 5.081 20.6064 8.782" stroke={appColor} strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M13.5654 5.29303C15.3354 5.63803 16.7184 7.02103 17.0634 8.79103" stroke={appColor} strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </a>
            <div className="p-rel">
                <AddedPopup />
                {
                    items.length > 0 ? <div onClick={() => dispatch(handleCartOpened())} className={`${styles.widget} f-c-col p-rel`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="28" viewBox="0 0 24 28" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.42624 7.33333C5.38386 7.23884 5.36399 7.13585 5.36817 7.03243H5.33333C5.48244 3.47455 8.42014 0.666666 11.9934 0.666666C15.5667 0.666666 18.5044 3.47455 18.6535 7.03243C18.6711 7.13197 18.6711 7.2338 18.6535 7.33333H18.7577C20.4664 7.33333 22.2929 8.46129 22.8231 11.4934L23.8601 19.753C24.7086 25.8173 21.5858 27.3333 17.5086 27.3333H6.45537C2.38994 27.3333 -0.638515 25.1381 
                            0.11565 19.753L1.14085 11.4934C1.76539 8.54619 3.53297 7.33333 5.21806 7.33333H5.42624ZM7.34239 7.33333C7.3795 7.23726 7.39916 7.13537 7.40045 7.03243C7.40045 4.47577 9.48019 2.40318 12.0457 2.40318C14.6111 2.40318 16.6909 4.47577 16.6909 7.03243C16.6733 7.13197 16.6733 7.2338 16.6909 7.33333H7.34239ZM15.8711 14.1981C16.5219 
                            14.1981 17.0495 13.6551 17.0495 12.9852C17.0495 12.3154 16.5219 11.7724 15.8711 11.7724C15.2203 11.7724 14.6927 12.3154 14.6927 12.9852C14.6927 13.6551 15.2203 14.1981 15.8711 14.1981ZM9.33073 12.9852C9.33073 13.6551 8.80315 14.1981 8.15234 14.1981C7.50154 14.1981 6.97396 13.6551 6.97396 12.9852C6.97396 12.3154 7.50154 11.7724 8.15234 11.7724C8.80315 11.7724 9.33073 12.3154 9.33073 12.9852Z" fill={appColor} />
                        </svg>
                        <div className={`${styles.count} c-white ${gTheme("lt-active-bg", "dk-active-bg")} f-c-col p-abs`}>
                            {totalCount}
                        </div>
                    </div> : null
                }

            </div>

        </div>

    );
};

export default CartWidget;