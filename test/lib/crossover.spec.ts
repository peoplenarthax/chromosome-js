import { mockRandom, resetMockRandom } from 'jest-mock-random';
import { forAll } from '../test/forAll';
import { onePointCrossOver, pmxCrossover, twoPointCrossOver } from '../../src/lib/crossover';

describe('onePointCrossOver', () => {
    const ONEPOINT_SAMPLES = [
        { genome1: [3, 2, 1], genome2: [4, 5, 6], expected: [[3, 5, 6], [4, 2, 1]] },
        {
            genome1: { a: 3, b: 2, c: 1 },
            genome2: { a: 4, b: 5, c: 6 },
            expected: [{ a: 3, b: 5, c: 6 }, { a: 4, b: 2, c: 1 }],
        },
    ];

    forAll(ONEPOINT_SAMPLES, ({ genome1, genome2, expected }) => {
        it(`performs a cross over on one point in the gene list with ${genome1} and ${genome2}`, () => {

            mockRandom(2 / 3);
            const children = onePointCrossOver(genome1, genome2);

            expect(children).toEqual(expected);
            resetMockRandom();
        });
    });
});

describe('twoPointCrossOver', () => {
    const TWOPOINT_SAMPLES = [
        // Select the index 2 and then the last between [4, 3, 2]
        { ramdomValues: [2 / 6, 2.9 / 3], expected: [[6, 5, 10, 9, 8, 1], [12, 11, 4, 3, 2, 7]] },
        { ramdomValues: [2 / 6, 0], expected: [[6, 5, 10, 3, 2, 1], [12, 11, 4, 9, 8, 7]] },
        { ramdomValues: [2 / 6, 0], expected: [[6, 5, 10, 3, 2, 1], [12, 11, 4, 9, 8, 7]] },
    ];
    forAll(TWOPOINT_SAMPLES, ({ ramdomValues, expected }) => {
        it('performs a cross over on two points in the gene list for ramdomValues ', () => {
            mockRandom(ramdomValues);

            const children = twoPointCrossOver(
                [6, 5, 4, 3, 2, 1], [12, 11, 10, 9, 8, 7]
            );
            
            expect(children).toEqual(expected);
            resetMockRandom();  
        });
    });

    it('performs a cross over over two points among the attributes of an object', () => {
        mockRandom([2 / 6, 2.9 / 3]);

        const children = twoPointCrossOver({
            a: 6, b: 5, c: 4, d: 3, e: 2, f: 1,
        }, {
            a: 12, b: 11, c: 10, d: 9, e: 8, f: 7,
        });

        expect(children).toEqual([{
            a: 6, b: 5, c: 10, d: 9, e: 8, f: 1,
        }, {
            a: 12, b: 11, c: 4, d: 3, e: 2, f: 7,
        }]);
    });
    it('returns the same result when individuals are of length 3', () => {
        const children = twoPointCrossOver([1, 2, 3], [4, 5, 6]);

        expect(children).toEqual([
            [1, 5, 3],
            [4, 2, 6],
        ]);
    });

    describe('pmxCrossover', () => {
        const TWOPOINT_SAMPLES = [
            {ramdomValues: [3 / 8, 2 / 4], expected: [[3, 4, 2, 1, 6, 8, 7, 5], [4, 8, 5, 2, 7, 1, 3, 6]]},
            {ramdomValues: [3 / 8, 1 / 4], expected: [[ 3, 4, 8, 1, 6, 2, 7, 5], [4, 1, 5, 2, 7, 8, 3, 6]]},
        ];
        forAll(TWOPOINT_SAMPLES, ({ramdomValues, expected}) => {
            it('performs a cross over on two points in the gene list for ramdomValues ', () => {
                mockRandom(ramdomValues);

                const children = pmxCrossover(
                    [3, 4, 8, 2, 7, 1, 6, 5], [4, 2, 5, 1, 6, 8, 3, 7]
                );

                expect(children).toEqual(expected);
                resetMockRandom();
            });
        });

        it('throws an error if we try to use genome objects', () => {
            const executeError = () => pmxCrossover({a: 1, b: 2}
                , {a: 1, b: 2});

            expect(executeError).toThrow(TypeError);
        })

        it('returns the same Set of characters as the parents, always', () => {
            const parent1 = new Set([3, 4, 8, 2, 7, 1, 6, 5])
            const parent2 = new Set([4, 2, 5, 1, 6, 8, 3, 7])

            const children = pmxCrossover(Array.from(parent1), Array.from(parent2));

            const ChildrenSet1 = new Set(children[0] as Array<any>)
            const ChildrenSet2 = new Set(children[1] as Array<any>)

            expect(ChildrenSet1.size).toBe(parent1.size);
            expect(ChildrenSet2.size).toBe(parent2.size);
        })
    })
});
