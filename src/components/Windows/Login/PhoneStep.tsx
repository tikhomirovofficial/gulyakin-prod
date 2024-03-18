import React, {useContext} from 'react';
import {UserApi} from "../../../http/api/user.api";
import {extractDigits} from "../../../utils/common/normalizePhone";
import styles from "./login.module.scss";
import InputWrapper from "../../Inputs/InputWrapper";
import {Preloader} from "../../../icons";
import RedButton from "../../Buttons/RedButton";
import {LoginContext, LoginContextType} from "./index";
import useTheme from '../../../hooks/useTheme';
import { Link } from 'react-router-dom';

const LoginPhoneStep = () => {
    const {
        changePhone,
        phoneErr,
        phone,
        setCode,
        code,
        codeErr,
        setCodeErr,
        phoneLoading,
        setLoginStep,
        setPhoneErr,
        setPhoneLoading,
        setPhone
    } = useContext<LoginContextType>(LoginContext)
    const gTheme = useTheme()
    const handleSendPhone = async () => {
        try {
            setPhoneLoading(true)
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
                setLoginStep(1)
            }
        }  catch (e: any) {
            if(e?.code == "ERR_NETWORK" ||e?.code == "ERR_BAD_RESPONSE" || e?.response?.status == 500) {
                setPhoneErr("Ошибка подключения к серверу")
            }
        } finally {
            setPhoneLoading(false)
        }
    }

    return (
        <div className="gap-30 f-column">
            <div className="f-column gap-10">
                <h2>Войдите на сайт</h2>
                <p className={styles.caption}>
                    Чтобы сохранить адрес доставки и узнать об акциях
                </p>
            </div>
            <div className="f-column gap-20">
                <div className="f-column gap-10">
                    <InputWrapper placeholder={"+7"} mask={"+7(999) 999 99-99"} isPhone={true} setVal={setPhone}
                                  onInputBlur={() => setPhoneErr("")} errText={phoneErr} labelText={"Номер телефона"}
                                  inputId={"phone"} inputVal={phone} changeVal={changePhone}/>
                    {
                        phoneLoading ?
                            <div className={`${styles.codePreloader} ${styles.codeStatusCaption} d-f al-center gap-5`}>
                                <b>Проверяем телефон</b>
                                <div className="f-c-col infiniteSpin w-content h-content">
                                    <Preloader/>
                                </div>

                            </div> : null
                    }
                    {/*{phoneErr.length ?*/}
                    {/*    <div className={`validationErr fw-7 ${styles.codeStatusCaption} `}>{phoneErr}</div>*/}
                    {/*    : null*/}
                    {/*}*/}

                </div>
                <div className="f-column gap-15">
                    <RedButton onClick={handleSendPhone} disabled={phone.includes("_") || phone.length < 1}
                               className={"pd-10-0"}>Выслать
                        код</RedButton>
                    <div className={`caption txt-center ${gTheme("lt-caption", "dk-caption")}`}>Продолжая, вы соглашаетесь <Link to={"/"}> со сбором и
                            обработкой персональных данных и пользовательским соглашением</Link></div>
                </div>

            </div>

        </div>
    )
}
export default LoginPhoneStep