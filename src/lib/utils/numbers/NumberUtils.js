export default function isDecimal(number) {
    return !Number.isNaN(number) && number % 1 !== 0;
}
