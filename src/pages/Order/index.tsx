import React, { useEffect } from 'react';
import styles from './order.module.scss'
import InputWrapper from "../../components/Inputs/InputWrapper";
import { MinusIcon, PaymentCard, PaymentCash, PlusIcon, Warning } from "../../icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import RedButton from "../../components/Buttons/RedButton";
import RadioInput from "../../components/Inputs/RadioInput";
import SelectInput from "../../components/Inputs/SelectInput";
import {
    addToolsCount,
    handleOrderCallNeeded,
    handleOrderFormVal,
    handleOrderPaymentWay,
    handleOrderTime,
    handleSelectAddressId,
    handleSelectRestaurant,
    minusToolsCount,
    sendOrder,
    setOrderError,
    setOrderSuccess
} from "../../features/forms/formsSlice";
import { formatNumberWithSpaces } from "../../utils/common/numberWithSpaces";
import { getFromStorage } from "../../utils/common/LocalStorageExplorer";
import { CreateOrderRequest } from "../../types/api.types";
import { formatPhoneNumber } from "../../utils/forms/formatePhone";
import List from "../../components/List";
import { handleNewAddress } from "../../features/modals/modalsSlice";
import { useInput } from "../../hooks/useInput";
import SuccessWindow from "../../components/Windows/SuccessWindow";
import { Link } from "react-router-dom";
import OrderItem from "../../components/OrderItem";
import useOrderDetails from "../../hooks/useOrderDetails";
import useOrderAddress from "../../hooks/useOrderAddress";
import useOrderDisabled from "../../hooks/useOrderDisabled";
import useIsWorkTime from "../../hooks/useIsWorkTime";
import useTheme from '../../hooks/useTheme';
import useActualPrice from '../../hooks/useActualPrice';
import { count } from 'console';
import useAppColor from '../../hooks/useAppColor';


