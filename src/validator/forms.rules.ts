import {UserData} from "../types/user.types";
import {Rule} from "../features/forms/formsSlice";

type ProfileRule = Rule<Omit<UserData, "phone">>

const profileRules: Array<ProfileRule> = [
    {
        key: "email",
        canBeEmpty: true,
        pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        err: "Неккоректный email"
    },
    {
        key: "dob",
        canBeEmpty: true,
        pattern: /^([0-9]{2}-[0-9]{2}-[0-9]{4})$/,
        err: "Неккоректная дата рождения"
    },
]

export {
    profileRules
}