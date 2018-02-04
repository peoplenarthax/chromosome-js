// TODO: It returns a new individua

export default function flipMutation(mutationProbability, individual) {
    const newIndividual = individual;
    newIndividual.features = individual.features
        .map(gene => ((Math.random() < mutationProbability) ? gene ^ 1 : gene));

    return individual;
}
