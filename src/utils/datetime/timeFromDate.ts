export function getTimeFromDate(inputDate: Date): string {
    const hours = String(inputDate.getHours()).padStart(2, '0'); // Получаем часы и добавляем ведущий ноль при необходимости
    const minutes = String(inputDate.getMinutes()).padStart(2, '0'); // Получаем минуты и добавляем ведущий ноль при необходимости

    return `${hours}:${minutes}`; // Возвращаем время в формате "часы:минуты"
}