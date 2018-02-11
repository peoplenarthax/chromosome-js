import individualInfo from '../individualInfo';

describe('individualInfo', () => {
    it('returns an array containing the features as an object', () => {
        const sut = individualInfo([{ name: 'age', values: [0, 99] }]);

        const actual = sut.features;

        expect(actual).toEqual([
            {
                name: 'age',
                values: [0, 99],
            },
        ]);
    });

    it('transform an array to the correspondent object', () => {
        const sut = individualInfo([
            { name: 'age', values: [0, 99] },
            { name: 'weight', values: [15, 199] },
        ]);

        const actual = sut.toIndividualObject([12, 105]);

        expect(actual).toEqual({
            age: 12,
            weight: 105,
        });
    });
});
