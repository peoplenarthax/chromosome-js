import { mockRandom, resetMockRandom } from 'jest-mock-random';
import IndividualBuilder from '../../population/__tests__/builders/IndividualBuilder';
import onePointCrossOver from '../crossover';

describe('onePointCrossOver', () => {
    it('performs a cross over over one point in the gene list ', () => {
        const ind1 = new IndividualBuilder().withFeatures([3, 2, 1]).build();
        const ind2 = new IndividualBuilder().withFeatures([4, 5, 6]).build();
        mockRandom(2 / 3);

        const children = onePointCrossOver(ind1, ind2);

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
