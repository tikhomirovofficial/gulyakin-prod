import React, {FC} from 'react';
import {Supplement} from "../../../types/api.types";
import styles from "../cart.module.scss";
import {getImgPath} from "../../../utils/common/getAssetsPath";
import {MinusIcon, PlusIcon} from "../../../icons";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {domain} from "../../../http/instance/instances";
import useProduct from "../../../hooks/useProduct";
import {editCountCart} from "../../../features/cart/cartSlice";
import useSouse from "../../../hooks/useSouse";
import useTheme from '../../../hooks/useTheme';

type CartAdditiveItemProps = Supplement & {
    count: number,
    inCart: boolean
}
const CartAdditiveItem: FC<CartAdditiveItemProps> = ({id, price, inCart, short_description, title, count, image}) => {
    const [addSouse] = useSouse(id)
    const cart = useAppSelector(state => state.cart.items)
    const dispatch = useAppDispatch()
    const {isDarkTheme} = useAppSelector(state => state.main)
    const gTheme = useTheme()
    const handlePlusProduct = () => {
        dispatch(editCountCart({
            cart_id: cart.filter(item => item.product.id === id && !item.is_combo)[0].id,
            count: count + 1,
            id: id
        }))
    }
    const handleMinusProduct = () => {
        if (count > 1) {
            dispatch(editCountCart({
                cart_id: cart.filter(item => item.product.id === id && !item.is_combo)[0].id,
                count: count - 1,
                id: id
            }))
        }
    }
    return (
        <div key={id} className={`${styles.additiveItem} f-row-betw gap-30`}>
            <div className="d-f al-center gap-10">
                <img width={50} height={50} src={domain + image} alt=""/>
                <div className="f-column">
                    <p>{title}</p>
                    <b>{price} ₽</b>
                </div>
            </div>
            {
                inCart ?
                    <div className={"d-f al-center gap-5"}>
                        <div onClick={handleMinusProduct} className={"cur-pointer f-c-col"}><MinusIcon fill={isDarkTheme ? "#C8C7CC" : "#434343"} width={12}/></div>
                        <div className={styles.count}>{count}</div>
                        <div onClick={handlePlusProduct} className={"cur-pointer f-c-col"}><PlusIcon fill={isDarkTheme ? "#C8C7CC" : "#434343"} width={12}/></div>

                    </div> :
                    <div onClick={addSouse} className={`${styles.add} ${gTheme("lt-active-c", "dk-active-c")} cur-pointer`}>Добавить</div>
            }

        </div>
    )
}

export default CartAdditiveItem;