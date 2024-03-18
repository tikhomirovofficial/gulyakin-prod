import React, {useEffect} from 'react';
import Header from "../../components/Header";
import styles from './profile.module.scss'
import InputWrapper from "../../components/Inputs/InputWrapper";
import {DeleteIcon, PlusIncCircleIcon} from "../../icons";
import GrayButton from "../../components/Buttons/GrayButton";
import DarkBorderedButton from "../../components/Buttons/DarkBorderedButton";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import List from "../../components/List";
import {handleNewAddress} from "../../features/modals/modalsSlice";
import {
    deleteAddressUser,
    editUser,
    getAddressesUser,
    getHistoryOrders,
    getOrderById
} from "../../features/profile/profileSlice";
import {
    handleProfileFormEditing,
    handleProfileFormVal,
    handleVisibleProfileErrors
} from "../../features/forms/formsSlice";
import {TextField} from "../../components/Inputs/TextField";
import {deleteCookie} from "../../utils/common/CookieUtil";
import {Link, useNavigate} from "react-router-dom";
import {formatPhoneNumber} from "../../utils/forms/formatePhone";
import RedButton from "../../components/Buttons/RedButton";
import OrdersHistoryList from "./History";
import useTheme from '../../hooks/useTheme';
import useAppColor from '../../hooks/useAppColor';


