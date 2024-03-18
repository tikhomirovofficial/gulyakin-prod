import React, {FC} from 'react';
import styles from './grayBorderBlock.module.scss'
import {HasChildrenProps, HasClassName} from "../../types/components.types";
import useTheme from '../../hooks/useTheme';
interface GrayBorderedBlock {
    isIncorrectStyle?: boolean
    disabled?: boolean
    isFocused?: boolean
    validError?: string,
    labelFor?: string,
    disabledBorder?: boolean
    clickHandler?: () => void
}
const GrayBorderedBlock: FC<HasChildrenProps & HasClassName & GrayBorderedBlock> = ({className, disabledBorder = false, labelFor, clickHandler, disabled, isIncorrectStyle, validError, isFocused, children}) => {
    const gTheme = useTheme()
    if(clickHandler) {
        if(labelFor) {
            return (
                <label htmlFor={labelFor}  onClick={clickHandler} className={`${styles.block} ${gTheme("lt-grayBordered", "dk-grayBordered")} ${disabledBorder ? styles.disabledBorder : null}  ${validError ? styles.error : ""} ${!disabled && isFocused ? gTheme("lt-focused", "dk-focused"): ""} ${disabled ? gTheme("lt-grayBorderedDisabled", "dk-grayBorderedDisabled"): ""} ${className || null}`}>
                    {children}
                </label>
            );
        }
        return (
            <div onClick={clickHandler} className={`${styles.block} ${gTheme("lt-grayBordered", "dk-grayBordered")} ${disabledBorder ? styles.disabledBorder : null} ${validError ? styles.error : ""} ${!disabled && isFocused ? gTheme("lt-focused", "dk-focused"): ""} ${disabled ? gTheme("lt-grayBorderedDisabled", "dk-grayBorderedDisabled") : ""} ${className || null}`}>
                {children}
            </div>
        );
    }

    if(labelFor) {
        return ( <label htmlFor={labelFor} className={`${styles.block} ${gTheme("lt-grayBordered", "dk-grayBordered")} ${disabledBorder ? styles.disabledBorder : null}  ${validError ? styles.error : ""} ${!disabled && isFocused ? gTheme("lt-focused", "dk-focused"): ""} ${disabled ? gTheme("lt-grayBorderedDisabled", "dk-grayBorderedDisabled") : ""} ${className || null}`}>
            {children}
        </label>)
    }
    return (
        <div className={`${styles.block} ${gTheme("lt-grayBordered", "dk-grayBordered")} ${disabledBorder ? styles.disabledBorder : null} ${validError ? styles.error : ""} ${!disabled && isFocused ? gTheme("lt-focused", "dk-focused") : ""} ${disabled ? gTheme("lt-grayBorderedDisabled", "dk-grayBorderedDisabled") : ""} ${className || null}`}>
            {children}
        </div>
    );
};

export default GrayBorderedBlock;