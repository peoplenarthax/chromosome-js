import randomInRange from '../utils/random/randomInRange';

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
