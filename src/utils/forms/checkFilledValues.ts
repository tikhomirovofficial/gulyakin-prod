export const checkFilledValues = (obj: any, keysException: Array<string>): boolean => {

    return Object.keys(obj).every(key => {
        return !keysException.includes(key) ? key in obj && obj[key] !== null && obj[key] !== undefined && obj[key] !== '' : true;
    })
}