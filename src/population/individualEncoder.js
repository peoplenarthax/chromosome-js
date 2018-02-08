const difference = (lower, upper) => Math.abs((!upper && upper !== 0) ? lower : upper - lower);
const toBinary = num => parseInt(num, 10).toString(2);
const toEncodingInfo = populationSolutionSpace =>
    populationSolutionSpace.reduce(({ features, totalBits }, { name, values }) => {
        const newFeature = {
            name,
            values,
            bits: toBinary(difference(...values)).length,
            position: totalBits,
        };

        return {
            features: {
                ...features,
                [name]: newFeature,
            },
            totalBits: totalBits + newFeature.bits,
        };
    }, { features: {}, totalBits: 0 });

const toArrayWithPadLeft = (numberInBinary, bits) =>
    new Array(bits - numberInBinary.length)
        .fill(0)
        .concat(numberInBinary.split('').map(num => parseInt(num, 2)));


export default function individualEncoder(populationSolutionSpace) {
    const encodingInfo = toEncodingInfo(populationSolutionSpace);


    return {
        ...encodingInfo,
        encode: function encodes(individual) {
            const encodedIndividual = new Array(encodingInfo.totalBits).fill(0);

            Object.keys(individual)
                .forEach((key) => {
                    const { bits, position } = encodingInfo.features[key];
                    const gene = toArrayWithPadLeft(
                        toBinary(individual[key]),
                        encodingInfo.features[key].bits,
                    );
                    // TODO immutable way for splice
                    encodedIndividual.splice(position, bits, ...gene);
                });

            return encodedIndividual;
        },
    };
}
