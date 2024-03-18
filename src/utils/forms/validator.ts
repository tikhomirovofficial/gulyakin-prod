import {Rule} from "../../features/forms/formsSlice"
import {isDateValid} from "./dataValidation";

export const validate = <FormType,>(form: FormType, rules: Array<Rule<FormType>>) => {
    const errors: Record<string, string>  = {};

    for (const rule of rules) {
        const key = rule.key;
        const keyString = key as string

        const value = form[key];
        const valueString = value as string

        const canBeEmpty = rule?.canBeEmpty
        const valueIsEmpty = valueString.length == 0

        if(!(canBeEmpty && valueIsEmpty)) {
            const pattern = rule.pattern;
            const isDob = key === "dob"

            if (pattern && typeof value === 'string') {
                if (!pattern.test(value)) {
                    errors[keyString] = rule.err || 'Неверный формат';
                }
            }
            if(isDob) {
                const keyString = key as string
                const isValidDob = isDateValid(value as string)
                if(!isValidDob) {
                    errors[keyString] = rule.err || "Неверный формат"
                }
            }
        }

    }
    return errors
}