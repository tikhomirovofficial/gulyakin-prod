import React, { FC } from 'react';
import { Supplement } from "../../types/api.types";
import styles from "../../pages/Order/order.module.scss";
import { domain } from "../../http/instance/instances";
import { formatNumberWithSpaces } from "../../utils/common/numberWithSpaces";
import useTheme from '../../hooks/useTheme';

type OrderItemProps = {
    id: number,
    image: string,
    title: string,
    composition: string,
    discount_price: number,
    is_discount: boolean,
    price: number,
    count: number
    supplements?: Supplement[]
}
const OrderItem: FC<OrderItemProps> = ({ image, id, title, supplements = [], count, price, composition, is_discount, discount_price }) => {
    const additivePrice = supplements.length > 0 ? supplements.reduce((a, b) => {
        return a + b.price
    }, 0) : 0
    const gTheme = useTheme()
    return (
        <div className={`${styles.part} ${styles.product} pd-15 d-f gap-10`}>
            <div style={{ backgroundImage: `url(${domain + "/" + image})` }}
                className={`bg-cover ${styles.image}`}></div>
            <div className="f-column-betw f-1 gap-5">
                <div className="top f-column gap-5">
                    <div className="d-f gap-10">
                        <h4>{title} × {count}</h4>
                    </div>
                    <p>{composition}</p>
                    {
                        supplements.length > 0 ?
                            <p>+ {supplements.map(item => item.title).join(", ")}</p>
                            : null
                    }
                </div>
                <div className="d-f al-end gap-10">
                    {
                        is_discount ?
                            <div className={`sale p-rel`}>
                                <div className={`saleLine p-abs`}></div>
                                <strong className={gTheme("lt-gray-c", "dk-gray-c")}>{(price + additivePrice) * count} ₽</strong>
                            </div> : null
                    }
                    <strong className={`${styles.price} ${gTheme("c-black", "c-black")}`}>{formatNumberWithSpaces(((is_discount ? ~~discount_price : price) + additivePrice) * count)} ₽</strong>
                </div>

            </div>
        </div>
    )
}

export default OrderItem;