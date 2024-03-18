export function getDayOfWeekNumber(): number {
    const currentDate: Date = new Date();
    let dayNumber: number = currentDate.getDay();

    if (dayNumber === 0) {
        dayNumber = 7;
    }

    return dayNumber;
}
