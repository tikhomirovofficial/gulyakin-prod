import {Link, useNavigate} from "react-router-dom";
import React, {ChangeEvent, useContext, useEffect, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {UserApi} from "../../../http/api/user.api";
import {extractDigits} from "../../../utils/common/normalizePhone";
import {withChangeCodeArr} from "../../../utils/forms/withChangeCodeArr";
import {storeTokens} from "../../../utils/auth/storeTokens";
import authApi from "../../../http/instance/instances";
import {handleLogin, handleYourAddress} from "../../../features/modals/modalsSlice";
import styles from "./login.module.scss";
import GrayBorderedBlock from "../../GrayBorderedBlock";
import {Preloader} from "../../../icons";
import RedButton from "../../Buttons/RedButton";
import {LoginContext, LoginContextType} from "./index";
import {
    addToCart,
    addToCartCombo,
    setProductAfterAddress,
    setProductAfterLogin
} from "../../../features/cart/cartSlice";
import useCartAdd from "../../../hooks/useCartAdd";
import useTheme from "../../../hooks/useTheme";

const LoginCodeStep = () => {
    const navigate = useNavigate()
    const {
        setLoginStep,
        isFreezed,
        code,
        setCode,
        setIsFreezed,
        codeErr,
        codeLoading,
        setFreezedSecs,
        codeFreezedSeconds,
        phone,
        setCodeLoading,
        setCodeErr,
        setPhoneErr
    } = useContext<LoginContextType>(LoginContext)

    const [currentDigit, setCurrentDigit] = useState<number | null>(null)
    const freezed = codeFreezedSeconds !== undefined && codeFreezedSeconds > 0 && isFreezed
    const codeBlockRef = useRef<HTMLDivElement>(null)
    const productAfterLogin = useAppSelector(state => state.cart.addProductAfterLogin)
    const products = useAppSelector(state => state.products)
    const dispatch = useAppDispatch()
    const gTheme = useTheme()
    const handleAddedPopup = useCartAdd()

    const handleSendPhone = async () => {
        try {
            setPhoneErr("")
            const {status} = await UserApi.Registration({
                phone: extractDigits(phone)
            })

            if (status) {
                const codeIsFilled = code.some(item => item !== "")
                if (codeIsFilled) {
                    setCode(["", "", "", ""])
                }
                if (codeErr) {
                    setCodeErr("")
                }
            }
        } catch (e: any) {
            if (e?.code == "ERR_NETWORK") {
                setCodeErr("Ошибка подключения к серверу")
            }
        }


    }
    const handleChangeCodes = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const validSymbolAndValue = e.target.value == "" || (e.target.value.length < 2 && RegExp(/[0-9]/).test(e.target.value))
       
        if (validSymbolAndValue) {
            setCodeErr("")
            setCode(prev => {
                const digitsListNode = e.target.parentElement?.parentElement
                return withChangeCodeArr({
                    prevCodeArr: prev,
                    value: e.target.value,
                    codeListNode: digitsListNode,
                    index
                })

            })
        }
    }
    const handleNewCode = () => {
        if (!isFreezed) {
            handleSendPhone()
            setIsFreezed(true)
            setFreezedSecs(5)
            setCode(["", "", "", ""])
            return;
        }
    }
    useEffect(() => {
        (async () => {
            const codeIsFilled = code.every(item => item !== "")

            if (codeIsFilled) {
                try {
                    setCodeLoading(true)
                    const {access, refresh} = await UserApi.Login({
                        username: extractDigits(phone),
                        password: code.join("")
                    })
                    storeTokens({
                        access,
                        refresh
                    })
                    authApi.defaults.headers["Authorization"] = `Bearer ${access}`

                    if (productAfterLogin !== null) {
                        dispatch(setProductAfterAddress(productAfterLogin))
                        dispatch(handleYourAddress())
                        // if(!productAfterLogin.is_combo) {
                        //     const matchedProduct = products.items.filter(item => item.id == productAfterLogin.id)[0]
                        //     if (matchedProduct?.id !== undefined) {
                        //         const addProductSups = productAfterLogin.supplements
                        //         const addProductSupsDefined = addProductSups !== undefined
                        //         dispatch(addToCart({
                        //             ...matchedProduct,
                        //             supplements: addProductSupsDefined ? addProductSups?.map(supId => {
                        //                 return matchedProduct.supplements.filter(sup => sup.id === supId)[0]
                        //             }) : []
                        //         }))
                        //         handleAddedPopup(matchedProduct.title, matchedProduct.weight)
                        //
                        //     }
                        // } else {
                        //     const matchedCombo = products.combos.filter(item => item.id == productAfterLogin.id)[0]
                        //     if (matchedCombo?.id !== undefined) {
                        //         dispatch(addToCartCombo({
                        //             combo: [
                        //                 {
                        //                     count: 1,
                        //                     id: matchedCombo.id,
                        //                     selected_product: productAfterLogin.selected_product || 1
                        //
                        //                 }
                        //             ],
                        //             combo_prod: {
                        //                 ...matchedCombo
                        //             },
                        //
                        //
                        //         }))
                        //         handleAddedPopup(matchedCombo.title, matchedCombo.weight)
                        //     }
                        // }

                        dispatch(handleLogin())
                    } else {
                        dispatch(handleLogin())
                        navigate("/profile")
                    }

                } catch (e: any) {
                    setCodeErr("Неверный код")
                } finally {
                    setCodeLoading(false)
                }
            }
        })()

    }, [code])
    useEffect(() => {
        if (codeBlockRef.current) {
            const firstInput = codeBlockRef.current.children[0].children[0] as HTMLInputElement
            firstInput.focus()
        }
    }, [])
    return (
        <div className="gap-30 f-column">
            <div className="f-column gap-10">
                <h2>Войдите на сайт</h2>
                <div className={"f-column"}>
                    <p className={styles.caption}>
                        Код отправили сообщением на
                    </p>
                    <div className="d-f gap-10">
                        <b>{phone}</b>
                        <b onClick={() => setLoginStep(0)} className={`${styles.changePhone} ${gTheme("lt-active-c", "dk-active-c")}`}>Изменить</b>
                    </div>

                </div>

            </div>
            <div className="f-column gap-20">
                <div className="f-column al-center gap-5">
                    <div ref={codeBlockRef} className="d-f jc-center gap-10">
                        {
                            code.map((digit, index) => (
                                <GrayBorderedBlock validError={codeErr} isFocused={currentDigit === index}
                                                   className={`${styles.codeDigitBlock} f-c-col`}><input
                                    onBlur={() => setCurrentDigit(null)} onFocus={() => setCurrentDigit(index)}
                                    className={styles.codeInput} onChange={(e) => handleChangeCodes(e, index)}
                                    value={digit}
                                    type="number"/></GrayBorderedBlock>
                            ))
                        }


                    </div>
                    {
                        codeLoading ?
                            <div className={`${styles.codePreloader} ${styles.codeStatusCaption} d-f al-center gap-5`}>
                                <b>Проверяем код</b>
                                <div className="f-c-col infiniteSpin w-content h-content">
                                    <Preloader/>
                                </div>

                            </div> : null
                    }
                    {codeErr.length ?
                        <div className={`validationErr fw-7 ${styles.codeStatusCaption} `}>{codeErr}</div>
                        : null
                    }

                </div>

                <div className="f-column gap-15">
                    <RedButton onClick={handleNewCode} disabled={freezed} className={"pd-10-0"}>
                        Получить новый код {freezed ? `через ${codeFreezedSeconds} сек` : ""}
                    </RedButton>
                    <div className={`caption txt-center ${gTheme("lt-caption", "dk-caption")}`}>Продолжая, вы соглашаетесь <Link to={"/"}> со сбором и
                            обработкой персональных данных и пользовательским соглашением</Link></div>
                </div>

            </div>

        </div>
    )
}
export default LoginCodeStep