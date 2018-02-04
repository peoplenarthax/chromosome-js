import { mockRandomForEach } from 'jest-mock-random';
import { forAll } from 'testier';
import { flipMutation, intInRangeMutation } from '../mutation';
import IndividualBuilder from '../../population/__tests__/builders/IndividualBuilder';

describe('Mutation', () => {
    describe('flipMutation', () => {
        mockRandomForEach([0.01, 0.5, 0.5]);
        it('flips randomly the feature bits if random under the passed threshold', () => {
            const individual = IndividualBuilder.binaryIndividual([0b0, 0b1, 0b1]);

            const actual = flipMutation(0.05, individual);

            expect(actual).toEqual([0b1, 0b1, 0b1]);
        });
    });

    describe('intInRangeMutation', () => {
        mockRandomForEach([0.01, 0.6, 0.5, 0.5]);
        forAll([
            { range: [0, 10], expected: [6, 5, 10] },
            { range: [3, 10], expected: [7, 5, 10] },
            { range: [-5, 10], expected: [4, 5, 10] },
        ], ({ range, expected }) => {
            it(`mutates to an int between ${range}`, () => {
                const individual = new IndividualBuilder()
                    .withFeatures([2, 5, 10])
                    .build();

                const actual = intInRangeMutation(0.05, range, individual);

                expect(actual).toEqual(expected);
            });
        });
    });
});
