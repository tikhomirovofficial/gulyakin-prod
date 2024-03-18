import {ChangeEvent, Dispatch, SetStateAction, useCallback, useState} from "react";

type useInputHook<T> = [T, (e: ChangeEvent<HTMLInputElement>) => void, Dispatch<SetStateAction<T>>];

export const useInput = <T>(initialValue: T): useInputHook<T> => {
    const [value, setValue] = useState<T>(initialValue);
    const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value as T)

    return [value, onChange, setValue];
};