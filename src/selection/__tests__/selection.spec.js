import mockRandomWith from 'jest-mock-random';
import PopulationBuilder from '../../population/__tests__/builders/PopulationBuilder';
import IndividualBuilder from '../../population/__tests__/builders/IndividualBuilder';
import {
    selectRandom,
    selectBest,
    selectWorst,
    selectByTournament,
} from '../selection';

describe('Selection', () => {
    describe('selectRandom', () => {
        mockRandomWith([0.2, 0.5, 0.4]);
        it('gives back an array with the amount of individuals that you want', () => {
            // Generates 10 individuals with ranks from 1 to 10 sort in decreasing order
            const population = new PopulationBuilder()
                .withIndividuals(10)
                .build();

            const actual = selectRandom(3, population);
            // In this case we have mock random to be deterministic so we can assert
            // Random gives back 0.2, 0.5 and 0.4, in that order
            expect(actual).toEqual([
                new IndividualBuilder().withFitness(8).build(),
                new IndividualBuilder().withFitness(5).build(),
                new IndividualBuilder().withFitness(6).build(),
            ]);
        });
        it('throws an error when the requested amount is bigger than the population', () => {
            const population = new PopulationBuilder()
                .withIndividuals(3)
                .build();

            const actual = () => selectRandom(4, population);

            expect(actual).toThrow(RangeError);
        });
    });
    describe('selectBest', () => {
        it('gives back the best elements from a decreasing ordered population', () => {
            const population = new PopulationBuilder()
                .withIndividuals(10)
                .build();

            const actual = selectBest(3, population);

            expect(actual).toEqual([
                new IndividualBuilder().withFitness(10).build(),
                new IndividualBuilder().withFitness(9).build(),
                new IndividualBuilder().withFitness(8).build(),
            ]);
        });

        it('gives back the best elements from a increasing ordered population', () => {
            const population = new PopulationBuilder()
                .withIndividuals(10, 'increasing')
                .build();

            const actual = selectBest(3, population);

            expect(actual).toEqual([
                new IndividualBuilder().withFitness(10).build(),
                new IndividualBuilder().withFitness(9).build(),
                new IndividualBuilder().withFitness(8).build(),
            ]);
        });
        it('throws an error when the requested amount is bigger than the population', () => {
            const population = new PopulationBuilder()
                .withIndividuals(3)
                .build();

            const actual = () => selectBest(4, population);

            expect(actual).toThrow(RangeError);
        });
    });

    describe('selectWorst', () => {
        it('gives back the worst elements from a decreasing ordered population', () => {
            const population = new PopulationBuilder()
                .withIndividuals(10)
                .build();

            const actual = selectWorst(3, population);

            expect(actual).toEqual([
                new IndividualBuilder().withFitness(1).build(),
                new IndividualBuilder().withFitness(2).build(),
                new IndividualBuilder().withFitness(3).build(),
            ]);
        });

        it('gives back the worst elements from a increasing ordered population', () => {
            const population = new PopulationBuilder()
                .withIndividuals(10, 'increasing')
                .build();

            const actual = selectWorst(3, population);

            expect(actual).toEqual([
                new IndividualBuilder().withFitness(1).build(),
                new IndividualBuilder().withFitness(2).build(),
                new IndividualBuilder().withFitness(3).build(),
            ]);
        });
        it('throws an error when the requested amount is bigger than the population', () => {
            const population = new PopulationBuilder()
                .withIndividuals(3)
                .build();

            const actual = () => selectBest(4, population);

            expect(actual).toThrow(RangeError);
        });
    });

    describe('selectByTournament', () => {
        mockRandomWith([0.01, 0.1, 0.2]);
        it('gives the best individual from the random tournament', () => {
            const population = new PopulationBuilder()
                .withIndividuals(10)
                .build();

            const actual = selectByTournament(3, 3, population);

            expect(actual).toEqual([
                new IndividualBuilder().withFitness(10).build(),
                new IndividualBuilder().withFitness(10).build(),
                new IndividualBuilder().withFitness(10).build(),
            ]);
        });
        it('gives the best individual from the random tournament selecting only once each individual if option passed', () => {
            const population = new PopulationBuilder()
                .withIndividuals(10)
                .build();

            const actual = selectByTournament(3, 3, population, { removeWinners: true });

            expect(actual).toEqual([
                new IndividualBuilder().withFitness(10).build(),
                new IndividualBuilder().withFitness(9).build(),
                new IndividualBuilder().withFitness(8).build(),
            ]);
        });
        it('throws an error when the requested amount is bigger than the population', () => {
            const population = new PopulationBuilder()
                .withIndividuals(3)
                .build();

            const actual = () => selectByTournament(4, 3, population);

            expect(actual).toThrow(RangeError);
        });
        it('throws an error when the requested tournament size is bigger than the initial population', () => {
            const population = new PopulationBuilder()
                .withIndividuals(3)
                .build();

            const actual = () => selectByTournament(3, 4, population);

            expect(actual).toThrow(RangeError);
        });
    });
});
