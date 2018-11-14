import { forAll } from 'testier';
import isDecimal from '../NumberUtils';

describe('isDecimal', () => {
    forAll([
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