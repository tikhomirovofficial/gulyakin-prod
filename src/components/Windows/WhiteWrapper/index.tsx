import React, {FC} from 'react';
import {HasChildrenProps, HasClassName} from "../../../types/components.types";
import styles from './whiteWrapper.module.scss';
import {CloseIcon} from "../../../icons";
import useTheme from '../../../hooks/useTheme';
const WindowBody: FC<HasChildrenProps & HasClassName> = ({children, className}) => {
    const gTheme = useTheme()
    return (
        <div onClick={e => e.stopPropagation()} className={`${styles.whiteBlock} ${gTheme("lt-window","dk-window")} ${className || null}  p-rel of-hide`}>
            {children}
        </div>
    );
};

export default WindowBody;