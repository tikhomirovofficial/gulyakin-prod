export const deleteSeconds = (timeStr: string) => {
    const splittedTime = timeStr.split(":")
    return `${splittedTime[0]}:${splittedTime[1]}`
}