import {
    ifElse, concat, compose, splitAt, head, last, map, keys, values, tail, zipObj,
} from 'ramda';
import { randomInRange } from '../../utils/random';
import { Genome } from "../population";

const hasLength = (genomes: Genome[]) => !!genomes[0].length || genomes[0].length === 0;

type CrossoverFunction = (genome1: Genome, genome2: Genome) => [Genome, Genome]

const swapAt = (index: number) => (arrays: any[]) => {
    const arraySplitted = arrays.map(splitAt(index));

    const child1 = [...arraySplitted[0], ...arraySplitted[1]]
    const child2 = [...arraySplitted[1], ...arraySplitted[0]]

    return [child1, child2];
};

const zipKeys = (attributes: string[]) => (value: any) => zipObj(attributes, value);
const swapAndZip = (genomeKeys: string[], index: number) => compose(
    map(zipKeys(genomeKeys)),
    swapAt(index),
    map(values),
);
/*
* This swap and zip is needed since when individuals are objects
* we first treat it as an array and then we need to make an object
* out of it with the same fields
*/
const switchObject = (collection: { [k: string]: any }[]) => {
    const genomeKeys = keys(head(collection)) as string[];
    const fixCrossPoint = randomInRange(genomeKeys.length - 1);

    return swapAndZip(genomeKeys, fixCrossPoint)(collection);
};

// Swaps 2 arrays given a fixed point
export const onePointCrossOver: CrossoverFunction = (genome1, genome2) => {

    return ifElse(
        hasLength,
        // @ts-ignore
        swapAt(randomInRange(genome1.length - 1)),
        switchObject,
    )([genome1, genome2]);
};

const swapFor = (...indexes: number[]) => (list: any[]): any => {
    if (indexes.length === 0) { return list; }

    // TODO: Give proper types to this
    // @ts-ignore
    return swapFor(...tail(indexes))(swapAt(head(indexes))(list));
};

const swapForAndZip = (genomeKeys: string[], indexes: [number, number]) => compose(
    map(zipKeys(genomeKeys)),
    swapFor(...indexes),
    map(values),
);

const getRandomFixPoints = (length: number): [number, number] => {
    const fixCrossPoint1 = length === 3 ? 1 : randomInRange(length - 1);
    const fixCrossPoint2 = length === 3 ? 2 : randomInRange(fixCrossPoint1 + 1, length - 1);

    return [
        fixCrossPoint1,
        fixCrossPoint2,
    ];
};
const switchObjectTwice = (collection: [{ [k: string]: any }, { [k: string]: any }]) => {
    const genomeKeys = keys(head(collection)) as string[];
    const fixCrossPoints = getRandomFixPoints(genomeKeys.length);

    return swapForAndZip(genomeKeys, fixCrossPoints)(collection);
};

export const twoPointCrossOver: CrossoverFunction = (genome1, genome2) => {
    const fixCrossPoints = getRandomFixPoints(genome1.length);

    return ifElse(
        hasLength,
        swapFor(...fixCrossPoints),
        switchObjectTwice,
    )([genome1, genome2]);
};
