import { mockRandomForEach } from 'jest-mock-random';
import { generatePopulationWithIndividuals } from '../builders/PopulationBuilder';
import {
    selectPopulation,
    selectRandom,
    selectBest,
    selectWorst,
    selectByTournament,
    selectRoulette,
} from '../../src/lib/selection';

describe('Selection', () => {
    describe('selectRandom', () => {
        mockRandomForEach([0.2, 0.5, 0.4]);
        it('gives back an array with the amount of individuals that you want', () => {
            // Generates 10 individuals with ranks from 1 to 10 sort in decreasing order
            const { population } = generatePopulationWithIndividuals(10);

            const actual = selectRandom(3, population);
            // In this case we have mock random to be deterministic so we can assert
            // Random gives back 0.2, 0.5 and 0.4, in that order
            expect(actual).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    fitness: 8,
                }),
                expect.objectContaining({
                    fitness: 5,
                }),
                expect.objectContaining({
                    fitness: 6,
                }),
            ]));
        });
        it('throws an error when the requested amount is bigger than the population', () => {
            const { population } = generatePopulationWithIndividuals(3);

            const actual = () => selectRandom(4, population);

            expect(actual).toThrow(RangeError);
        });
    });
    describe('selectBest', () => {
        it('gives back the best elements from a decreasing ordered population', () => {
            const { population } = generatePopulationWithIndividuals(10);

            const actual = selectBest(3, population);

            expect(actual).toEqual([
                expect.objectContaining({
                    fitness: 10,
                }),
                expect.objectContaining({
                    fitness: 9,
                }),
                expect.objectContaining({
                    fitness: 8,
                }),
            ]);
        });

        it('throws an error when the requested amount is bigger than the population', () => {
            const { population } = generatePopulationWithIndividuals(3);

            const actual = () => selectBest(4, population);

            expect(actual).toThrow(RangeError);
        });
    });

    describe('selectWorst', () => {
        it('gives back the worst elements from a decreasing ordered population', () => {
            const { population } = generatePopulationWithIndividuals(10);

            const actual = selectWorst(3, population);

            expect(actual).toEqual([
                expect.objectContaining({
                    fitness: 1,
                }),
                expect.objectContaining({
                    fitness: 2,
                }),
                expect.objectContaining({
                    fitness: 3,
                }),
            ]);
        });
        it('throws an error when the requested amount is bigger than the population', () => {
            const { population } = generatePopulationWithIndividuals(3);

            const actual = () => selectBest(4, population);

            expect(actual).toThrow(RangeError);
        });
    });

    describe('selectByTournament', () => {
        mockRandomForEach([0.01, 0.1, 0.2]);
        it('gives the best individual from the random tournament', () => {
            const { population } = generatePopulationWithIndividuals(10);

            const actual = selectByTournament(3, population, { tournamentSize: 3 });

            expect(actual).toEqual([
                expect.objectContaining({
                    fitness: 10,
                }),
                expect.objectContaining({
                    fitness: 10,
                }),
                expect.objectContaining({
                    fitness: 10,
                }),
            ]);
        });
        it('gives the best individual from the random tournament selecting only once each individual if option passed', () => {
            const { population } = generatePopulationWithIndividuals(10);

            const actual = selectByTournament(3, population, { tournamentSize: 3, removeWinners: true });

            expect(actual).toEqual([
                expect.objectContaining({
                    fitness: 10,
                }),
                expect.objectContaining({
                    fitness: 9,
                }),
                expect.objectContaining({
                    fitness: 8,
                }),
            ]);
        });
        it('throws an error when the requested amount is bigger than the population', () => {
            const { population } = generatePopulationWithIndividuals(3);

            const actual = () => selectByTournament(4, population, { tournamentSize: 3 });

            expect(actual).toThrow(RangeError);
        });
    });
    describe('selectRoulette', () => {
        mockRandomForEach([0.01, 0.1, 0.3, 0.9, 0.8, 0.1, 0.5, 0.5]);
        it('returns individual using a stochastic acceptance', () => {
            const { population } = generatePopulationWithIndividuals(10);

            const actual = selectRoulette(3, population);

            expect(actual).toEqual([
                expect.objectContaining({
                    fitness: 10,
                }),
                expect.objectContaining({
                    fitness: 3,
                }),
                expect.objectContaining({
                    fitness: 5,
                }),
            ]);
        });
        it('throws an error when the requested amount is bigger than the population', () => {
            const { population } = generatePopulationWithIndividuals(3);

            const actual = () => selectRoulette(4, population);

            expect(actual).toThrow(RangeError);
        });
    });
    describe('selectPopulation', () => {
        it('calls the selection function with the size, population and options passed', () => {
            const selectionFn = jest.fn();
            selectPopulation(selectionFn, 5, [1, 2, 3] as any, { option: 'a' });

            expect(selectionFn).toHaveBeenCalledWith(5, [1, 2, 3], { option: 'a' });
        });
    });
});
