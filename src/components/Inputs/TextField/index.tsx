import InputWrapper from "../InputWrapper";
import {HasClassName} from "../../../types/components.types";
import React, {FC, useRef} from "react";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {handleProfileFormEditing} from "../../../features/forms/formsSlice";
import {EditIcon, SaveIcon} from "../../../icons";
import useTheme from "../../../hooks/useTheme";

type TextFieldProps = {
    isEditing: boolean,
    formValue: string,
    condValue: string,
    handleSave: () => void,
    handleEdit?: () => void,

} & Pick<InputWrapper, "mask" | "errText" | "maskPlaceholder" | "inputId"  | "placeholder" | "labelText" | "changeVal" | "setVal" | "onInputBlur" | "onInputFocus" | "isTextArea" | "textChangeVal"> & HasClassName
export const TextField: FC<TextFieldProps> = ({isEditing, errText, maskPlaceholder, inputId, mask, textChangeVal, handleEdit, onInputBlur, isTextArea, onInputFocus, className, handleSave, condValue, changeVal, setVal,
  placeholder, labelText, formValue}) => {


    const editRef = useRef<HTMLDivElement>(null)

    const condIsEmpty = condValue?.length === 0
    const formValIsEmpty = formValue?.length === 0
    const editingAndFilledCond = isEditing && condValue?.length !== 0
    const editingOrEmpty = isEditing || !formValue?.length
    const formValueEqualsCond = formValue === condValue
    const bothEmpty = condValue === "" && formValueEqualsCond
    const {isDarkTheme} = useAppSelector(state => state.main)
    const canBeSaved = !formValueEqualsCond && !formValIsEmpty

    const dispatch = useAppDispatch()
    const gTheme = useTheme()

    const handleInputFocus = () => {
        if(editRef.current !== null) {
            const inputElement = editRef.current?.parentNode?.children[0] as HTMLInputElement
            inputElement.focus()
        }
    }
    const handleEditing = () => {
        if(handleEdit) {
            handleEdit()
        }

        handleInputFocus()
    }

    return (
        <InputWrapper
            isChanging={isEditing}
            inputId={inputId}
            setVal={setVal}
            changeVal={changeVal}
            maskPlaceholder={maskPlaceholder}
            textChangeVal={textChangeVal}
            mask={mask || ""}
            disabled={!isEditing && !condIsEmpty && !canBeSaved}
            inActive={!isEditing && !condIsEmpty && !canBeSaved}
            onInputBlur={formValueEqualsCond || (!formValueEqualsCond && formValIsEmpty)?  onInputBlur : undefined}
            grayBorderedClassName={`${className} ${gTheme("lt-tranparent-bg", "dk-input-wrapper-bg")}`}
            onInputFocus={onInputFocus}
            inputVal={formValue}
            isTextArea={isTextArea}
            placeholder={placeholder}
            labelText={labelText}
            errText={errText}

            btn={
                editingOrEmpty || !formValueEqualsCond ?
                    <div onClick={canBeSaved ? handleSave : () => console.log("Nothing edited")}
                         className={`w-content cur-pointer ${!isTextArea ? "f-c-col" : ""}`}>
                        <SaveIcon fill={!canBeSaved ? "#E2E2E9" : isDarkTheme ? "#FCC8A5" : "#9a9a9a"}/>
                    </div> :
                    <div ref={editRef} onClick={handleEditing}
                         className={`w-content cur-pointer  ${!isTextArea ? "f-c-col" : ""}`}>
                        <EditIcon fill={isDarkTheme ? "#FCC8A5" : "#9a9a9a"}/>
                    </div>
            }/>
    )
}