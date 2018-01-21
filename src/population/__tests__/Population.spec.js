import generatePopulation from '../Population';
import IndividualBuilder from './builders/IndividualBuilder';
import { INCREASING } from '../../constants/rank';

describe('Population', () => {
    describe('constructor', () => {
        it('saves the individuals', () => {
            const actual = generatePopulation([
                new IndividualBuilder().build(),
                new IndividualBuilder().build(),
            ]);

            expect(actual.population).toEqual([
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

            expect(actual).toEqual({
                population: [
                    new IndividualBuilder().withFitness(4000).build(),
                    new IndividualBuilder().withFitness(1000).build(),
                    new IndividualBuilder().withFitness(100).build(),
                    new IndividualBuilder().withFitness(50).build(),
                ],
                rank: 'decreasing',
            });
        });
        it('ranks the individual by fitness in decreasing order if option is provided', () => {
            const actual = generatePopulation([
                new IndividualBuilder().withFitness(1000).build(),
                new IndividualBuilder().withFitness(4000).build(),
                new IndividualBuilder().withFitness(50).build(),
                new IndividualBuilder().withFitness(100).build(),
            ], { rank: INCREASING });

            expect(actual).toEqual({
                population: [
                    new IndividualBuilder().withFitness(50).build(),
                    new IndividualBuilder().withFitness(100).build(),
                    new IndividualBuilder().withFitness(1000).build(),
                    new IndividualBuilder().withFitness(4000).build(),
                ],
                rank: 'increasing',
            });
        });
    });
});
