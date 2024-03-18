import React, {FC} from 'react';
import With from "../../components/HOCs";
import {useAppSelector} from "../../app/hooks";
import Order from "./index";
import {Navigate} from "react-router-dom";

const WithOrder = () => {
    const {cart} = useAppSelector(state => state)
    return (
        <With condition={cart.items.length > 0} onTrueComponent={<Order/>} onFalseComponent={<Navigate to={"/"}/>}/>
    );
};

export default WithOrder;