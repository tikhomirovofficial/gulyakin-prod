import React, { FC } from 'react';
import styles from "./product.module.scss";
import RedButton from "../../Buttons/RedButton";
import { MinusIcon, PlusIcon, StarsIcon } from "../../../icons";
import { HasClassName } from "../../../types/components.types";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
    handleProductAdditives,
    setChangingAdditivesMode,
    setProductAdditivesData
} from "../../../features/modals/modalsSlice";
import { ProductRes, Supplement } from "../../../types/api.types";
import { editCountCart, removeProduct } from "../../../features/cart/cartSlice";
import { domain } from "../../../http/instance/instances";
import useTheme from '../../../hooks/useTheme';
import useAppColor from '../../../hooks/useAppColor';

type ProductProps = {
    id: number,
    inCart?: boolean,
    count?: number,
    is_discount?: boolean,
    price_discount?: number,
    supplements?: Array<Supplement>
} & ProductRes


const Product: FC<ProductProps & HasClassName> = ({
    title,
    supplements = [],
    image,
    id,
    count = 0,
    inCart = false,
    is_discount,
    price_discount,
    dimensions,
    className,
    composition,
    is_product_day,
    is_product_week,
    is_multiple_supplements,
    weight,
    price
}) => {
    const dispatch = useAppDispatch()
    const { isMobile, isDarkTheme } = useAppSelector(state => state.main)
    const cart = useAppSelector(state => state.cart.items)
    const gTheme = useTheme()
    const appColor = useAppColor()
    
    const handleSetAdditivesData = () => {
        dispatch(setProductAdditivesData({
            id: id,
            additives: supplements,
            currentAdditive: 0,
            description: composition,
            imageUrl: image || "",
            is_combo: false,
            name: title,
            is_discount: is_discount,
            price_discount: price_discount,
            is_multiple_supplements: is_multiple_supplements,
            price: price,
            weight: weight,
            dimensions

        }))
        dispatch(handleProductAdditives())
    }
    const handleOpenAdditives = () => {
        const addedToCart = cart.some(item => item.product.id === id && !item.is_combo)
        if (addedToCart) {
            const hasSupplements = supplements.length > 0
            if (hasSupplements) {
                dispatch(setChangingAdditivesMode(true))
                handleSetAdditivesData()
            }
            return;
        }
        handleSetAdditivesData()
        return;
    }

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
        } else {
            dispatch(removeProduct(id))
        }
    }

    return (
        <div onClick={handleOpenAdditives} className={`${styles.product} cur-pointer h-100p f-column-betw gap-15`}>
            <div className="f-column ">
                <div className={`${styles.img} w-100p`}>
                    <img src={domain + "/" + image} />
                    {
                        is_product_day ? <div className={`d-f al-center gap-5 ${gTheme("lt-active-bg", "dk-active-bg")} ${styles.productLabel}`}>
                            <StarsIcon />
                            <b>Товар дня</b>
                        </div> : is_product_week ?
                            <div className={`d-f al-center gap-5 ${styles.productLabel}`}>
                                <StarsIcon />
                                <b className={gTheme("lt-active-bg", "dk-active-bg")}>Товар недели</b>
                            </div> : null
                    }
                </div>
            </div>
            <div className={`${styles.content} f-column-betw gap-20 f-1`}>
                <div className={`${styles.textBlock} gap-5 f-1 f-column-betw`}>
                    <h3 className={gTheme("lt-dark-coal-c", "dk-gray-c")}>{title}</h3>
                    <div className="d-f jc-between gap-25 f-1">
                        <p className={gTheme("lt-c", "dk-c")}>{composition}</p>
                        {isMobile ? null :
                            <div className={`${styles.weight} txt-right ${gTheme("lt-c", "dk-c")}`}>{weight} {dimensions}</div>
                        }
                    </div>
                </div>
                <div onClick={e => e.stopPropagation()} style={{ minHeight: 37 }} className="f-row-betw">
                    {isMobile ? null :
                        <div className={"d-f al-center gap-10"}>
                            {is_discount ?
                                <div className={`sale p-rel`}>
                                    <div className={`saleLine p-abs`}></div>
                                    <strong className={gTheme("lt-gray-c", "dk-gray-c")}>{price} ₽</strong>
                                </div> : null
                            }

                            <h4 className={gTheme("lt-light-black-c", "dk-gray-c")}>{is_discount ? price_discount : price} ₽</h4>
                        </div>
                    }


                    {
                        inCart ?
                            <div className={"d-f al-center gap-5"}>
                                <div onClick={handleMinusProduct} className={"cur-pointer f-c-col pd-10-0"}><MinusIcon fill={appColor} />
                                </div>
                                <div className={`${styles.count} ${gTheme("lt-light-coal-c", "dk-lg-c")}`}>{count}</div>
                                <div onClick={handlePlusProduct} className={"cur-pointer f-c-col"}><PlusIcon fill={appColor} /></div>

                            </div>
                            :
                            <div className="d-f al-center gap-15">
                                <RedButton onClick={handleOpenAdditives} className={`${styles.btn} `}>
                                    {!isMobile ? " В корзину" : `${is_discount ? price_discount : price} ₽`}
                                </RedButton>
                                {isMobile && is_discount ?
                                    <div className={`sale p-rel`}>
                                        <div className={`saleLine p-abs`}></div>
                                        <strong className={gTheme("lt-gray-c", "dk-gray-c")}>{price} ₽</strong>
                                    </div> : null
                                }

                            </div>

                    }
                    {!isMobile ? null :
                        <div className={`${styles.weight} txt-right ${gTheme("lt-c", "dk-c")}`}>{weight} {dimensions}</div>
                    }


                </div>
            </div>


        </div>
    );
};

export default Product;