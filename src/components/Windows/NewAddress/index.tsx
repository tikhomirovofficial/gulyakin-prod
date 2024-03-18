import React, {useState} from "react";
import ShadowWrapper from "../ShadowWrapper";
import WindowBody from "../WhiteWrapper";
import {CloseIcon, Geo} from "../../../icons";
import styles from "./newAddress.module.scss"
import InputWrapper from "../../Inputs/InputWrapper";
import {useAppDispatch} from "../../../app/hooks";
import {handleNewAddress} from "../../../features/modals/modalsSlice";
import RedButton from "../../Buttons/RedButton";
import {Address} from "../../../types/user.types";
import {checkFilledValues} from "../../../utils/forms/checkFilledValues";
import {addAddress, addAddressUser} from "../../../features/profile/profileSlice";
import {appConfig} from "../../../config/AppConfig";
import useNewAddress from "../../../hooks/useNewAddress";
import AddressSuggestions from "../../AddressSuggestions";
import useAppColor from "../../../hooks/useAppColor";

const NewAddressWindow = () => {
    const dispatch = useAppDispatch()
    const {
        addressCoordsDefined,
        findedAddresses,
        changeAddress,
        formNewAddress,
        selectSearchedAddress,
        handleFormNewAddress,
        isValidAddressData
    } = useNewAddress()
    const appColor = useAppColor()
    const handleAddAddress = () => {
        dispatch(addAddressUser({
            addressData: {
                adress: formNewAddress.city,
                apartment: Number(formNewAddress.flat),
                door_code: Number(formNewAddress.code_door),
                entrance: Number(formNewAddress.entrance),
                floor: Number(formNewAddress.floor),
                lat: formNewAddress.lat || 0,
                long: formNewAddress.long || 0,
            },
            order: false
        }))
        dispatch(handleNewAddress())
    }
    return (
        <ShadowWrapper onClick={() => dispatch(handleNewAddress())}>
            <WindowBody className={`${styles.window} f-column`}>
                <div className="w-100p d-f jc-end">
                    <div onClick={() => dispatch(handleNewAddress())} className={"closeWrapper"}>
                        <CloseIcon isDark={true}/>
                    </div>
                </div>
                <div className="f-column-betw h-100p gap-30">
                    <div className="f-column gap-20">
                        <h2>Новый адрес</h2>
                        <div className="f-column gap-15">
                            <div className={"d-f w-100p p-rel"}>
                                <InputWrapper
                                    setVal={val => handleFormNewAddress("city", val)}
                                    changeVal={changeAddress}
                                    inputVal={formNewAddress.city}
                                    inputId={"address-input"}
                                    className={"w-100p"}
                                    placeholder={"Сургут, ул. Университетская, д. 9"}
                                    labelText={
                                        <div className={"d-f al-center gap-5 svgRedStroke"}>
                                            Город, улица и дом
                                            <div className={"f-c-col w-content"}>
                                                <Geo stroke={appColor} width={12}/>
                                            </div>
                                        </div>
                                    }/>
                                {
                                    findedAddresses.length && !addressCoordsDefined ?
                                        <AddressSuggestions findedAddresses={findedAddresses}
                                                            selectAddress={selectSearchedAddress}/> : null
                                }
                            </div>
                        </div>
                        <div className="f-row-betw gap-20 flex-wrap">
                            <InputWrapper inputType={"number"} setVal={val => handleFormNewAddress("entrance", val)}
                                          inputVal={formNewAddress.entrance}
                                          inputId={"entrance-input"}
                                          changeVal={(e) => handleFormNewAddress("entrance", e.currentTarget.value)}
                                          className={styles.shortInput} placeholder={"9"} labelText={"Подъезд"}/>
                            <InputWrapper inputType={"number"} setVal={val => handleFormNewAddress("code_door", val)}
                                          inputVal={formNewAddress.code_door}
                                          inputId={"code_door-input"}
                                          changeVal={(e) => handleFormNewAddress("code_door", e.currentTarget.value)}
                                          className={styles.shortInput} placeholder={"345"} labelText={"Код двери"}/>
                        </div>
                        <div className="f-row-betw gap-20 flex-wrap">
                            <InputWrapper inputType={"number"} setVal={val => handleFormNewAddress("floor", val)}
                                          inputVal={formNewAddress.floor}
                                          inputId={"floor-input"}
                                          changeVal={(e) => handleFormNewAddress("floor", e.currentTarget.value)}
                                          className={styles.shortInput} placeholder={"7"} labelText={"Этаж"}/>
                            <InputWrapper inputType={"number"} setVal={val => handleFormNewAddress("flat", val)}
                                          inputVal={formNewAddress.flat}
                                          inputId={"flat-input"}
                                          changeVal={(e) => handleFormNewAddress("flat", e.currentTarget.value)}
                                          className={styles.shortInput} placeholder={"45"} labelText={"Квартира"}/>
                        </div>
                    </div>
                    <RedButton onClick={handleAddAddress} disabled={!isValidAddressData}
                               className={`${styles.newAddressBtn} pd-10-0`}>Добавить</RedButton>


                </div>


            </WindowBody>
        </ShadowWrapper>
    );
};

export default NewAddressWindow;