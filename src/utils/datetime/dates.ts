export const isAfter10PM = (date: Date) => {
    const currentHour = date.getHours();
    return currentHour >= 22;
};

export const isToday = (date: Date) => {
    const today = new Date();
    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
};