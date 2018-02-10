import { mockRandom, resetMockRandom } from 'jest-mock-random';
import { forAll } from 'testier';
import IndividualBuilder from '../../__tests__/builders/IndividualBuilder';
import { onePointCrossOver, twoPointCrossOver } from '../crossover';

const noop = () => {};
describe('onePointCrossOver', () => {
    it('performs a cross over on one point in the gene list ', () => {
        const ind1 = new IndividualBuilder().withFeatures([3, 2, 1]).build();
        const ind2 = new IndividualBuilder().withFeatures([4, 5, 6]).build();
        mockRandom(2 / 3);

        const children = onePointCrossOver(noop, ind1, ind2);

        expect(children).toEqual([
            expect.objectContaining({
                features: [3, 5, 6],
            }),
            expect.objectContaining({
                features: [4, 2, 1],
            }),
        ]);
        resetMockRandom();
    });
});

describe('twoPointCrossOver', () => {
    it('performs a cross over on two points in the gene list ', () => {
        const ind1 = new IndividualBuilder().withFeatures([6, 5, 4, 3, 2, 1]).build();
        const ind2 = new IndividualBuilder().withFeatures([12, 11, 10, 9, 8, 7]).build();
        mockRandom([2 / 6, 5.9 / 6]);

        const children = twoPointCrossOver(noop, ind1, ind2);

        expect(children).toEqual([
            expect.objectContaining({
                features: [6, 5, 10, 9, 8, 1],
            }),
            expect.objectContaining({
                features: [12, 11, 4, 3, 2, 7],
            }),
        ]);
        resetMockRandom();
    });
    it('performs a cross over on two points in the gene list ', () => {
        const ind1 = new IndividualBuilder().withFeatures([6, 5, 4, 3, 2, 1]).build();
        const ind2 = new IndividualBuilder().withFeatures([12, 11, 10, 9, 8, 7]).build();
        mockRandom([2 / 6, 2 / 6]);

        const children = twoPointCrossOver(noop, ind1, ind2);

        expect(children).toEqual([
            expect.objectContaining({
                features: [6, 5, 10, 3, 2, 1],
            }),
            expect.objectContaining({
                features: [12, 11, 4, 9, 8, 7],
            }),
        ]);
        resetMockRandom();
    });
    forAll([
        [0 / 3, 0 / 3],
        [1 / 3, 1 / 3],
        [2 / 3, 2 / 3],
        [2.9 / 3, 2.9 / 3],
    ], ([randomFixPoint1, randomFixPoint2]) => {
        it(`performs a cross over on two points on 3 gene list with ${[randomFixPoint1, randomFixPoint2]}`, () => {
            const ind1 = new IndividualBuilder().withFeatures([1, 2, 3]).build();
            const ind2 = new IndividualBuilder().withFeatures([4, 5, 6]).build();
            mockRandom([randomFixPoint1, randomFixPoint2]);

            const children = twoPointCrossOver(noop, ind1, ind2);

            expect(children).toEqual([
                expect.objectContaining({
                    features: [1, 5, 3],
                }),
                expect.objectContaining({
                    features: [4, 2, 6],
                }),
            ]);
            resetMockRandom();
        });
    });
});
