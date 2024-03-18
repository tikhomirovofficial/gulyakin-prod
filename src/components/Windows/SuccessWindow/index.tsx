import React, {FC, ReactNode} from 'react';
import styles from "./successWindow.module.scss"
import WhiteWrapper from "../WhiteWrapper";
import {SuccessGreenIcon} from "../../../icons";
import {HasClassName} from "../../../types/components.types";
import useTheme from '../../../hooks/useTheme';

type SuccessWindowProps = {
    isOpened: boolean
    title: string
    closeHandle: () => any,
    bottomContent?: ReactNode
} & HasClassName
const SuccessWindow: FC<SuccessWindowProps> = ({title, bottomContent= null, closeHandle, className , isOpened}) => {
    const gTheme = useTheme()
    return (
        <div onClick={closeHandle} className={`${styles.successWindow} ${isOpened? styles.successWindowOpened : ""} ${className || ""} t-opacity-visible-transform-3 h-100v w-100v p-fix top-0 left-0 f-c-col`}>
            <WhiteWrapper className={`${styles.container} f-column al-center gap-20`}>
                <div className="f-column gap-20 al-center">
                    <h1 className={gTheme("lt-c", "dk-c")}>{title}</h1>
                    <SuccessGreenIcon/>
                </div>

                {bottomContent}
            </WhiteWrapper>

        </div>
    );
};

export default SuccessWindow;