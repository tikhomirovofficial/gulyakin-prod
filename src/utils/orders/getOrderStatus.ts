export const getOrderStatus = (is_active: boolean, is_payment: boolean) => {
    if (is_payment) {
        if (is_active) {
            return "Активен"
        }
        return "Исполнен"
    }
    return "Активен"
}