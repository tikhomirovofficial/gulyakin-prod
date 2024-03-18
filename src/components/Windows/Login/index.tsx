import React, {ChangeEvent, createContext, Dispatch, SetStateAction, useState} from 'react';
import WindowBody from "../WhiteWrapper";
import ShadowWrapper from "../ShadowWrapper";
import {CloseIcon} from "../../../icons";
import styles from "./login.module.scss"
import {useInput} from "../../../hooks/useInput";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {handleLogin} from "../../../features/modals/modalsSlice";
import {useInterval} from "../../../hooks/useInterval";
import LoginPhoneStep from "./PhoneStep";
import LoginCodeStep from "./CodeStep";
import {setProductAfterLogin} from "../../../features/cart/cartSlice";


export interface LoginContextType {
    setLoginStep: React.Dispatch<React.SetStateAction<number>>,
    phone: string,
    code: Array<string>
    codeErr: string
    isFreezed: boolean
    phoneErr: string,
    codeFreezedSeconds?: number,
    codeLoading: boolean,
    phoneLoading: boolean,
    changePhone: (e: ChangeEvent<HTMLInputElement>) => void,
    setCode: Dispatch<SetStateAction<Array<string>>>,
    setFreezedSecs: Dispatch<SetStateAction<number>>,
    setIsFreezed: Dispatch<SetStateAction<boolean>>,
    setCodeErr: Dispatch<SetStateAction<string>>,
    setPhone: Dispatch<SetStateAction<string>>,
    setPhoneErr: Dispatch<SetStateAction<string>>,
    setCodeLoading: Dispatch<SetStateAction<boolean>>
    setPhoneLoading: Dispatch<SetStateAction<boolean>>

}

export const loginContextDefault = {
    setLoginStep: () => {
    },
    code: ["", "", "", ""],
    codeErr: "",
    phone: "",
    codeLoading: false,
    phoneLoading: false,
    phoneErr: "",
    isFreezed: false,
    setCode(value: ((prevState: Array<string>) => Array<string>) | Array<string>): void {
    },
    setCodeErr(value: ((prevState: string) => string) | string): void {
    },
    changePhone(e: React.ChangeEvent<HTMLInputElement>): void {
    },
    setPhoneErr(value: ((prevState: string) => string) | string): void {
    },
    setPhone(value: ((prevState: string) => string) | string): void {
    },
    setCodeLoading(value: ((prevState: boolean) => boolean) | boolean): void {
    },
    setPhoneLoading(value: ((prevState: boolean) => boolean) | boolean): void {
    },
    setIsFreezed(value: ((prevState: boolean) => boolean) | boolean): void {
    },
    setFreezedSecs(value: ((prevState: number) => number) | number): void {
    },
}

export const LoginContext = createContext<LoginContextType>(loginContextDefault)
const loginSteps = [LoginPhoneStep, LoginCodeStep]

const LoginWindow = () => {
    const [loginStep, setLoginStep] = useState<number>(0)
    const CurrentStep = loginSteps[loginStep]

    const [phoneVal, changePhone, setPhone] = useInput(loginContextDefault.phone)
    const [codeVal, setCode] = useState<Array<string>>(loginContextDefault.code)
    const [codeLoading, setCodeLoading] = useState<boolean>(loginContextDefault.codeLoading)
    const [phoneLoading, setPhoneLoading] = useState<boolean>(loginContextDefault.phoneLoading)
    const [isFreezed, setIsFreezed] = useState<boolean>(loginContextDefault.codeLoading)
    const [codeFreezedSecs, setCodeFreezedSecs] = useState(0)

    const [phoneErr, setPhoneErr] = useState<string>(loginContextDefault.phoneErr)
    const [codeErr, setCodeErr] = useState<string>(loginContextDefault.codeErr)

    useInterval(() => {
        if (isFreezed && codeFreezedSecs > 0) {
            setCodeFreezedSecs((prev) => prev - 1);
        } else {
            setIsFreezed(false);
            setCodeFreezedSecs(0);
        }
    }, 1000);

    const dispatch = useAppDispatch()
    const productAfterLogin = useAppSelector(state => state.cart.addProductAfterLogin)
    const handleCloseLogin = () => {
        if(productAfterLogin !== null) {
            dispatch(setProductAfterLogin(null))
        }
        dispatch(handleLogin())
    }
    return (
        <LoginContext.Provider value={{
            setLoginStep,
            isFreezed: isFreezed,
            setIsFreezed: setIsFreezed,
            phone: phoneVal,
            code: codeVal,
            codeLoading: codeLoading,
            phoneErr: phoneErr,
            phoneLoading: phoneLoading,
            codeErr: codeErr,
            codeFreezedSeconds: codeFreezedSecs,
            changePhone: changePhone,
            setCode: setCode,
            setFreezedSecs: setCodeFreezedSecs,
            setCodeErr: setCodeErr,
            setPhoneErr: setPhoneErr,
            setPhone: setPhone,
            setCodeLoading: setCodeLoading,
            setPhoneLoading: setPhoneLoading

        }}>
            <ShadowWrapper onClick={handleCloseLogin}>
                <WindowBody className={`${styles.window} f-column`}>
                    <div className="w-100p d-f jc-end">
                        <div onClick={() => dispatch(handleLogin())} className={"closeWrapper"}>
                            <CloseIcon isDark={true}/>
                        </div>
                    </div>
                    <CurrentStep/>
                </WindowBody>
            </ShadowWrapper>
        </LoginContext.Provider>

    );
};

export default LoginWindow;