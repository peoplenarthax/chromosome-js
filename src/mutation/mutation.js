function randomBetween(lower, upper) {
    const width = upper - lower;

    return Math.round(Math.random() * width) + lower;
}

export function flipMutation(mutationProbability, { features }) {
    return features
        .map(gene => ((Math.random() < mutationProbability) ? gene ^ 1 : gene));
}

export function intInRangeMutation(mutationProbability, range, { features }) {
    return features
        .map(feature => ((Math.random() < mutationProbability)
            ? randomBetween(...range)
            : feature));
}
