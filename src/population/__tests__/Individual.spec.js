import { forAll } from 'testier';
import generateIndividual from '../Individual';

const CHROMOSOME_GENOTYPES = [
    {
        genotype: () => ([1, 2]),
        fitness: ([a, b]) => a + b,
        expected: {
            chromosome: [1, 2],
            fitness: 3,
        },
    },
    {
        genotype: {
            a: () => 1,
            b: () => 2,
        },
        fitness: ({ a, b }) => a + b,
        expected: {
            chromosome: {
                a: 1,
                b: 2,
            },
            fitness: 3,
        },
    },
    {
        genotype: [
            () => 1,
            () => 2,
        ],
        fitness: ([a, b]) => a + b,
        expected: {
            chromosome: [1, 2],
            fitness: 3,
        },
    },
];

describe('Individual', () => {
    describe('generateIndividual', () => {
        it('calls the fitness function with the passed features', () => {
            const chromosomeGenotype = () => ([1, 2]);
            const fitnessFunction = jest.fn();

            generateIndividual(chromosomeGenotype, fitnessFunction);

            expect(fitnessFunction).toHaveBeenCalledWith([1, 2]);
        });

        forAll(CHROMOSOME_GENOTYPES, ({ genotype, fitness, expected }) => {
            it(`returns the individual with the generated chromosome and fitness if the chromosome genotype is ${genotype}`, () => {
                const actual = generateIndividual(genotype, fitness);

                expect(actual).toEqual(expected);
            });
        });
        it('throws an error in case features are not provided', () => {
            const actual = () => generateIndividual(null, () => {});

            expect(actual).toThrow(TypeError);
        });

        it('throws an error in case features are not provided', () => {
            const actual = () => generateIndividual({}, null);

            expect(actual).toThrow(TypeError);
        });
    });
});
