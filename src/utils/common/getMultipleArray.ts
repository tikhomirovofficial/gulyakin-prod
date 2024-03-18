export const getMultipleArray = (array: any[], multipleValue: number) => {
    const length = array.length;

    if (length % multipleValue !== 0) {
        const multipleIsBigger = length < multipleValue;

        if (!multipleIsBigger) {
            let multipleLength = 0;

            for (let i = length; i < length + multipleValue * 2; i++) {
                if (i % multipleValue == 0) {
                    multipleLength = i;
                    break;
                }
            }
            const neededAddLength = multipleLength - length;

            for (let i = 0; i < neededAddLength; i++) {
                array.push(null);
            }
            return array;
        }
        const neededAddLength = multipleValue - length;

        for (let i = 0; i < neededAddLength; i++) {
            array.push(null);
        }
        return array;
    }
    return array;
};
