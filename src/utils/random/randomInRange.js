export default function randomInRange(lower, upper) {
    if (!upper && upper !== 0) {
        return Math.round(Math.random() * lower);
    }
    const width = upper - lower;

    return Math.round(Math.random() * width) + lower;
}
