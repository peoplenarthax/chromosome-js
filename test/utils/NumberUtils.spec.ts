import { forAll } from '../test/forAll';
import { isDecimal } from '../../src/utils/numbers';

describe('isDecimal', () => {
    forAll<{ value: number, expected: boolean }>([
        { value: 0, expected: false },
        { value: 0.01, expected: true },
        { value: 0.34, expected: true },
        { value: 123, expected: false },
        { value: 1.11, expected: true },
        { value: 123123123, expected: false },
    ], ({ value, expected }) =>
        it(`asserts if ${value} is decimal or not`, () => {
            const actual = isDecimal(value);

            expect(actual).toBe(expected);
        }));
});
