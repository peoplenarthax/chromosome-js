/**
 * Generate a random number within 2 limits, if second arguments is not pass it is between 0 and this number
 */
export const randomInRange = (lower: number, upper?: number): number => {
    if (!upper && upper !== 0) {
        return Math.round(Math.random() * lower);
    }
    const width = upper - lower;

    return Math.round(Math.random() * width) + lower;
}
