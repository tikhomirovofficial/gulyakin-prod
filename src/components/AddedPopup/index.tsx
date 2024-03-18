import React from 'react';
import styles from "../../pages/Main/main.module.scss";
import {useAppSelector} from "../../app/hooks";

const AddedPopup = () => {
    const {totalPrice, cartClassOpened, cartAdded, cartAddedPopupInfo} = useAppSelector(state => state.cart)
    if(!cartAdded) {
        return null
    }
    return (
        <>
            <div className={`${styles.addedPopup} ${cartClassOpened ? styles.addedPopupOpened : ""} p-abs f-column gap-5 t-opacity-visible-3`}>
                <p className={styles.addedTextColor}>В корзину добавлено:</p>
                <b className={styles.addedTextColor}>{cartAddedPopupInfo.title}, <b className={styles.addedDimensions}>{cartAddedPopupInfo.weight} г</b></b>
            </div>
        </>

    );
};

export default AddedPopup;