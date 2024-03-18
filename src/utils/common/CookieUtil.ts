// Получение значения cookie по имени
function setCookie(name: string, data: any, days: number) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    const cookieValue = `${name}=${encodeURIComponent(JSON.stringify(data))}; expires=${expirationDate.toUTCString()}; path=/`;
    document.cookie = cookieValue;
}

// Получение данных из cookie
function getCookie(name: string): any | null {
    try {
        const cookies = document.cookie.split('; ');
        for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName === name) {
                return JSON.parse(decodeURIComponent(cookieValue));
            }
        }
        return null;
    } catch (e) {
        return null
    }

}


// Удаление cookie по имени
function deleteCookie(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

export {
    getCookie,
    deleteCookie,
    setCookie
}