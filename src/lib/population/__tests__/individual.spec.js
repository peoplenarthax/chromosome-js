import { forAll } from '../../utils/test/forall';
import { generateIndividual, generateIndividualWith } from '../individual';

const CHROMOSOME_GENOTYPES = [
    {
        genotype: () => ([1, 2]),
        fitness: ([a, b]) => a + b,
        expected: {
            genome: [1, 2],
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
            genome: {
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
            genome: [1, 2],
            fitness: 3,
        },
    },
];

describe('Individual', () => {
    describe('generateIndividual', () => {
        it('calls the fitness function with the passed features', () => {
            const genomeGenotype = () => ([1, 2]);
            const fitnessFunction = jest.fn();

            generateIndividual(genomeGenotype, fitnessFunction);

            expect(fitnessFunction).toHaveBeenCalledWith([1, 2]);
        });

        forAll(CHROMOSOME_GENOTYPES, ({ genotype, fitness, expected }) => {
            it(`returns the individual with the generated genome and fitness if the genome genotype is ${genotype}`, () => {
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
    describe('generateIndividualWith', () => {
        it('returns a function that called with a genome generates an evaluated individual', () => {
            const sumIndividual = generateIndividualWith(individual => individual.reduce((acc, val) => acc + val, 0));

            const actual = sumIndividual([1, 2, 3, 4]);

            expect(actual).toEqual({
                genome: [1, 2, 3, 4],
                fitness: 10,
            });
        });
    });
});
