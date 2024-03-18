import {Supplement} from "../../types/api.types";

export const getSupplementsTotalPrice = (addedSupplements: number[], supplements: Supplement[]): number => {
    return addedSupplements?.length > 0 ? supplements.reduce((a, b) => {
        if (addedSupplements.some(sup => sup === b.id)) {
            return a + b.price
        }
        return a
    }, 0) : 0
}