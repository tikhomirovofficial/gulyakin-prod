import {Category, ProductRes} from "../../types/api.types";

export const getCombinedData = (categories: Category[], products: ProductRes[]) => {
    return categories.map((category: Category) => ({
        ...category,
        products: products.filter((product: ProductRes) => product.category === category.id),
    }));
}
// Функция поиска
export function searchProducts(query: string, data: ReturnType<typeof getCombinedData>) {
    const lowerQuery = query.toLowerCase()
    const filtered = data.filter(item => {
        const products = item.products.filter(prod => prod.title.toLowerCase().includes(lowerQuery));
        item.products = products
        if (products.length) {
            return item;
        }

    });
    return filtered
}
