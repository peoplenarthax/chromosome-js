export const isDecimal(number: number): boolean => {
    return !isNaN(number) && number % 1 !== 0;
}