const Order = () => {
    const dispatch = useAppDispatch()
    const gTheme = useTheme()
    const { data, addresses } = useAppSelector(state => state.profile)
    const { orderDetails, pickupAddresses, orderWarning, workTimes, deliveryAddress, isDarkTheme } = useAppSelector(state => state.main)
    const cart = useAppSelector(state => state.cart)
    const [changeSum, setChangeSum, setStateSum] = useInput("")
    const actualPrice = useActualPrice()
    const {
        name,
        callNeeded,
        time,
        paymentWay,
        error,
        isPickup,
        restaurant,
        success,
        toolsCount,
        addressId
    } = useAppSelector(state => state.forms.orderForm)

    const hasDiscount = cart.totalDiscountPrice !== cart.totalPrice
    const {
        handleChangeDeliveryType,
        getCurrentPickupAddress,
    } = useOrderAddress()

    const { orderTimes, isCurrent } = useIsWorkTime({ ...workTimes, is_around_time: workTimes.isAroundTime })
    const addressFromStorage = getFromStorage('order_form')?.addressId

    const closeSuccess = () => {
        setOrderSuccess(false)
        window.location.href = '/profile#orders'
    }

    const handleCreateOrder = () => {
        if (error.length) {
            setOrderError("")
        }
        const paymentTypeOrder = paymentWay == "CARD" ? 1 : 2
        const timeDeliveryOrder = time == "FAST" ? "Ближайшее" : time
        const deliveryTypeOrder = isPickup ? 3 : orderDetails.delivery_type
        const changeWith = paymentWay == "CASH" ? Number(changeSum) : undefined
        const userAddressId = !isPickup ? addressId : undefined

        const req: CreateOrderRequest = {
            delivery_type: deliveryTypeOrder,
            is_call: callNeeded,
            count_tools: toolsCount,
            marekt_adress_id: isPickup ? restaurant : deliveryAddress.id,
            pyment_type: paymentTypeOrder,
            time_delivery: timeDeliveryOrder,
            change_with: changeWith,
            user_adress_id: userAddressId
        }
        dispatch(sendOrder(req))
    }

    useEffect(() => {
        dispatch(handleOrderFormVal({
            keyField: "name",
            val: data.name
        }))
    }, [])


    const { orderDisabled } = useOrderDisabled({
        isCurrentWorkTime: isCurrent,
    })
    const appColor = useAppColor()
    useOrderDetails()

    return (
        <>
            <div className={styles.order}>
                <div className="wrapper">
                    <div className={`${styles.orderContainer} d-f jc-between gap-80`}>
                        <div className="orderBlock f-column gap-40">
                            <div className={`${styles.form} f-column gap-25`}>
                                <div className={`sectionTitle ${gTheme("lt-coal-c", "dk-gray-c")}`}>Заказ на {!isPickup ? "доставку" : "самовывоз"}</div>
                                {
                                    orderDisabled ?
                                        <div
                                            className={`pd-20 errorBlock d-f al-center gap-20 ${styles.errorDelivery}`}>
                                            <Warning />
                                            <div className="f-column">
                                                <p>{orderWarning.title}</p>
                                                <b>{orderWarning.description}</b>
                                            </div>
                                        </div> : null
                                }

                                <div className="f-column gap-20">
                                    <div className="f-column gap-10">
                                        <div className="orderForm f-column gap-20">
                                            <InputWrapper
                                                setVal={val => dispatch(handleOrderFormVal({
                                                    keyField: "name",
                                                    val: val
                                                }))}
                                                changeVal={e => dispatch(handleOrderFormVal({
                                                    keyField: "name",
                                                    val: e.target.value
                                                }))}
                                                grayBorderedClassName={styles.inputField}
                                                inputVal={name.val}
                                                placeholder={"Иван"}
                                                labelText={"Ваше имя"}
                                            />

                                            <InputWrapper disabled={true} inActive={true}
                                                grayBorderedClassName={styles.inputField}
                                                locked={true}
                                                inputVal={formatPhoneNumber(data.phone)}
                                                placeholder={"Номер телефона"}
                                                labelText={
                                                    "Номер телефона"
                                                } />
                                            {
                                                !isPickup ?
                                                    <div className={`${styles.deliverySelect} f-column gap-5`}>
                                                        {
                                                            addresses.length ?
                                                                <SelectInput
                                                                    defaultCurrent={addressId || addressFromStorage}
                                                                    className={styles.selectRestaurant}
                                                                    classDropDown={`miniScrollbar ${styles.selectRestaurantItems}`}
                                                                    labelText={"Выбор адреса доставки"}
                                                                    classDropDownWrapper={`miniScrollBar ${styles.orderDropdownWrapper}`}
                                                                    selectHandler={(selected) => {
                                                                        dispatch(handleSelectAddressId(selected))
                                                                    }}
                                                                    optionsSelect={{
                                                                        byId: true,
                                                                        keyField: "city"
                                                                    }}
                                                                    items={addresses}
                                                                /> : null
                                                        }
                                                        <div style={{ fontSize: 14 }}
                                                            onClick={() => dispatch(handleNewAddress())}
                                                            className={`${styles.wayOrderBtn} self-end d-f ${gTheme("lt-active-c", "dk-active-c")} cur-pointer`}>
                                                            Добавить адрес
                                                        </div>
                                                    </div>
                                                    :
                                                    <SelectInput
                                                        defaultCurrent={getCurrentPickupAddress()}
                                                        className={styles.selectRestaurant}
                                                        classDropDown={`miniScrollbar ${styles.selectRestaurantItems}`}
                                                        classDropDownWrapper={`miniScrollBar ${styles.orderDropdownWrapper}`}
                                                        labelText={"Выберите ресторан (обязательно)"}
                                                        selectHandler={(selected) => {
                                                            dispatch(handleSelectRestaurant(selected))
                                                        }}
                                                        optionsSelect={{
                                                            byId: true,
                                                            keyField: "adress"
                                                        }}
                                                        items={pickupAddresses}
                                                    />

                                            }


                                        </div>
                                        <b onClick={handleChangeDeliveryType}
                                            className={`${styles.wayOrderBtn} d-f ${gTheme("lt-active-c", "dk-active-c")} cur-pointer`}>
                                            {isPickup ? "Выбрать доставку" : "Выбрать самовывоз"}
                                        </b>
                                    </div>
                                    <div className={`f-column gap-20 ${styles.orderOptions}`}>
                                        {
                                            isCurrent ? <div className={`${styles.timeOrder} f-column gap-10`}>
                                                <p className={gTheme("lt-c", "dk-c")}>Время</p>
                                                <div className={`${styles.timeOrderItems} gap-10 f-column w-100p`}>
                                                    <div className="d-f jc-between gap-10">
                                                        <div
                                                            onClick={() => dispatch(handleOrderTime("FAST"))}
                                                            className={`${styles.inputSelectable} ${time === "FAST" ? gTheme("lt-whiteSelectableSelected", "dk-whiteSelectableSelected") : ""} f-1 whiteSelectable txt-center p-rel ${gTheme("lt-whiteSelectable", "dk-whiteSelectable")}`}>
                                                            <p>Ближайшее</p>
                                                        </div>
                                                        <SelectInput placeholder={"Другое время"} iconMiniArrow={{
                                                            height: 10,
                                                            width: 10
                                                        }} classDropDown={styles.orderSelect}
                                                            classDropDownWrapper={`miniScrollBar ${styles.orderDropdownWrapper}`}
                                                            classNameBlock={`${styles.inputSelectable} ${styles.timeSelect} ${time !== "FAST" ? gTheme("lt-whiteSelectableSelected", "dk-whiteSelectableSelected") : ""} whiteSelectable gap-5 f-1  ${gTheme("lt-whiteSelectable", "dk-whiteSelectable")}`}
                                                            selectHandler={(selected) => {
                                                                dispatch(handleOrderTime(orderTimes[selected]))
                                                            }} items={orderTimes} />
                                                    </div>
                                                </div>
                                            </div> : null
                                        }
                                        <div className="f-column gap-20">
                                            <RadioInput selected={callNeeded} text={
                                                <p className={` ${gTheme("lt-coal-c", "dk-gray-c")}`}><b>Требуется</b> звонок оператора</p>
                                            } onSelect={() => {
                                                dispatch(handleOrderCallNeeded())
                                            }} />
                                            <RadioInput selected={!callNeeded} text={
                                                <p className={` ${gTheme("lt-coal-c", "dk-gray-c")}`}>Звонок оператора <b>не требуется</b></p>
                                            } onSelect={() => {
                                                dispatch(handleOrderCallNeeded())
                                            }} />
                                        </div>
                                        <div className={`${styles.timeOrder} f-column gap-10`}>
                                            <p className={gTheme("lt-c", "dk-c")}>Количество приборов</p>
                                            <div className={"d-f al-center gap-5"}>
                                                <div onClick={toolsCount > 1 ? () => dispatch(minusToolsCount()) : undefined} className={"cur-pointer f-c-col pd-10-0"}><MinusIcon fill={appColor} />
                                                </div>
                                                <div className={`${styles.toolsCount} txt-center ${gTheme("lt-light-coal-c", "dk-lg-c")}`}>{toolsCount}</div>
                                                <div onClick={toolsCount < 10 ? () => dispatch(addToolsCount()) : undefined} className={"cur-pointer f-c-col"}><PlusIcon fill={appColor} /></div>

                                            </div>
                                        </div>
                                    </div>

                                </div>


                            </div>
                            <div className={`${styles.leftContent} orderBottom f-column gap-40`}>
                                <div className="f-column gap-20 paymentWay">
                                    <div className={`sectionTitle  ${gTheme("lt-coal-c", "dk-gray-c")}`}>Способы оплаты</div>
                                    <div className="d-f gap-10">
                                        <div
                                            onClick={() => {
                                                dispatch(handleOrderPaymentWay("CARD"))
                                            }}
                                            className={`${styles.inputSelectable} ${paymentWay == "CARD" ? gTheme("lt-whiteSelectableSelected", "dk-whiteSelectableSelected") : ""} d-f al-center gap-5 whiteSelectable  ${gTheme("lt-whiteSelectable", "dk-whiteSelectable")}`}>
                                            <PaymentCard stroke={isDarkTheme ? "#c3c3c3" : "#434343"} />
                                            <p>Картой онлайн</p>
                                        </div>
                                        <div
                                            onClick={() => {
                                                dispatch(handleOrderPaymentWay("CASH"))
                                            }}
                                            className={`${styles.inputSelectable} ${paymentWay == "CASH" ? gTheme("lt-whiteSelectableSelected", "dk-whiteSelectableSelected") : ""} d-f al-center gap-5 whiteSelectable  ${gTheme("lt-whiteSelectable", "dk-whiteSelectable")}`}>
                                            <PaymentCash stroke={isDarkTheme ? "#c3c3c3" : "#434343"} />
                                            <p>Наличными</p>
                                        </div>
                                    </div>
                                    {
                                        paymentWay == "CASH" ?
                                            <InputWrapper
                                                className={styles.inputField}
                                                postFix={"₽"}
                                                inputType={"number"}
                                                inputId={"changeWith"}
                                                grayBorderedClassName={`${styles.inputField} ${styles.inputChangeWith}`}
                                                setVal={(val) => setStateSum(val)}
                                                changeVal={(sum) => setChangeSum(sum)}
                                                inputVal={changeSum} placeholder={"1000"}
                                                inputClassName={styles.diffCashInput}
                                                labelText={
                                                    "Сдача с"
                                                } />
                                            : null
                                    }
                                </div>
                                <div className="f-column gap-15">
                                    <div className="f-column gap-5">
                                        {
                                            error.length ?
                                                <p style={{ fontSize: 16 }} className={"colorError"}>{error}</p> : null
                                        }

                                        <RedButton onClick={handleCreateOrder}
                                            disabled={orderDisabled || (orderDetails.delivery_type === 0 && !isPickup)}
                                            className={`pd-15 ${styles.createOrderBtn}`}>Оформить заказ
                                            на {formatNumberWithSpaces(actualPrice + orderDetails.price)} ₽</RedButton>
                                    </div>

                                    <div className={"w-100p d-f jc-center"}>

                                        <Link to={"/"} className={`${styles.backCart}`}>Вернуться в меню</Link>
                                    </div>

                                </div>

                            </div>

                        </div>
                        <div className="compositionBlock f-07 ">
                            <div className={`${styles.compositionOrder} bg-white f-column gap-20`}>
                                <h3>Состав заказа</h3>
                                <div className="f-column gap-5">
                                    <List
                                        listBlockClassname={`${styles.productList} f-column gap-5`}
                                        list={cart.items}
                                        renderItem={(item => (
                                            <OrderItem
                                                supplements={item.supplements}
                                                id={item.product.id}
                                                discount_price={item.product.price_discount || 0}
                                                is_discount={item.product.is_discount || false}
                                                image={item.product.image}
                                                title={item.product.title}
                                                composition={item.product.composition}
                                                price={item.product.price}
                                                count={item.count} />
                                        ))}
                                    />
                                    <div className={`${styles.info} ${styles.part} pd-15 f-column gap-10`}>
                                        <div className={`${styles.productsInfo} f-column gap-5`}>
                                            <div className="f-row-betw">
                                                <p>{cart.items.reduce((acc, cur) => {
                                                    return acc + cur.count
                                                }, 0)} товаров</p>
                                                <p>{formatNumberWithSpaces(cart.totalPrice)} ₽</p>
                                            </div>
                                            <div className="f-row-betw">
                                                <p>Доставка</p>
                                                <p>{orderDetails.price} ₽</p>
                                            </div>
                                            {hasDiscount ?
                                                <div className="f-row-betw">
                                                    <p>Скидка</p>
                                                    <p>{cart.totalPrice - (cart.totalDiscountPrice || 0)} ₽</p>
                                                </div> : null
                                            }

                                        </div>
                                        <div className="totalInfo">
                                            <div className="f-row-betw">
                                                <b>Сумма заказа</b>
                                                <div className="d-f al-end gap-10">
                                                    {
                                                        hasDiscount ?
                                                            <div className={`sale p-rel`}>
                                                                <div className={`saleLine p-abs`}></div>
                                                                <strong className={gTheme("lt-gray-c", "dk-gray-c")}>{cart.totalPrice + orderDetails.price} ₽</strong>
                                                            </div> : null
                                                    }
                                                    <b>{formatNumberWithSpaces(actualPrice + orderDetails.price)} ₽</b>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <SuccessWindow
                bottomContent={<RedButton onClick={closeSuccess}
                    className={`${styles.orderSuccessBtn} pd-10 w-100p`}>Принять</RedButton>}
                closeHandle={closeSuccess}
                isOpened={success}
                title={"Успешно заказано!"} />
        </>
    );
};

export default Order;