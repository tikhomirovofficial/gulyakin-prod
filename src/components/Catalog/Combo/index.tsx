import React, {FC} from 'react';
import styles from "../../../pages/Main/main.module.scss";
import {domain} from "../../../http/instance/instances";
import {AddedAdditiveIcon} from "../../../icons";
import {Combo} from "../../../types/api.types";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import useToken from "../../../hooks/useToken";
import useCartAdd from "../../../hooks/useCartAdd";
import {
    handleLogin,
    handleProductAdditives,
    handleYourAddress,
    setChangingAdditivesMode, setProductAdditivesData
} from "../../../features/modals/modalsSlice";
import {addToCart, setProductAfterAddress, setProductAfterLogin} from "../../../features/cart/cartSlice";
import useCombo from "../../../hooks/useCombo";

type ComboProps = {

} & Combo
const ComboItem: FC<ComboProps> = (item) => {
    const cartItems = useAppSelector(state => state.cart.items)
    const isInCart = cartItems.some(cartItem => cartItem.product.id === item.id && cartItem.is_combo)

    //TODO СОЗДАТЬ ПРОВЕРКУ ЯВЛЯЕТСЯ ЛИ ТОВАР КОМБО ПРИ ДОБАВЛЕНИИ ПОСЛЕ ЛОГИНА ИЛИ ПОСЛЕ АДРЕСА
    const [_, __,openComboWindow] = useCombo(item.id)

    return (
        <div onClick={openComboWindow} className={`${styles.item} p-rel d-f jc-end gap-15`}>
            <div style={{backgroundImage: `url(${domain}/${item.image})`}}
                 className={`${styles.bg} bg-cover`}>
            </div>
            <div className={`${styles.info} f-column gap-5 p-rel`}>
                <h4>{item.title}</h4>
                <p>{item.price} ₽</p>
            </div>
            {
                isInCart ? <div className={`d-f al-center p-abs gap-5 ${styles.addedIconBlock} t-opacity-visible-3`}>
                    <b className={"colorRed"}>Добавлен</b>
                    <AddedAdditiveIcon width={18} height={18}/>
                </div> : null
            }


        </div>
    );
};

export default ComboItem;