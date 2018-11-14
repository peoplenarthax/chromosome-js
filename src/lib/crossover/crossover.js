import {
    ifElse, concat, compose, splitAt, head, last, map, keys, values, tail, zipObj,
} from 'ramda';
import randomInRange from '../utils/random/randomInRange';

const hasLength = ([someValue]) => !!someValue.length || someValue.length === 0;

const swapAt = index => (array) => {
    const arraySplitted = array.map(splitAt(index));

    const child1 = concat(head(head(arraySplitted)), last(last(arraySplitted)));
    const child2 = concat(head(last(arraySplitted)), last(head(arraySplitted)));

    return [child1, child2];
};

const zipKeys = attributes => value => zipObj(attributes, value);
const swapAndZip = (genomeKeys, index) => compose(
    map(zipKeys(genomeKeys)),
    swapAt(index),
    map(values),
);

const switchObject = (collection) => {
    const genomeKeys = keys(head(collection));
    const fixCrossPoint = randomInRange(genomeKeys.length - 1);

    return swapAndZip(genomeKeys, fixCrossPoint)(collection);
};

export function onePointCrossOver({ genome: genome1 }, { genome: genome2 }) {
    return ifElse(
        hasLength,
        swapAt(randomInRange(genome1.length - 1)),
        switchObject,
    )([genome1, genome2]);
}

const swapFor = (...indexes) => (list) => {
    if (indexes.length === 0) { return list; }

    return swapFor(...tail(indexes))(swapAt(head(indexes))(list));
};

const swapForAndZip = (genomeKeys, indexes) => compose(
    map(zipKeys(genomeKeys)),
    swapFor(...indexes),
    map(values),
);

const getRandomFixPoints = (length) => {
    const fixCrossPoint1 = length === 3 ? 1 : randomInRange(length - 1);
    const fixCrossPoint2 = length === 3 ? 2 : randomInRange(fixCrossPoint1 + 1, length - 1);

    return [
        fixCrossPoint1,
        fixCrossPoint2,
    ];
};
const switchObjectTwice = (collection) => {
    const genomeKeys = keys(head(collection));
    const fixCrossPoints = getRandomFixPoints(genomeKeys.length);

    return swapForAndZip(genomeKeys, fixCrossPoints)(collection);
};

export function twoPointCrossOver({ genome: genome1 }, { genome: genome2 }) {
    const fixCrossPoints = getRandomFixPoints(genome1.length);

    return ifElse(
        hasLength,
        swapFor(...fixCrossPoints),
        switchObjectTwice,
    )([genome1, genome2]);
}
