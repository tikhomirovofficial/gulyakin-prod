import React, {FC} from 'react';
import List from "../../../components/List";
import {GetOrderDetailsItem, GetOrderItem} from "../../../types/api.types";
import HistoryItem, {HistoryItemProps} from "./HistoryItem";

type OrdersHistoryListProps = {
    orders: GetOrderItem[]
}
const OrdersHistoryList: FC<OrdersHistoryListProps> = ({orders}) => {

    return (
       <List
           list={orders}
           listBlockClassname={"gap-10 f-column"}
           renderItem={(order) => <HistoryItem
            is_active={order.is_active}
            products={order.products}
            order_id={order.order_id}
            is_payment={order.is_payment}
            price={order.price}
           />}
       />
    );
};

export default OrdersHistoryList;