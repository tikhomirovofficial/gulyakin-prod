import React, { FC, useEffect, useState } from 'react';
import WindowBody from "../WhiteWrapper";
import { CloseIcon, Geo } from "../../../icons";
import RedButton from "../../Buttons/RedButton";
import ShadowWrapper from "../ShadowWrapper";
import styles from './deliveryWay.module.scss'
import Switcher from "../../Switcher";
import InputWrapper from "../../Inputs/InputWrapper";
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";
import GrayBorderedBlock from "../../GrayBorderedBlock";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
    handleDeliveryVariant,
    handleDeliveryWayWindow,
    setAddressSuccess,
    setAddressSuccessTitle
} from "../../../features/modals/modalsSlice";
import { handleSelectAddressId, handleSelectRestaurant } from "../../../features/forms/formsSlice";
import { addToCart, addToCartCombo, setProductAfterAddress } from "../../../features/cart/cartSlice";
import { setSelectedInDelivery, setSelectedInPickup } from "../../../features/restaurants/restaurantsSlice";
import { addAddressUser } from "../../../features/profile/profileSlice";
import { AddressByCityItem, AddressByMarketCity } from "../../../types/api.types";
import { deleteSeconds } from "../../../utils/datetime/deleteSecondsInTime";
import useCartAdd from "../../../hooks/useCartAdd";
import useMarketLogo from "../../../hooks/useMarketLogo";
import useNewAddress from "../../../hooks/useNewAddress";
import AddressSuggestions from "../../AddressSuggestions";
import { getImgPath } from "../../../utils/common/getAssetsPath";
import useAppColor from '../../../hooks/useAppColor';
import useTheme from '../../../hooks/useTheme';

interface AddressItemProps {
    selected: boolean,
    text: string
    disabled?: boolean,
    timeWork?: string[],
    selectedHandle?: () => void
}


const AddressItem: FC<AddressItemProps> = ({ selected, text, selectedHandle, timeWork, disabled = false }) => {
    const { isDarkTheme } = useAppSelector(state => state.main)
    const hasIncorrectTimeWork = timeWork?.some(item => item === undefined || item === null)
    if (disabled) {
        return (
            <GrayBorderedBlock disabled={disabled} className={`pd-20 d-f gap-10 cur-pointer ${styles.addressItem} `}>
                <Geo stroke={isDarkTheme ? "white" : "black"} />
                <div className={`f-column gap-5 ${styles.text}`}>
                    <h2>{text}</h2>
                    {
                        timeWork && !hasIncorrectTimeWork ?
                            <div className="f-column">
                                <div
                                    className={styles.timeWork}>{deleteSeconds(timeWork[0])} — {deleteSeconds(timeWork[1])}</div>
                            </div> : null

                    }

                </div>
            </GrayBorderedBlock>
        )
    }
    return (
        <GrayBorderedBlock clickHandler={selectedHandle} isFocused={selected}
            className={`pd-20 d-f gap-10 cur-pointer ${styles.addressItem} `}>
            <Geo stroke={isDarkTheme ? "white" : "black"} />
            <div className={`f-column gap-5 ${styles.text}`}>
                <h2>{text}</h2>
                {
                    timeWork && !hasIncorrectTimeWork ?
                        <div className="f-column">
                            <div
                                className={styles.timeWork}>{deleteSeconds(timeWork[0])} — {deleteSeconds(timeWork[1])}</div>
                        </div> : null

                }
            </div>
        </GrayBorderedBlock>
    )
}
export type FindedAddress = {
    address: string,
    city: string,
    house: string | null,
    flat: string | null,
    geo_lat: string | null,
    geo_lon: string | null,
}
type DeliveryWayCommonProps = {
    addToCartWithAfterClose: () => void,
    setMapCenter?: (coords: number[]) => void
    handleIsSelectingAddress?: () => void,
    handleSuccess?: (title: string) => any
}

type SearchAddressProps = {
    handleAddress: () => any
} & FindedAddress
export const SearchAddressItem: FC<SearchAddressProps> = ({ address, handleAddress, city }) => {
    const gTheme = useTheme()

    return (
        <div onClick={handleAddress} className={`pd-10 ${styles.searchAddressItem} ${gTheme("lt-searchItem", "dk-searchItem")} cur-pointer f-column gap-5`}>
            <b>{address}</b>
            <p>{city}</p>
        </div>
    )
}

