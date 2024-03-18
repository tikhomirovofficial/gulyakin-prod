
export function formatPhoneNumber(phoneNumber: string): string {
    // удаляем все символы, кроме цифр
    phoneNumber = phoneNumber.replace(/\D/g, '');
    // добавляем +7 в начало, если его нет
    if (phoneNumber.length === 10) {
        phoneNumber = '7' + phoneNumber;
    } else if (phoneNumber.length === 11 && phoneNumber[0] === '8') {
        phoneNumber = '7' + phoneNumber.slice(1);
    }
    // форматируем номер телефона
    const formattedPhoneNumber = `+7(${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4, 7)} ${phoneNumber.slice(7,9)}-${phoneNumber.slice(9,11)}`;
    return formattedPhoneNumber;
}