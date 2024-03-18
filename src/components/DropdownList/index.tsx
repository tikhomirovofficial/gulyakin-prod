import React, {FC} from 'react';
import List from "../List";
import {HasClassName} from "../../types/components.types";
import styles from "./dropdown.module.scss"
import {CheckedMark} from "../../icons";
import useTheme from '../../hooks/useTheme';
import { useAppSelector } from '../../app/hooks';

interface DropDownItemProps {
    isCurrent: boolean,
    text: string,
    selectHandler: () => void
}

export const DropDownItem: FC<DropDownItemProps & HasClassName> = ({isCurrent, className, text, selectHandler}) => {
    const gTheme = useTheme()
    const {isDarkTheme} = useAppSelector(state => state.main)
    
    return (
        <div onClick={selectHandler} className={`${className} ${styles.item} ${gTheme("lt-g-hover", "dk-g-hover")} ${isCurrent ? styles.checkedItem : ""}`}>
            <p className={gTheme("c-black", "dk-lg-c")}>
                {text}
            </p>
            {isCurrent ? <CheckedMark stroke={isDarkTheme ? "#C8C7CD" : "black"} height={11} width={11}/> : null}
        </div>
    )
}

interface DropdownListProps {
    items: Array<any>,
    current: number,
    classNameItem?: string,

    optionsDropDown?: {
        byId: boolean,
        keyField: string
    } | null
    selectHandler: (current: number) => void
}

const DropdownList: FC<DropdownListProps & HasClassName> = ({
                                                                items,
                                                                current,
                                                                selectHandler,
    optionsDropDown = null,
                                                                className,
                                                                classNameItem
                                                            }) => {
    const textSelected = () => {
        const isByIdMode = optionsDropDown?.byId
        if(isByIdMode) {
            const keyField = optionsDropDown.keyField
            const findedByIdItem = items?.filter(dropItem => dropItem?.id === current)[0]
            if(findedByIdItem) {
                if(Object.hasOwn(findedByIdItem, keyField)) {
                    return findedByIdItem[keyField]
                }
                return "Не key"
            }
            return "не id"
        }
        return null
    }

    return (
        <List listBlockClassname={className} list={items}
              renderItem={(item, index) => <DropDownItem selectHandler={() =>  selectHandler(optionsDropDown?.byId ? item?.id : index)}
                                                         className={classNameItem || ""} text={optionsDropDown?.byId ? item[optionsDropDown.keyField] : items[index]}
                                                         isCurrent={!optionsDropDown?.byId ? current === index : current == item?.id}/>}/>
    );
};

export default DropdownList;