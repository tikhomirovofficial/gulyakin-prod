import React, { FC } from 'react';
import { CartProductItem } from "../../../types/api.types";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
    handleProductAdditives,
    setChangingAdditivesMode,
    setProductAdditivesData
} from "../../../features/modals/modalsSlice";
import styles from "../cart.module.scss";
import { domain } from "../../../http/instance/instances";
import { addProduct, addToCart, editCountCart, removeFromCart, removeProduct } from "../../../features/cart/cartSlice";
import { MiniClose, MinusIcon, PlusIcon } from "../../../icons";
import { formatNumberWithSpaces } from "../../../utils/common/numberWithSpaces";
import useTheme from '../../../hooks/useTheme';

type CartItemProps = {
    canNotBeAdded?: boolean,
    canBeChanged?: boolean,
    is_combo?: boolean
} & CartProductItem
const CartItem: FC<CartItemProps> = ({ canNotBeAdded = false, is_combo = false, id, count, supplements, product }) => {
    const dispatch = useAppDispatch()
    const gTheme = useTheme()

    const { items, combos } = useAppSelector(state => state.products)
    const handleChange = () => {
        dispatch(setChangingAdditivesMode(true))
        if (!is_combo) {
            const findedProduct = items.filter(item => product !== undefined ? item.id === product.id : null)[0]
            dispatch(setProductAdditivesData({
                id: findedProduct.id,
                is_combo: is_combo,
                description: findedProduct.composition,
                dimensions: findedProduct.dimensions,
                is_multiple_supplements: findedProduct.is_multiple_supplements,
                cart_id: id,
                imageUrl: findedProduct.image,
                name: findedProduct.title,
                price: findedProduct.price,
                weight: findedProduct.weight,
                currentAdditive: 0,
                additives: findedProduct.supplements,
            }))
            dispatch(handleProductAdditives())
            return;

        }
        const findedCombo = combos.filter(item => item.id === product.id)[0]
        dispatch(setProductAdditivesData({
            id: findedCombo.id,
            is_combo: is_combo,
            description: findedCombo.products?.map(combo => combo.title).join(", ") || "",
            cart_id: id,
            imageUrl: findedCombo.image,
            dimensions: "г",
            name: findedCombo.title,
            price: findedCombo.price,
            weight: findedCombo.weight,
            currentAdditive: 0,
            additives: [],
        }))
        dispatch(handleProductAdditives())

    }

    const supplementsPrice = supplements.length > 0 ? supplements.reduce((a, b) => {
        return a + b.price
    }, 0) : 0

    const getCanBeChanged = () => {
        if (product !== undefined) {
            if (!is_combo) {
                return items.some(item => item.supplements.length > 0 && item.id === product.id)
            }
            return true
        }
        return null
    }
    const canBeChanged = getCanBeChanged()
    const { isDarkTheme } = useAppSelector(state => state.main)
    return (
        product !== undefined ?
            <div className={`${styles.cartItem} ${gTheme("lt-cartItem", "dk-cartItem")} ${canNotBeAdded ? styles.cartItemDisabled : ""} pd-15 bg-white `}>
                <div className={`${styles.itemInfo} w-100p d-f gap-15`}>
                    <div className={styles.imageBlock}>
                        <img src={`${domain}${product.image}`} alt="" />
                    </div>
                    {/* <div style={{ backgroundImage: `url("${domain}${product.image}")` }}
                        className={`${styles.image} bg-cover`}></div> */}
                    <div className="text f-column gap-5 f-1 al-self-center">
                        <div className={"f-column gap-5"}>
                            <b>{product.title}</b>
                            <p>{product.composition}</p>
                            {
                                supplements.length > 0 ?
                                    <p>+ {supplements.map(item => item.title).join(", ")}</p>
                                    : null
                            }

                        </div>
                        {
                            canNotBeAdded ?
                                <div className={`${styles.error} colorError`}>
                                    Не можем добавить к заказу. Замените на другое блюдо.
                                </div> : null
                        }

                    </div>
                    <div className="h-100p">
                        <div onClick={() => dispatch(removeFromCart({
                            cart_id: id
                        }))} className="close cur-pointer w-content h-content">
                            <MiniClose />
                        </div>
                    </div>

                </div>
                <div className={`${styles.itemBottom} f-row-betw`}>
                    {
                        !canNotBeAdded ?
                            <>
                                <div className="d-f al-end gap-10">
                                    {
                                        product.is_discount ?
                                            <div className={`sale p-rel`}>
                                                <div className={`saleLine p-abs`}></div>
                                                <strong className={gTheme("lt-gray-c", "dk-gray-c")}>{(product.price * count) + supplementsPrice} ₽</strong>
                                            </div> : null
                                    }
                                    <b className={styles.price}>
                                        {formatNumberWithSpaces(((product.is_discount ? product.price_discount || 0 : product.price) + supplementsPrice) * count)} ₽
                                    </b>
                                </div>

                                <div className="d-f gap-20">
                                    {
                                        canBeChanged ? <div onClick={handleChange}
                                            className={`cur-pointer ${styles.delete} ${gTheme("lt-active-c", "dk-active-c")}`}>Изменить</div> : null
                                    }

                                    <div className={"d-f al-center gap-5"}>
                                        <div onClick={() => {

                                            if (count > 1) {
                                                dispatch(editCountCart({
                                                    cart_id: id,
                                                    count: count - 1,
                                                    id: product.id

                                                }))
                                            }
                                        }} className={"cur-pointer f-c-col"}><MinusIcon fill={isDarkTheme ? "#C8C7CC" : "#434343"} width={12} />
                                        </div>

                                        <div className={styles.count}>{count}</div>
                                        <div onClick={() => {
                                            // const findedProduct = items.filter(item => product !== undefined ? item.id === product.id : null)[0]
                                            // if (!findedProduct.supplements) {
                                            //     dispatch(editCountCart({
                                            //         cart_id: id,
                                            //         count: count + 1,
                                            //         id: product.id
                                            //     }))
                                            // } else {
                                            //     dispatch(addToCart(findedProduct))
                                            // }
                                            dispatch(editCountCart({
                                                cart_id: id,
                                                count: count + 1,
                                                id: product.id
                                            }))

                                        }} className={"cur-pointer f-c-col"}><PlusIcon fill={isDarkTheme ? "#C8C7CC" : "#434343"} width={12} />
                                        </div>

                                    </div>
                                </div>

                            </> :
                            <div className="w-100p jc-end d-f">
                                <div onClick={() => dispatch(removeProduct(id))}
                                    className={`colorRed cur-pointer ${styles.delete}`}>Удалить
                                </div>
                            </div>
                    }

                </div>
            </div> : null
    )
}

export default CartItem;