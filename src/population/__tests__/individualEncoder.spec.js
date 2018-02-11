import individualEncoder from '../individualEncoder';

describe('individualEncoder', () => {
    it('returns an object containing the features as an object', () => {
        const sut = individualEncoder([{ name: 'age', values: [0, 99] }]);

        const actual = sut.features;

        expect(actual).toEqual(expect.objectContaining({
            age: {
                name: 'age',
                values: [0, 99],
                bits: 7,
                type: 'number',
                position: 0,
            },
        }));
    });

    it('returns an object containing the features as an object', () => {
        const sut = individualEncoder([
            { name: 'age', values: [0, 99] },
            { name: 'height', values: [0, 178] },
        ]);

        const actual = sut.features;

        expect(actual).toEqual(expect.objectContaining({
            age: {
                name: 'age',
                values: [0, 99],
                bits: 7,
                type: 'number',
                position: 0,
            },
            height: {
                name: 'height',
                values: [0, 178],
                bits: 8,
                type: 'number',
                position: 1,
            },
        }));
    });
    it('returns the total amount of bits to encode an individual', () => {
        const sut = individualEncoder([
            { name: 'age', values: [0, 99] },
            { name: 'height', values: [0, 178] },
        ]);

        const actual = sut.totalBits;

        expect(actual).toBe(15);
    });
    describe('encode', () => {
        it('encodes a passed individual', () => {
            const sut = individualEncoder([{ name: 'age', values: [0, 99] }]);

            const actual = sut.encode({ age: 4 });

            expect(actual).toEqual([0, 0, 0, 0, 1, 0, 0]);
        });

        it('generates padding on the empty features', () => {
            const sut = individualEncoder([
                { name: 'age', values: [0, 99] },
                { name: 'height', values: [0, 179] },
            ]);

            const actual = sut.encode({ age: 4 });

            expect(actual).toEqual([0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        });

        it('encodes a passed individual with more than one feature', () => {
            const sut = individualEncoder([
                { name: 'age', values: [0, 99] },
                { name: 'height', values: [0, 179] },
            ]);

            const actual = sut.encode({ age: 4, height: 2 });

            expect(actual).toEqual([0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0]);
        });

        it('encodes a passed individual with decimal range', () => {
            const sut = individualEncoder([{ name: 'grams', values: [0.00, 0.99] }]);

            const actual = sut.encode({ grams: 0.04 });

            expect(actual).toEqual([0, 0, 0, 0, 1, 0, 0]);
        });

        it('encodes a passed individual with decimal range', () => {
            const sut = individualEncoder([{
                name: 'name',
                type: 'text',
                values: 'abcd',
                length: '3',
            }]);

            const actual = sut.encode({ name: 'dda' });

            expect(actual).toEqual([0, 1, 1, 1, 1, 0, 0]);
        });
    });
});