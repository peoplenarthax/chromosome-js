const difference = (lower, upper) => Math.abs((!upper && upper !== 0) ? lower : upper - lower);
const toBinary = num => parseInt(num, 10).toString(2);
const toEncodingInfo = populationSolutionSpace =>
    populationSolutionSpace.reduce(({ features, totalBits }, { name, values }, currentIndex) => {
        const newFeature = {
            name,
            values,
            bits: toBinary(difference(...values)).length,
            position: currentIndex,
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
                    const { position } = features[key];
                    const newGene = toArrayWithPadLeft(
                        toBinary(individual[key]),
                        features[key].bits,
                    );
                    // TODO immutable way for splice
                    encodedIndividual = encodedIndividual
                        .map((gene, index) => (index === position ? newGene : gene));
                });

            return encodedIndividual.reduce((acc, current) => acc.concat(current));
        },
    };
}
