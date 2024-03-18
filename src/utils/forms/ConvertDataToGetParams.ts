export const ConvertDataToGetParams = (obj: Record<string, any>) => {
    const queryString = Object.keys(obj)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
        .join('&');
    return `?${queryString}`;
}