import styles from "./searchInput.module.scss";
import {CloseIcon, SearchIcon} from "../../../icons";
import GrayBorderedBlock from "../../GrayBorderedBlock";
import React, {ChangeEvent, FC, useState} from "react";
import {HasClassName} from "../../../types/components.types";
import useTheme from "../../../hooks/useTheme";
import { useAppSelector } from "../../../app/hooks";

type SearchInputProps = {
    value: string,
    changeVal: (e: ChangeEvent<HTMLInputElement>) => void
    setVal: (val: string) => void
}
const SearchInput: FC<HasClassName & SearchInputProps> = ({className, changeVal, setVal, value}) => {
    const [isFocused, setIsFocused] = useState(false)
    const gTheme = useTheme()
    const {isDarkTheme} = useAppSelector(state => state.main)
    const handleClearInput = () => setVal("")

    return (
        <GrayBorderedBlock disabledBorder={isDarkTheme} labelFor={"searchInput"}
                           className={`${styles.search}  ${className || null} ${isFocused ? styles.searchFocused : null} f-row-betw gap-20`}>
            <SearchIcon/>
            <input id={"searchInput"}
                   onBlur={() => setIsFocused(false)}
                   onFocus={() => setIsFocused(true)}
                   value={value}
                   onChange={changeVal}
                   className={"f-1"}
                   type="text"
                   placeholder={"Поиск по меню"}/>
            {
                value.length ?
                    <div onClick={handleClearInput} className={`${styles.close} cur-pointer visible f-c-col`}>
                        <CloseIcon/>
                    </div> : null
            }
        </GrayBorderedBlock>
    );
};

export default SearchInput;
