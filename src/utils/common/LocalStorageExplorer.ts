export const addToStorage = (storageName: string, val: any) => {
    localStorage.setItem(storageName, JSON.stringify(val))
}

export const getFromStorage = (storageName: string) => {
    const stored = localStorage.getItem(storageName) || ''

    if (!stored) {
        return null
    }

    return JSON.parse(stored)
}
