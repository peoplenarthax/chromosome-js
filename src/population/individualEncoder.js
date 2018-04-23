import isDecimal from '../utils/numbers/NumberUtils';


// UNUSED
const toInteger = decimal => parseInt(
    decimal.toString().split('.').join(''),
    10,
);
const toArrayWithPadLeft = (numberInBinary, bits) =>
    new Array(bits - numberInBinary.length)
        .fill(0)
        .concat(numberInBinary.split('').map(num => parseInt(num, 2)));
const difference = (lower, upper) => Math.abs((!upper && upper !== 0) ? lower : upper - lower);
const toBinary = num => parseInt(num, 10).toString(2);
const toNumericFeature = (values, name, currentIndex) => {
    const valueRange = values.some(isDecimal)
        ? values.map(toInteger)
        : values;

    return {
        name,
        values: valueRange,
        bits: toBinary(difference(...valueRange)).length,
        position: currentIndex,
        type: 'number',
    };
};
const toAlphaNumericFeature = (values, name, stringLength, currentIndex) => ({
    name,
    values,
    bits: toBinary(values.length ** stringLength).length,
    position: currentIndex,
    type: 'text',
});

const toEncodingInfo = populationSolutionSpace =>
    populationSolutionSpace.reduce((
        { features, totalBits },
        {
            name, values, type = 'number', length,
        },
        currentIndex,
    ) => {
        let newFeature;
        switch (type) {
            case 'number':
                newFeature = toNumericFeature(values, name, currentIndex);
                break;
            case 'text':
                newFeature = toAlphaNumericFeature(values, name, length, currentIndex);
                break;
            default:
                break;
        }


        return {
            features: {
                ...features,
                [name]: newFeature,
            },
            totalBits: totalBits + newFeature.bits,
        };
    }, { features: {}, totalBits: 0 });

const encodeNumber = (value, bits) => toArrayWithPadLeft(
    toBinary(isDecimal(value)
        ? toInteger(value)
        : value),
    bits,
);
const toBase = (valueMap, value) => parseInt(
    Array
        .from(value)
        .map(char => valueMap.indexOf(char))
        .join(''),
    valueMap.length,
).toString(10);

const encodeText = (value, valueMap, bits) => toArrayWithPadLeft(
    toBinary(toBase(valueMap, value)),
    bits,
);

export default function individualEncoder(populationSolutionSpace) {
    const { features, totalBits } = toEncodingInfo(populationSolutionSpace);

    const zeroIndividual = Object.keys(features)
        .map(featureName => new Array(features[featureName].bits).fill(0));
    return {
        features,
        totalBits,
        encode: function encodes(individual) {
            let encodedIndividual = [...zeroIndividual];
            Object.keys(individual)
                .forEach((key) => {
                    const {
                        position, type, bits, values,
                    } = features[key];
                    let newGene;
                    switch (type) {
                        case 'number':
                            newGene = encodeNumber(individual[key], bits);
                            break;
                        case 'text':
                            newGene = encodeText(individual[key], values, bits);
                            break;
                        default:
                            break;
                    }

                    encodedIndividual = encodedIndividual
                        .map((gene, index) => (index === position ? newGene : gene));
                });

            return encodedIndividual.reduce((acc, current) => acc.concat(current));
        },
    };
}
