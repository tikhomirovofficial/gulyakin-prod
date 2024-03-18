export function arraysEqual(arr1: number[], arr2: number[]) {
    // Проверяем, имеют ли массивы одинаковую длину
    if (arr1.length !== arr2.length) {
        return false;
    }

    // Сортируем элементы массивов и сравниваем их
    const sortedArr1 = arr1.sort();
    const sortedArr2 = arr2.sort();

    for (let i = 0; i < arr1.length; i++) {
        if (sortedArr1[i] !== sortedArr2[i]) {
            return false;
        }
    }

    return true;
}

