import React, {FC} from 'react';
import {ButtonProps, HasChildrenProps, HasClassName} from "../../../types/components.types";
import styles from './darkBorderedBtn.module.scss'
import useTheme from '../../../hooks/useTheme';

const DarkBorderedButton: FC<HasChildrenProps & HasClassName & ButtonProps> = ({children, onClick, className, disabled= false}) => {
    const gTheme = useTheme()
    return (
        <button disabled={disabled} onClick={onClick} className={`${className} f-c-col ${styles.button} ${gTheme("lt-darkBorderedBtn", "dk-darkBorderedBtn")}`}>{children}</button>
    );
};

export default DarkBorderedButton;