const DeliveryVariant: FC<DeliveryWayCommonProps> = ({ addToCartWithAfterClose, setMapCenter, handleSuccess }) => {
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
    useEffect(() => {
        if (setMapCenter) {
            setMapCenter([formNewAddress.lat, formNewAddress.long])
        }
    }, [formNewAddress.city])
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
            order: true
        }))
        addToCartWithAfterClose()
    }


    return (
        <>
            <div className={`${styles.deliveryWayForm} f-column gap-10 f-1`}>
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
                                    <Geo stroke={appColor} width={12} />
                                </div>
                            </div>
                        } />
                    {
                        findedAddresses.length && !addressCoordsDefined ?
                            <AddressSuggestions findedAddresses={findedAddresses}
                                selectAddress={selectSearchedAddress} /> : null
                    }
                </div>
                <div className={`f-row-betw gap-20 ${styles.inputParts} flex-wrap`}>
                    <InputWrapper
                        setVal={val => handleFormNewAddress("entrance", val)}
                        changeVal={(e) => handleFormNewAddress("entrance", e.currentTarget.value)}
                        inputVal={formNewAddress.entrance}
                        inputId={"entrance-input"}
                        className={styles.partInputBlock}
                        placeholder={""}
                        labelText={"Подъезд"} />
                    <InputWrapper
                        setVal={val => handleFormNewAddress("code_door", val)}
                        changeVal={(e) => handleFormNewAddress("code_door", e.currentTarget.value)}
                        inputVal={formNewAddress.code_door}
                        inputId={"code_door-input"}
                        className={styles.partInputBlock}
                        placeholder={""}
                        labelText={"Код двери"} />

                </div>
                <div className={`f-row-betw gap-20 ${styles.inputParts} flex-wrap`}>
                    <InputWrapper
                        setVal={val => handleFormNewAddress("floor", val)}
                        changeVal={(e) => handleFormNewAddress("floor", e.currentTarget.value)}
                        inputVal={formNewAddress.floor}
                        inputId={"floor-input"}
                        className={styles.partInputBlock}
                        placeholder={""}
                        labelText={"Этаж"} />
                    <InputWrapper
                        setVal={val => handleFormNewAddress("flat", val)}
                        changeVal={(e) => handleFormNewAddress("flat", e.currentTarget.value)}
                        inputVal={formNewAddress.flat}
                        inputId={"flat-input"}
                        className={styles.partInputBlock}
                        placeholder={""}
                        labelText={"Квартира"} />

                </div>
            </div>
            <div className={`w-100p d-f ${styles.deliveryBtnBlock} `}>
                <RedButton onClick={handleAddAddress} disabled={!isValidAddressData}
                    className={`pd-10-0 w-100p ${styles.deliveryBtn}`}>Добавить</RedButton>
            </div>

        </>
    )
}
const AddressProfileVariant: FC<DeliveryWayCommonProps> = ({
    addToCartWithAfterClose,
    handleSuccess,
    handleIsSelectingAddress
}) => {
    const { addresses } = useAppSelector(state => state.profile)
    const { selectedInDelivery } = useAppSelector(state => state.restaurants)
    const dispatch = useAppDispatch()
    const gTheme = useTheme()

    const handleToNewAddress = () => {
        if (handleIsSelectingAddress) {
            handleIsSelectingAddress()
        }
        dispatch(setSelectedInDelivery(-1))
    }

    const handleAddAddressDelivery = () => {
        dispatch(handleSelectAddressId(selectedInDelivery))
        addToCartWithAfterClose()
        if (handleSuccess) {
            handleSuccess("Адрес выбран!")
        }
    }

    return (
        <>
            <div className={`f-column gap-10 h-100p ${styles.addressesList}`}>
                {
                    addresses.map(item => (
                        <AddressItem selected={item.id === selectedInDelivery} text={item.city}
                            key={item.id} selectedHandle={() => dispatch(setSelectedInDelivery(item.id))}
                        />
                    ))
                }

            </div>

            <div className={`w-100p d-f ${styles.deliveryBtnBlock} f-column gap-10`}>
                <b style={{ maxWidth: "fit-content" }} onClick={handleToNewAddress} className={`${gTheme("lt-active-c", "dk-active-c")} cur-pointer`}>Добавить адрес</b>
                <RedButton disabled={selectedInDelivery == -1} onClick={handleAddAddressDelivery}
                    className={`pd-10-0 ${styles.deliveryBtn}`}>Выбрать</RedButton>
            </div>

        </>
    )

}
const PickupVariant: FC<DeliveryWayCommonProps> = ({ addToCartWithAfterClose, handleSuccess }) => {
    const { cityAddresses } = useAppSelector(state => state.main)
    const { selectedInPickup } = useAppSelector(state => state.restaurants)

    const dispatch = useAppDispatch()

    const handleAddAddressPickup = () => {
        dispatch(handleSelectRestaurant(selectedInPickup))
        addToCartWithAfterClose()
        if (handleSuccess) {
            handleSuccess("Адрес выбран!")
        }
    }
    const selectPickupAddress = (id: number) => {
        dispatch(setSelectedInPickup(id))
    }
    return (
        <>
            {
                cityAddresses.length ? <div className={`f-column gap-10 h-100p ${styles.addressesList}`}>
                    {cityAddresses.map((item) => (
                        <AddressItem text={item.adress}
                            timeWork={[item.work_with, item.works_until]}
                            key={item.id} selectedHandle={() => selectPickupAddress(item.id)}
                            selected={item.id === selectedInPickup} />
                    ))}
                </div>
                    : <p>Пожалуйста, выберите товары только из одного магазина, либо оформите доставку</p>
            }

            <div className={`w-100p d-f ${styles.deliveryBtnBlock}`}>
                <RedButton onClick={handleAddAddressPickup} disabled={selectedInPickup == -1}
                    className={"pd-10-0 w-100p"}>Выбрать</RedButton>
            </div>


        </>

    )
}


