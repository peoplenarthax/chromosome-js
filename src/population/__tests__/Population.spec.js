import generatePopulation from '../Population';
import { generateIndividual as generateIndividualMock } from '../Individual';

jest.mock('../Individual');

const giveFitnessPlusOne = () => {
    let fitness = 0;

    return () => {
        fitness += 1;

        return ({ fitness });
    };
};
beforeAll(() => {
    generateIndividualMock.mockClear();
});
describe('Population', () => {
    describe('constructor', () => {
        it('saves the individuals', () => {
            const noop = () => {};
            const actual = generatePopulation(noop, noop, 3);

            expect(actual.length).toBe(3);
        });

        it('generate individuals with their correspondant fitness as many times as specified', () => {
            const noop = () => {};
            generatePopulation(noop, noop, 3);

            expect(generateIndividualMock).toHaveBeenCalledTimes(3);
        });

        it('returns the individuals ranked by fitness', () => {
            generateIndividualMock.mockImplementation(giveFitnessPlusOne());
            const noop = () => {};
            const actual = generatePopulation(noop, noop, 3);

            expect(actual).toEqual([{ fitness: 3 }, { fitness: 2 }, { fitness: 1 }]);
        });
    });
});
