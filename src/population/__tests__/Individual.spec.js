import generateIndividual from '../Individual';

describe('Individual', () => {
    describe('constructor', () => {
        it('calls the fitness function with the passed features', () => {
            const features = [1, 2];
            const fitnessFunction = jest.fn();

            generateIndividual(features, fitnessFunction);

            expect(fitnessFunction).toHaveBeenCalledWith(features);
        });
        it('returns the fitness calculated by the fitness function and the features', () => {
            const square = [1, 2];
            const sum = ([sideA, sideB]) => sideA + sideB;

            const sut = generateIndividual(square, sum);
            const actual = sut.fitness;

            expect(actual).toBe(3);
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