const DeliveryWay = () => {
    const dispatch = useAppDispatch()
    const handleAddedPopup = useCartAdd()

    const { variant } = useAppSelector(state => state.modals.deliveryWay)
    const { addresses, isPhone, market, cityAddresses, pickupAddresses, canOrder } = useAppSelector(state => state.main)
    const profileAddresses = useAppSelector(state => state.profile.addresses)
    const { selectedInPickup, selectedInDelivery } = useAppSelector(state => state.restaurants)
    const [currentAddress, setCurrentAddress] = useState<AddressByCityItem | null>(null)
    const [deliveryFromProfile, setDeliveryFromProfile] = useState(profileAddresses.length > 0)
    const [coordsNewAddres, setCoordsNewAddress] = useState([0, 0])

    const logo = useMarketLogo()
    const gTheme = useTheme()

    const getCurrentAddress = () => {
        if (cityAddresses.length > 0) {
            if (selectedInPickup !== -1) {
                return cityAddresses.filter(item => item.id === selectedInPickup)[0]
            }
            return cityAddresses[0]
        }
        return null
    }

    useEffect(() => {
        setCurrentAddress(getCurrentAddress())
    }, [cityAddresses, selectedInPickup])

    const getMapCenter = () => {
        if (variant) {
            if (currentAddress !== null && currentAddress !== undefined) {
                return [currentAddress.long, currentAddress.lat]
            }
            return [0, 0]
        }
        if (deliveryFromProfile) {
            if (profileAddresses.length > 0) {
                const address = profileAddresses.filter(item => item.id === selectedInDelivery)[0]
                if (address !== undefined) {
                    return [address.lat, address.long]
                }
                return [profileAddresses[0].lat, profileAddresses[0].long]
            }
            return [0, 0]
        }
        return coordsNewAddres

    }

    const handleSuccess = (title: string) => {
        dispatch(setAddressSuccessTitle(title))
        dispatch(setAddressSuccess(true))
        setTimeout(() => {
            dispatch(setAddressSuccess(false))
        }, 2000)
    }

    const { addProductAfterAddress } = useAppSelector(state => state.cart)
    const products = useAppSelector(state => state.products)

    const addToCartWithClose = () => {
        if (addProductAfterAddress !== null) {
            if (!addProductAfterAddress.is_combo) {
                const matchedProduct = products.items.filter(item => item.id == addProductAfterAddress.id)[0]
                if (matchedProduct?.id !== undefined) {
                    const addProductSups = addProductAfterAddress.supplements
                    const addProductSupsDefined = addProductSups !== undefined
                    dispatch(addToCart({
                        ...matchedProduct,
                        supplements: addProductSupsDefined ? addProductSups?.map(supId => {
                            return matchedProduct.supplements.filter(sup => sup.id === supId)[0]
                        }) : []
                    }))
                    handleAddedPopup(matchedProduct.title, matchedProduct.weight)
                }
            } else {
                const matchedCombo = products.combos.filter(item => item.id == addProductAfterAddress.id)[0]
                if (matchedCombo?.id !== undefined) {
                    dispatch(addToCartCombo({
                        combo: [
                            {
                                count: 1,
                                id: matchedCombo.id,
                                selected_product: addProductAfterAddress.selected_product || 1

                            }
                        ],
                        combo_prod: {
                            ...matchedCombo
                        },


                    }))
                    handleAddedPopup(matchedCombo.title, matchedCombo.weight)
                    dispatch(setAddressSuccess(true))
                }
            }
            dispatch(setProductAfterAddress(null))
            dispatch(handleDeliveryWayWindow())

        }
    }

    const handleAddressFromProfile = () => {
        setDeliveryFromProfile(prev => !prev)
    }

    const closeDeliveryWay = () => {
        dispatch(handleDeliveryWayWindow())
        dispatch(setSelectedInPickup(-1))
    }
    const handleDeliveryWay = (index: number) => {
        dispatch(handleDeliveryVariant(index))
        dispatch(setSelectedInPickup(-1))
    }

    const mapCenterCoords = getMapCenter()
    return (
        <ShadowWrapper onClick={closeDeliveryWay}>
            <WindowBody className={`${styles.window} f-row-betw p-rel`}>
                <div onClick={closeDeliveryWay} className={"modalAbsoluteClose closeWrapper p-abs"}>
                    <CloseIcon isDark={true} />
                </div>
                <div className={`${styles.content} f-column-betw pd-30 gap-20`}>
                    <div className="top f-column gap-10">
                        <div className="f-column gap-5">
                            <h2>{!variant ? deliveryFromProfile ? "Выбрать адрес" : "Новый адрес" : "Самовывоз"}</h2>
                            {
                                profileAddresses.length && !variant && !deliveryFromProfile ?
                                    <b onClick={handleAddressFromProfile} className={gTheme("lt-active-c", "dk-active-c")}>Выбрать
                                        существующий</b> : null
                            }

                        </div>

                        <Switcher onSwitch={handleDeliveryWay} currentSelected={variant}
                            elements={["Доставка", "Самовывоз"]} />

                    </div>
                    {isPhone ? <div className={styles.map}>
                        <YMaps>
                            <Map className={`${styles.mapContainer} h-100p w-100p`}
                                state={{
                                    center: getMapCenter(),
                                    zoom: 16
                                }}>
                                {
                                    currentAddress !== null && currentAddress !== undefined && variant ?
                                        <Placemark geometry={[currentAddress.long, currentAddress.lat]} options={
                                            {
                                                iconLayout: 'default#image', // Используем стандартный макет изображения
                                                iconImageHref: logo, // Укажите URL вашей кастомной иконки
                                                iconImageSize: [52, 52], // Размер вашей иконки
                                                iconImageOffset: [-26, -52],
                                            }
                                        } /> :

                                        !variant && mapCenterCoords !== undefined ? <Placemark geometry={[mapCenterCoords[0], mapCenterCoords[1]]} options={
                                            {
                                                iconLayout: 'default#image',
                                                iconImageHref: getImgPath("geo.svg"),// Используем стандартный макет изображенияУкажите URL вашей кастомной иконки
                                                iconImageSize: [30, 46], // Размер вашей иконки
                                                iconImageOffset: [-15, -46],
                                            }
                                        } /> : null

                                }

                            </Map>
                        </YMaps>
                    </div> : null

                    }

                    {
                        !variant ?
                            !deliveryFromProfile ?
                                <DeliveryVariant setMapCenter={setCoordsNewAddress} addToCartWithAfterClose={addToCartWithClose} /> :
                                <AddressProfileVariant handleSuccess={handleSuccess}
                                    handleIsSelectingAddress={handleAddressFromProfile}
                                    addToCartWithAfterClose={addToCartWithClose} /> :
                            <PickupVariant handleSuccess={handleSuccess} addToCartWithAfterClose={addToCartWithClose} />

                    }

                </div>
                {
                    !isPhone ?
                        <div className={styles.map}>
                            <YMaps>
                                <Map className={"h-100p w-100p"}
                                    state={{
                                        center: getMapCenter(),
                                        zoom: 17
                                    }}>
                                    {
                                        currentAddress !== null && currentAddress !== undefined && variant ?
                                            <Placemark geometry={[currentAddress.long, currentAddress.lat]} options={
                                                {
                                                    iconLayout: 'default#image', // Используем стандартный макет изображения
                                                    iconImageHref: logo, // Укажите URL вашей кастомной иконки
                                                    iconImageSize: [52, 52], // Размер вашей иконки
                                                    iconImageOffset: [-26, -52],
                                                }
                                            } /> :

                                            !variant && mapCenterCoords !== undefined ? <Placemark geometry={[mapCenterCoords[0], mapCenterCoords[1]]} options={
                                                {
                                                    iconLayout: 'default#image',
                                                    iconImageHref: getImgPath("geo.svg"),// Используем стандартный макет изображенияУкажите URL вашей кастомной иконки
                                                    iconImageSize: [30, 46], // Размер вашей иконки
                                                    iconImageOffset: [-15, -46],
                                                }
                                            } /> : null

                                    }

                                </Map>
                            </YMaps>
                        </div> : null
                }

            </WindowBody>
        </ShadowWrapper>
    );
};

export default DeliveryWay;