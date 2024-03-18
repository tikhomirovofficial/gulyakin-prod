import {ChangeEvent, useEffect, useState} from "react";
import {Address} from "../types/user.types";
import {useDeferred} from "./useDeffered";
import {FindedAddress} from "../components/Windows/DeliveryWay";
import {GeoApi} from "../http/external/geocoding/geo.api";
import {appConfig} from "../config/AppConfig";
import {checkFilledValues} from "../utils/forms/checkFilledValues";


type UseNewAddressReturn = {
    findedAddresses: Array<FindedAddress>
    isValidAddressData: boolean,
    formNewAddress: Address
    defferedAddress: string
    addressCoordsDefined: boolean
    resetFormAddress: () => void
    handleFormNewAddress: (key: keyof Address, val: string) => void,
    selectSearchedAddress: (lat: string, long: string, address: string) => void,
    changeAddress: (e: ChangeEvent<HTMLInputElement>) => void
}
const useNewAddress = (): UseNewAddressReturn => {
    const [findedAddresses, setFindedAddressess] = useState<Array<FindedAddress>>([])

    const [formNewAddress, setFormNewAddress] = useState<Address>({
        city: "",
        code_door: "",
        entrance: "",
        flat: "",
        floor: "",
        lat: 0,
        long: 0
    })

    const defferedAddress = useDeferred(formNewAddress.city, 1000)
    const addressCoordsDefined = formNewAddress.lat !== 0 && formNewAddress.long !== 0

    const resetFormAddress = () => {
        setFormNewAddress(prev => {
            return {
                ...prev,
                lat: 0,
                long: 0
            }
        })
    }
    const selectSearchedAddress = (lat: string, long: string, address: string) => {
        setFormNewAddress(prev => {
            return {
                ...prev,
                lat: Number(lat),
                long: Number(long),
                city: address
            }
        })
    }
    const changeAddress = (e: ChangeEvent<HTMLInputElement>) => {
        handleFormNewAddress("city", e.currentTarget.value)
        if(addressCoordsDefined) {
            resetFormAddress()
        }
    }
    const handleFormNewAddress = (key: keyof Address, val: string) => {
        setFormNewAddress(prevState => {
            if(key !== "lat" && key !== "long") {
                prevState[key] = val
            }
            return {...prevState}
        })
    }

    useEffect(() => {
        (async () => {
            const res = await GeoApi.Suggestions({
                query: formNewAddress.city,
                count: appConfig.MAX_SUGGESTIONS_COUNT
            })
            if(res.data) {
                setFindedAddressess(prev => {
                    const suggests: Array<FindedAddress> = res.data.suggestions.map(item => {
                        return {
                            flat: item.data.flat,
                            address: item.value,
                            city: item.data.city,
                            house: item.data.house,
                            geo_lon: item.data.geo_lon,
                            geo_lat: item.data.geo_lat
                        }
                    })
                    return [...suggests]
                })
            }

        })()
    }, [defferedAddress])
    const isValidAddressData = addressCoordsDefined && checkFilledValues(formNewAddress, appConfig.ADDRESS_KEYS_EXCEPTIONS)

    return {
        addressCoordsDefined,
        defferedAddress,
        findedAddresses,
        formNewAddress,
        handleFormNewAddress,
        resetFormAddress,
        changeAddress,
        selectSearchedAddress,
        isValidAddressData
    }
};

export default useNewAddress;