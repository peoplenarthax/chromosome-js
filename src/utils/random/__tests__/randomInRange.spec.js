import { forAll } from 'testier';
import { mockRandomForEach } from 'jest-mock-random';
import sut from '../randomInRange';

describe('randomInRange', () => {
    mockRandomForEach(0.6);
    forAll([
        { range: [0, 10], expected: 6 },
        { range: [3, 10], expected: 7 },
        { range: [-5, 10], expected: 4 },
    ], ({ range, expected }) => {
        it(`gives back a random number in ${range}`, () => {
            const actual = sut(...range);

            expect(actual).toBe(expected);
        });
    });
    it('gives backa a random number between 0 and the passed value if only one argument is provided', () => {
        const actual = sut(10);

        expect(actual).toBe(6);
    });
});
