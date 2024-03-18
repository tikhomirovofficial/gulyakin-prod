import {useEffect, useRef, useState} from "react";

const useDeferred = (value: any, delay = 500) => {
    const [deferredValue, setDeferredValue] = useState(value);
    const timeoutRef = useRef<any>();

    useEffect(() => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setDeferredValue(value);
        }, delay);

        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, [value, delay]);

    return deferredValue;
}
export {
    useDeferred
}