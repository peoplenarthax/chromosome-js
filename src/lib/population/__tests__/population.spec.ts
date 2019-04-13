import { generateIndividual as generateIndividualMock } from '../individual';
import generatePopulation from '../population';

jest.mock('../individual');

const giveFitnessPlusOne = () => {
    let fitness = 0;

    return () => {
        fitness += 1;

        return ({ fitness });
    };
};
beforeAll(() => {
    (generateIndividualMock as jest.Mock).mockClear();
});
describe('Population', () => {
    describe('constructor', () => {
        it('saves the individuals', () => {
            const noop = () => {};
            const actual = generatePopulation(noop, () => 1, 3);

            expect(actual.length).toBe(3);
        });

        it('generate individuals with their correspondant fitness as many times as specified', () => {
            const noop = () => {};
            generatePopulation(noop, () => 1, 3);

            expect(generateIndividualMock).toHaveBeenCalledTimes(3);
        });

        it('returns the individuals ranked by fitness', () => {
            // Mock full answer of times(...) so I test in an isolated way the sorting
            (generateIndividualMock as jest.Mock).mockImplementation(giveFitnessPlusOne());
            const noop = () => {};
            const actual = generatePopulation(noop, () => 1, 3);

            expect(actual).toEqual([{ fitness: 3 }, { fitness: 2 }, { fitness: 1 }]);
        });
    });
});
