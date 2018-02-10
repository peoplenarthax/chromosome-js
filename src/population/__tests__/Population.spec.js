import generatePopulation from '../Population';
import IndividualBuilder from '../../__tests__/builders/IndividualBuilder';

describe('Population', () => {
    describe('constructor', () => {
        it('saves the individuals', () => {
            const actual = generatePopulation([
                new IndividualBuilder().build(),
                new IndividualBuilder().build(),
            ]);

            expect(actual).toEqual([
                new IndividualBuilder().build(),
                new IndividualBuilder().build(),
            ]);
        });

        it('ranks the individual by fitness', () => {
            const actual = generatePopulation([
                new IndividualBuilder().withFitness(1000).build(),
                new IndividualBuilder().withFitness(4000).build(),
                new IndividualBuilder().withFitness(50).build(),
                new IndividualBuilder().withFitness(100).build(),
            ]);

            expect(actual).toEqual([
                expect.objectContaining({
                    fitness: 4000,
                }),
                expect.objectContaining({
                    fitness: 1000,
                }),
                expect.objectContaining({
                    fitness: 100,
                }),
                expect.objectContaining({
                    fitness: 50,
                }),
            ]);
        });
    });
});
