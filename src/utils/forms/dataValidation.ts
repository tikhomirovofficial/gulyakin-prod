export function isDateValid(dateStr: string) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const dateParts = dateStr.split("-");

    if (dateParts.length !== 3) {
        return false; // Должно быть три части: день, месяц, год
    }

    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10);
    const year = parseInt(dateParts[2], 10);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        return false; // Проверка на числа
    }

    if (year > currentYear - 1 || year < 1900) {
        return false; // Год не должен быть больше текущего года минус один
    }

    if (month < 1 || month > 12) {
        return false; // Месяц должен быть от 1 до 12
    }

    const maxDaysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > maxDaysInMonth) {
        return false; // Проверка на максимальное число дней в месяце
    }

    return true;
}

// Пример использования:

