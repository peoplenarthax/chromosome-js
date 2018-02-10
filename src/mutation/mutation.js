import randomInRange from '../utils/random/randomInRange';

const mutateFeature = (dimensions, position, feature) => {
    let dimension;
    Object.keys(dimensions).forEach(((elem) => {
        if (dimensions[elem].position === position) {
            dimension = dimensions[elem];
        }
    }));
    switch (typeof feature) {
        case 'string':
            return randomInRange(2 ** dimension);
        case 'number':
            return randomInRange(...dimension.values);
        default:
            return feature;
    }
};

export function flipMutation(mutationProbability, { features }) {
    return features
        .map(gene => ((Math.random() < mutationProbability) ? gene ^ 1 : gene));
}

export function intInRangeMutation(mutationProbability, range, { features }) {
    return features
        .map(feature => ((Math.random() < mutationProbability)
            ? randomInRange(...range)
            : feature));
}

export function inRangeMutation(mutationProbability, dimensions, { features }) {
    return features
        .map(((feature, position) => ((Math.random() < mutationProbability)
            ? mutateFeature(dimensions, position, feature)
            : feature)));
}
