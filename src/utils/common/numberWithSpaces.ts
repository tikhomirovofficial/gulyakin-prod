export function formatNumberWithSpaces(number: number): string {
    // Преобразуем число в строку и разбиваем его на классы
    const parts = String(number).split('.');

    // Форматируем целую часть числа, добавляя пробелы
    const formattedInteger = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    // Если есть дробная часть, добавляем ее
    const formattedNumber = parts.length > 1 ? formattedInteger + '.' + parts[1] : formattedInteger;

    return formattedNumber;
}