import React, {FC, useEffect, useRef, useState} from 'react';
import {HasClassName} from "../../types/components.types";
import styles from "./switcher.module.scss"
import useTheme from '../../hooks/useTheme';
interface SwitcherProps {
    currentSelected?: number,
    elements: Array<string>,
    onSwitch?: (val: number) => void
}
const Switcher: FC<SwitcherProps & HasClassName> = ({currentSelected, onSwitch, className, elements}) => {
    const [elementWidth, setElementWidth] = useState<number>(0)
    const elementRef = useRef<HTMLDivElement>(null)
    const gTheme = useTheme()

    const handleSwitch = (index: number) => {
        if(onSwitch) {
            onSwitch(index)
        }
    }

    useEffect(() =>{
        if(elementRef?.current) {
            setElementWidth(elementWidth)
        }
    }, [elementWidth])


    return (
        <div style={{maxWidth: elementWidth}} className={`${styles.block} d-f al-center p-rel`}>
            <div style={{width: `${100 / elements.length}%`, transform: `translateX(${currentSelected !== undefined ? currentSelected * 100 : 0 * 100}%)`}} className={`${styles.thumbWrapper} f-c-col txt-center p-abs top-0`}>
                <div className={`${styles.thumb} w-100p h-100p`}>

                </div>

            </div>
            {elements.map((element, index) => {
                if(index) {
                    return <div key={index} onClick={() => handleSwitch(index)} ref={elementRef} className={`${styles.item} ${currentSelected === index ? styles.selectedItem : ""} ${gTheme("lt-coal-c", "dk-caption")} cur-pointer f-c-col txt-center`}>
                        {element} 
                    </div>
                }

                return(<div key={index} onClick={() => handleSwitch(index)} className={`${styles.item}  ${currentSelected === index ? styles.selectedItem : ""}  ${gTheme("lt-coal-c", "dk-caption")} cur-pointer  f-c-col txt-center`}>
                    {element}
                </div>)
            })}
        </div>
    );
};

export default Switcher;