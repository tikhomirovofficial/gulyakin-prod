import {FieldType} from "../../features/forms/formsSlice";

export const withFieldType = (field: any, callback: (fieldObject: FieldType) => any) =>{
    const isObject = typeof field == "object"

    if(isObject) {
        const asObject = field as object as FieldType
        const hasNecessaryFields = Object.hasOwn(asObject, "val") &&  Object.hasOwn(asObject, "isEditing")

        if(hasNecessaryFields) {
            callback(asObject)
        }
    }
}