
//Функция создана для дефолтного значения календаря
//Если текущее реальное время больше, чем максимальное время записи сегодняшнего дня
//То оно вернет завтрашний день
//Если нет, то оно вернет текущий день
export function checkDateAndTime(dateToCheck: Date): Date  {
    const now = new Date();

    if (
        dateToCheck.getDate() === now.getDate() &&
        dateToCheck.getMonth() === now.getMonth() &&
        dateToCheck.getFullYear() === now.getFullYear() &&
        dateToCheck.getTime() < now.getTime()
    ) {
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0)
        return tomorrow;
    }

    return now;
}