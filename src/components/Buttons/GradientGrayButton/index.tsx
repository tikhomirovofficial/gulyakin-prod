import React, {FC} from 'react';
import {ButtonProps, HasChildrenProps, HasClassName} from "../../../types/components.types";
import styles from './gradientGrayButton.module.scss'
import useTheme from '../../../hooks/useTheme';
const GradientGrayBtn: FC<HasChildrenProps & HasClassName & ButtonProps> = ({children, className, onClick}) => {
    const gTheme = useTheme()    
    return (
        <button onClick={onClick} className={`${className} ${gTheme("lt-gradientBtn", "dk-gradientBtn")} ${styles.button}`}>{children}</button>
    );
};

export default GradientGrayBtn;