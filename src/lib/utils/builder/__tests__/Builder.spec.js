import Builder from '../Builder';

describe('Builder', () => {
    describe('Normal behaviour', () => {
        it('builds an object with the default values', () => {
            const NameAndAgeBuilder = new Builder({ name: 'Default name', age: 23 });

            const actual = NameAndAgeBuilder
                .build();

            expect(actual).toEqual({
                name: 'Default name',
                age: 23,
            });
        });

        it('builds an objects with the withMethod', () => {
            const NameAndAgeBuilder = new Builder({ name: 'Silly name', age: 23 });

            const actual = NameAndAgeBuilder
                .withName('The expected name')
                .withAge(1337)
                .build();

            expect(actual).toEqual({
                name: 'The expected name',
                age: 1337,
            });
        });

        it('builds an objects with the withMethod and default values', () => {
            const NameAndAgeBuilder = new Builder({ name: 'Silly name', age: 23 });

            const actual = NameAndAgeBuilder
                .withName('The expected name')
                .build();

            expect(actual).toEqual({
                name: 'The expected name',
                age: 23,
            });
        });
    });

    describe('Required fields builder', () => {
        it('builds a normal object if all the required fields are fulfil', () => {
            const NameAndAgeBuilder = new Builder({ '*name': 'Silly name', age: 23 });

            const actual = NameAndAgeBuilder
                .withName('The expected name')
                .build();

            expect(actual).toEqual({
                name: 'The expected name',
                age: 23,
            });
        });

        it('throws an error if a required field is missing', () => {
            const NameAndAgeBuilder = new Builder({ '*name': 'Silly name', age: 23 });

            const actual = () => NameAndAgeBuilder.build();

            expect(actual).toThrow(TypeError);
        });
    });
});
