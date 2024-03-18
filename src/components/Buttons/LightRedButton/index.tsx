import React, {FC} from 'react';
import {ButtonProps, HasChildrenProps, HasClassName} from "../../../types/components.types";
import styles from './lightRedButton.module.scss'
import useTheme from '../../../hooks/useTheme';

const LightRedButton: FC<HasChildrenProps & HasClassName & ButtonProps> = ({children, onClick, className, disabled= false}) => {
    const gTheme = useTheme()
    return (
        <button disabled={disabled} onClick={onClick} className={`${className} ${gTheme("lt-lightBtn ", "dk-lightBtn ")} f-c-col ${styles.button}`}>{children}</button>
    );
};

export default LightRedButton;