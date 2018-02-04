import { mockRandomForEach } from 'jest-mock-random';
import flipMutation from '../mutation';
import IndividualBuilder from '../../population/__tests__/builders/IndividualBuilder';

describe('Mutation', () => {
    describe('flipMutation', () => {
        mockRandomForEach([0.01, 0.5, 0.5]);
        it('flips randomly bits if under passed threshold ', () => {
            const individual = IndividualBuilder.binaryIndividual([0b0, 0b1, 0b1]);

            const actual = flipMutation(0.05, individual);

            expect(actual.features).toEqual([0b1, 0b1, 0b1]);
        });
    });
});