const Profile = () => {
    const {data, addresses, orders} = useAppSelector(state => state.profile)
    const {isDarkTheme} = useAppSelector(state => state.main)
    const {name, dob, email} = useAppSelector(state => state.forms.profileForm)
    const {profileErrors, profileErrsVisible} = useAppSelector(state => state.forms)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const appColor = useAppColor()


    const gTheme = useTheme()
    const handleGetOrderData = (order_id: number) => {
        dispatch(getOrderById({
            order_id
        }))
    }

    const handleUserEdit = () => {
        const hasErrs = Object.keys(profileErrors).length > 0
        if (hasErrs) {
            dispatch(handleVisibleProfileErrors(true))
            return;
        }
        if (!hasErrs) {
            dispatch(editUser({
                name: name.val,
                email: email.val,
                dob: dob.val
            }))
        }

    }
    const handleLogout = () => {
        deleteCookie("tokens")
        window.location.href = "/"
    }

    useEffect(() => {

        dispatch(getHistoryOrders())
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash) {
                const targetElement = document.getElementById(hash.substring(1));
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        };

        // Добавляем слушателя события для изменения хэша
        window.addEventListener('hashchange', handleHashChange);

        // Вызываем обработчик хэша при загрузке страницы
        handleHashChange();

        // Очищаем слушателя события при размонтировании компонента
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, [])
    return (
        <>
            <div className={styles.profile}>
                <div className="wrapper">
                    <div className="profileBlock f-column gap-40">
                        <div className={`${styles.form} f-column gap-25`}>
                            <div className={`sectionTitle ${gTheme("lt-coal-c", "dk-gray-c")}`}>
                                Личные данные
                            </div>
                            <div className="personalForm f-column gap-20">
                                <TextField
                                    handleSave={handleUserEdit}
                                    className={`${styles.inputField} inputFieldBlock_dark`}
                                    placeholder={"Иван"}
                                    labelText={"Ваше имя"}
                                    isEditing={name.isEditing}
                                    
                                    formValue={name.val}
                                    condValue={data.name}
                                    handleEdit={() => {
                                        dispatch(handleProfileFormEditing("name"))
                                    }}
                                    onInputFocus={() => {
                                        dispatch(handleProfileFormEditing("name"))
                                    }}
                                    onInputBlur={() => {
                                        dispatch(handleProfileFormEditing("name"))
                                        dispatch(handleProfileFormVal({keyField: "name", val: data.name}))
                                    }}
                                    setVal={val => dispatch(handleProfileFormVal({keyField: "name", val: val}))}
                                    changeVal={e => dispatch(handleProfileFormVal({
                                        keyField: "name",
                                        val: e.target.value
                                    }))}
                                />

                                <InputWrapper disabled={true} inActive={true} grayBorderedClassName={styles.inputField}
                                              locked={true}
                                              inputVal={formatPhoneNumber(data.phone)} placeholder={"Номер телефона"}
                                              labelText={
                                                  "Номер телефона"
                                              }/>

                                {
                                    data.dob.length == 0 ?
                                        <TextField
                                            handleSave={handleUserEdit}
                                            className={`${styles.inputField}`}
                                            placeholder={"Дата"}
                                            mask={"99-99-9999"}
                                            maskPlaceholder={"ДД-ММ-ГГГГ"}
                                            labelText={"Дата рождения"}
                                            isEditing={dob.isEditing}
                                            formValue={dob.val}
                                            condValue={data.dob}
                                            errText={profileErrsVisible ? profileErrors["dob"] : ""}
                                            handleEdit={() => {
                                                dispatch(handleProfileFormEditing("dob"))
                                            }}
                                            onInputFocus={() => {
                                                dispatch(handleProfileFormEditing("dob"))
                                            }}
                                            onInputBlur={() => {
                                                dispatch(handleProfileFormEditing("dob"))
                                                dispatch(handleProfileFormVal({keyField: "dob", val: data.dob}))
                                            }}
                                            setVal={val => dispatch(handleProfileFormVal({keyField: "dob", val: val}))}
                                            changeVal={e => dispatch(handleProfileFormVal({
                                                keyField: "dob",
                                                val: e.target.value
                                            }))}
                                        /> :
                                        <InputWrapper disabled={true}
                                                      inActive={true}
                                                      grayBorderedClassName={styles.inputField}
                                                      locked={true}
                                                      inputVal={data.dob}
                                                      labelText={
                                                          "Дата рождения"
                                                      }/>

                                }

                                <TextField
                                    handleSave={handleUserEdit}
                                    className={styles.inputField}
                                    placeholder={"address@mail.ru"}
                                    labelText={"Ваша почта"}
                                    isEditing={email.isEditing}
                                    formValue={email.val}
                                    condValue={data.email}
                                    errText={profileErrsVisible ? profileErrors["email"] : ""}
                                    handleEdit={() => {
                                        dispatch(handleProfileFormEditing("email"))
                                    }}
                                    onInputFocus={() => {
                                        dispatch(handleProfileFormEditing("email"))
                                    }}
                                    onInputBlur={() => {
                                        dispatch(handleProfileFormEditing("email"))
                                        dispatch(handleProfileFormVal({keyField: "email", val: data.email}))
                                    }}
                                    setVal={val => dispatch(handleProfileFormVal({keyField: "email", val: val}))}
                                    changeVal={e => dispatch(handleProfileFormVal({
                                        keyField: "email",
                                        val: e.target.value
                                    }))}
                                />

                            </div>
                        </div>
                        <div className={`${styles.addressesBlock} f-column gap-25`}>
                            <div className="top f-row-betw">
                                <div className={`sectionTitle ${gTheme("lt-coal-c", "dk-gray-c")}`}>
                                    Адреса
                                </div>
                                <DarkBorderedButton onClick={() => dispatch(handleNewAddress())}
                                                    className={`${styles.addAddressBtn}`}>
                                    <div className={"d-f al-center gap-5"}>
                                        <PlusIncCircleIcon fill={isDarkTheme ? "#c3c3c3" : "#434343"} height={14} width={14}/>
                                        <p className={gTheme("lt-coal-c", "dk-gray-c")}>Добавить</p>
                                    </div>
                                </DarkBorderedButton>
                            </div>
                            {
                                addresses.length ?
                                    <List listBlockClassname={"addresses f-column gap-20"} list={addresses}
                                          renderItem={({city, id}) => (
                                              <div className={`${styles.addressItem} ${gTheme("lt-addressItem", "dk-addressItem")} f-row-betw`}>
                                                  <div className="left f-column gap-5">
                                                      <p className={gTheme("lt-coal-c", "dk-gray-c")}>{city}</p>
                                                      <b className={gTheme("lt-coal-c", "dk-gray-c")}>{city}</b>
                                                  </div>
                                                  <div onClick={() => dispatch(deleteAddressUser({
                                                      adress_id: id
                                                  }))}
                                                       className="w-content cur-pointer f-c-col">
                                                      <DeleteIcon fill={isDarkTheme ? "#c3c3c3" : "#434343"}/>
                                                  </div>

                                              </div>
                                          )}
                                    /> :
                                    <p className={`${styles.addressesEmptyText} ${gTheme("lt-coal-c", "dk-gray-c")}`}>Добавьте новый адрес чтобы ещё удобнее
                                        совершать покупки</p>
                            }

                            <div className="f-column gap-20">
                                <div id={"orders"} className="f-column gap-10">
                                    <div className={`sectionTitle ${gTheme("lt-coal-c", "dk-gray-c")}`}>
                                       История заказов
                                    </div>
                                    <p className={`${styles.textHistory} ${gTheme("lt-coal-c", "dk-gray-c")}`}>
                                        {
                                            orders.length ? "Ваши последние заказы" : "Вы ещё не сделали ни одного заказа. Перейдите в меню, чтобы сделать свой первый заказ."
                                        }
                                    </p>
                                </div>
                                {
                                    !orders.length ?
                                        <Link to={"/"}>
                                            <RedButton className={`${styles.toMenuBtn}`}>
                                                <b>В меню</b>
                                            </RedButton>
                                        </Link>
                                        : <OrdersHistoryList orders={orders}/>
                                }

                            </div>

                        </div>
                        <GrayButton onClick={handleLogout}
                                    className={`${styles.logoutBtn} w-content cur-pointer`}>Выйти</GrayButton>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Profile;