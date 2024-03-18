import React, {ChangeEvent, Dispatch, FC, ReactNode, SetStateAction, useEffect, useRef, useState} from 'react';
import GrayBorderedBlock from "../../GrayBorderedBlock";
import styles from "./inputWrapper.module.scss"
import {ArrowMiniDown, ArrowMiniRightIcon, IconProps} from "../../../icons";
import {HasClassName} from "../../../types/components.types";
import DropdownList from "../../DropdownList";
import useTheme from '../../../hooks/useTheme';
import { useAppSelector } from '../../../app/hooks';

interface SelectInputWrapper {
    selectHandler: (val: number) => void,
    defaultCurrent?: number,
    items: Array<any>
    isEmpty?: boolean
    isFocused?: boolean
    errText?: string,
    inputVal?: number | string,
    classDropDown?: string,
    classDropDownWrapper?: string,
    iconMiniArrow?: IconProps,
    placeholder?: string,
    optionsSelect?: {
        byId: boolean
        keyField: string
    } | null
    labelText?: ReactNode,
    classNameBlock?: string,
    onInputBlur?: () => void
    changeVal?: (e: ChangeEvent<HTMLInputElement>) => any,
    setVal?: Dispatch<SetStateAction<string>>
}

const SelectInput: FC<SelectInputWrapper & HasClassName> = ({
                                                                isEmpty = true,
                                                                placeholder,
                                                                classDropDown,
                                                                classDropDownWrapper,
                                                                iconMiniArrow = {
                                                                    height: 13,
                                                                    width: 13
                                                                },
                                                                defaultCurrent,
                                                                classNameBlock,
                                                                selectHandler,
                                                                optionsSelect = null,
                                                                isFocused,
                                                                items,
                                                                className,
                                                                labelText,
                                                                errText
                                                            }) => {
    const [selected, setSelected] = useState<number>((defaultCurrent != undefined ? defaultCurrent : -1))
    const [focused, setIsFocused] = useState<boolean>(isFocused || false)

    const dropdownRef = useRef<HTMLDivElement>(null);
    const selectInputRef = useRef<HTMLDivElement>(null);
    const gTheme = useTheme()
    const {isDarkTheme} = useAppSelector(state => state.main)
    const toggleFocused = () => setIsFocused(!focused)

    const handleSelected = (val: number) => {
        setSelected(val)
        selectHandler(val)
    }

    const handleClickOutside = (e: any) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            if (selectInputRef.current && !selectInputRef.current.contains(e.target)) {
                setIsFocused(false)
            }

        }

    };
    const findedById = optionsSelect?.byId ? items.filter(item => {
        if (item?.id === selected) {
            return item
        }
    })[0] || null : null
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [])
    return (
        <div ref={selectInputRef} className={`f-column gap-10 ${className}`}>
            {labelText ? <label className={`${errText ? styles.errorTextColor : null} ${styles.labelItem} ${gTheme("lt-input-label-c", "dk-input-label-c")}`}>{labelText}</label> : null}
            <GrayBorderedBlock clickHandler={toggleFocused} validError={errText} isFocused={focused}
                               className={`f-row-betw ${classNameBlock ? classNameBlock : "inputField"} p-rel cur-pointer`}>
                {
                    selected < 0 ?
                        placeholder ?
                            <p>{placeholder}</p> :
                            <p className={"inactiveColor"}>{"Пусто"}</p> :
                        <p className={`${classDropDown} ${gTheme("lt-selectedValue", "dk-selectedValue")}`}>{!optionsSelect?.byId ? items[selected] : findedById !== null ? findedById[optionsSelect?.keyField] : items.length > 0 ? items[0][optionsSelect?.keyField] : "Выбрать"}</p>
                }
                {
                    focused ? <ArrowMiniDown stroke={isDarkTheme ? "#c3c3c3" : "black"} height={iconMiniArrow.height} width={iconMiniArrow.width}/> :
                        <ArrowMiniRightIcon stroke={isDarkTheme ? "#c3c3c3" : "black"} height={iconMiniArrow.height} width={iconMiniArrow.width}/>
                }


                {focused ?
                    <div ref={dropdownRef}
                         className={`w-100p p-abs left-0 dropDown pd-20 ${styles.inputSelectBlock} ${gTheme("lt-white-bg", "dk-gray-bg")} ${classDropDownWrapper ? classDropDownWrapper : ""} `}>
                        <DropdownList classNameItem={`f-row-betw gap-5`} className={`f-column gap-5 ${styles.inputSelectBlock } ${gTheme("lt-white-bg", "dk-gray-bg")} w-100p`}
                                      items={items} current={selected}
                                      optionsDropDown={{
                                          keyField: optionsSelect?.keyField as string,
                                          byId: optionsSelect?.byId as boolean
                                      }}
                                      selectHandler={(current) => handleSelected(current)}/>
                    </div>
                    : null
                }
            </GrayBorderedBlock>
        </div>
    );

};

export default SelectInput;