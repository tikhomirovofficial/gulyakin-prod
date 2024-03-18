import React from "react";
import ShadowWrapper from "../ShadowWrapper";
import WindowBody from "../WhiteWrapper";
import { CloseIcon } from "../../../icons";
import styles from './orderHistory.module.scss'
import OrderItem from "../../OrderItem";
import { formatNumberWithSpaces } from "../../../utils/common/numberWithSpaces";
import Preloader from "../../Preloader";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getOrderStatus } from "../../../utils/orders/getOrderStatus";
import { handleHistoryOrder } from "../../../features/modals/modalsSlice";

const HistoryOrderWindow = () => {
    const dispatch = useAppDispatch()
    const { loading, data } = useAppSelector(state => state.ordersHistory)
    const orderStatus = getOrderStatus(data.is_active, data.is_payment)


    const orderDate = new Date(data.datetime)

    const dateString = `${orderDate.getDate()}.${orderDate.getMonth() + 1}.${orderDate.getFullYear()}`

    return (
        <ShadowWrapper onClick={() => dispatch(handleHistoryOrder())}>
            <WindowBody className={`${styles.window} f-column`}>
                <div className="w-100p d-f jc-end">
                    <div onClick={() => dispatch(handleHistoryOrder())} className={"closeWrapper"}>
                        <CloseIcon isDark={true} />
                    </div>
                </div>
                {
                    loading ? <Preloader /> : <div className="f-column gap-20">
                        <div className={` f-column gap-15`}>
                            <h2>Заказ № {data.order_id}</h2>
                            <div className={`${styles.status} f-column`}>
                                <p>Статус</p>
                                <b>{orderStatus}</b>
                            </div>
                            <div className="d-f jc-between al-end">
                                <div className={`${styles.status} f-column`}>
                                    <p>Сумма заказа:</p>
                                    <b>{formatNumberWithSpaces(~~(data.price))} ₽</b>
                                </div>
                                <div className={`${styles.status} f-column al-end`}>
                                    <p>Доставка:</p>
                                    {
                                        data.is_delivery ?  <b>{formatNumberWithSpaces(~~(data.delivery_price))} ₽</b>:
                                        <b>Самовывоз</b>
                                    }
    
                                </div>
                            </div>


                            <div className="f-column gap-10">
                                <div className="al-end d-f jc-between">
                                    <div className={`${styles.status} f-column jc-end`}>
                                        <p>Состав заказа:</p>
                                    </div>
                                    <div className={`${styles.status} d-f gap-5`}>
                                        <p>Дата заказа:</p>
                                        <b>{dateString}</b>
                                    </div>
                                </div>
                                {
                                    data.products.length > 0 ?
                                        data.products.map(item => (
                                            <OrderItem is_discount={item.is_discount} discount_price={item.price_discount} id={item.id} image={item.image} title={item.title}
                                                composition={""} price={item.price} count={item.count} />
                                        ))
                                        : null
                                }
                            </div>
                        </div>
                    </div>
                }


            </WindowBody>
        </ShadowWrapper>
    );
};

export default HistoryOrderWindow;