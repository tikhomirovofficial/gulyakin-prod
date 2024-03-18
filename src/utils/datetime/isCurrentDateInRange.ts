export function isCurrentDateInRange(date1: Date, date2: Date): boolean {
    const currentDate = new Date();
    return (currentDate >= date1 && currentDate <= date2) || (currentDate >= date2 && currentDate <= date1);
}
