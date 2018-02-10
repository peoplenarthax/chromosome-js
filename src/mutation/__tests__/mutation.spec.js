import { mockRandomForEach } from 'jest-mock-random';
import { forAll } from 'testier';
import { flipMutation, intInRangeMutation, inRangeMutation } from '../mutation';
import IndividualBuilder from '../../__tests__/builders/IndividualBuilder';
import individualEncoder from '../../population/individualEncoder';

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

    describe.skip('inRangeMutation', () => {
        mockRandomForEach([0.01, 0.6, 0.5, 0.5]);
        const { features } = individualEncoder([
            { name: 'speed', values: [2, 10] },
            { name: 'grams', values: [0.00, 0.99] },
            {
                name: 'name',
                type: 'text',
                values: 'abcd',
                length: '3',
            },
        ]);
        forAll([
            { solutionSpace: features, expected: [3, 6.7, 'abb'] },
            { solutionSpace: features, expected: [3, 6.7, 10] },
            { solutionSpace: features, expected: [3, 6.7, 10] },
        ], ({ expected, solutionSpace }) => {
            it(`mutates to an int between ${solutionSpace}`, () => {
                const individual = new IndividualBuilder()
                    .withFeatures([2, 5.2, 'dda'])
                    .build();

                const actual = inRangeMutation(0.05, solutionSpace, individual);

                expect(actual).toEqual(expected);
            });
        });
    });
});
