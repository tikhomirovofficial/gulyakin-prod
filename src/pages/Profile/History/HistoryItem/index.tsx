import React, {FC} from 'react';
import {GetOrderItem} from "../../../../types/api.types";
import styles from "../../profile.module.scss";
import {formatNumberWithSpaces} from "../../../../utils/common/numberWithSpaces";
import {domain} from "../../../../http/instance/instances";
import {ArrowMiniRightIcon} from "../../../../icons";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {handleHistoryOrder} from "../../../../features/modals/modalsSlice";
import {getOrderStatus} from "../../../../utils/orders/getOrderStatus";
import {getOrderById} from "../../../../features/orders-history/orderHistorySlice";
import useTheme from '../../../../hooks/useTheme';


export type HistoryItemProps = Pick<GetOrderItem, "price" | "is_active" | "is_payment" | "order_id" | "products">
const HistoryItem: FC<HistoryItemProps> = ({
                                               order_id,
                                               is_active,
                                               is_payment,
                                               products,
                                               price
                                           }) => {
    const dispatch = useAppDispatch()

    const orderStatus = getOrderStatus(is_active, is_payment)
    const productsIsDefined = products.length > 0 && products !== undefined
    const productImage = productsIsDefined ? `${domain}${products[0].image}` : "assets/img/additive_plashka.png"
    const gTheme = useTheme()
    const {isDarkTheme} = useAppSelector(state => state.main)
    
    const openOrderDetails = () => {
        dispatch(getOrderById({
            order_id
        }))
        dispatch(handleHistoryOrder())
    }
    return (
        <div onClick={openOrderDetails} className={`pd-10 cur-pointer f-row-betw ${gTheme("lt-orderItemBg", "dk-orderItemBg")} ${styles.orderItem}`}>
            <div className="left d-f al-center gap-10">
                <div className={`${styles.imgBlock} p-rel`}>
                    <div style={{backgroundImage: `url(${productImage})`}} className={`${styles.imgItem}`}></div>
                </div>
                <div className="f-column-betw al-start">
                    <div className={`${styles.orderInfoTop} ${gTheme("lt-orderInfoTop-c", "dk-orderInfoTop-c")} d-f jc-end`}>
                        <p>Заказ</p>
                        <b>№{order_id}</b>
                    </div>
                    <div className={`${styles.orderInfoBottom} ${gTheme("lt-orderInfoBottom-c", "dk-orderInfoBottom-c")} d-f jc-end`}>
                        <p>Сумма</p>
                        <b>{formatNumberWithSpaces(~~(price))} ₽</b>
                    </div>
                </div>
            </div>
            <div className="right d-f al-center gap-40">
                <div className="f-column-betw al-start">
                    <div className={`${styles.orderInfoTop} ${gTheme("lt-orderInfoTop-c", "dk-orderInfoTop-c")} d-f jc-end`}>
                        <p>Статус</p>
                    </div>
                    <div className={`${styles.orderInfoBottom} ${gTheme("lt-orderInfoBottom-c", "dk-orderInfoBottom-c")} d-f jc-end`}>
                        <p>{orderStatus}</p>
                    </div>
                </div>
                <div className={"w-content h-content"}>
                    <ArrowMiniRightIcon stroke={isDarkTheme ? "#C3C3C3" : "#434343"} height={26} width={12}/>
                </div>
            </div>
        </div>
    );
};

export default HistoryItem;