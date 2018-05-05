import AlgorithmConstants from '../Algorithm';

describe('Algorithm', () => {
    describe('AlgorithmConstants', () => {
        it('builds a valid AlgorithmConstants with all customized values', () => {
            const actual = new AlgorithmConstants()
                .withMaxNumberOfGenerations(1337)
                .withPopulationSize(75)
                .withCrossoverProbability(0.3)
                .withMutationProbability(0.5)
                .build();

            expect(actual).toEqual({
                maxNumberOfGenerations: 1337,
                populationSize: 75,
                crossoverProbability: 0.3,
                mutationProbability: 0.5,
            });
        });

        it('builds a valid AlgorithmConstants with default values if any is missing', () => {
            const actual = new AlgorithmConstants()
                .build();

            expect(actual).toEqual({
                maxNumberOfGenerations: 999,
                populationSize: 100,
                crossoverProbability: 0.2,
                mutationProbability: 0.25,
            });
        });
    });
});
