import { randomInRange } from '../../utils/random';
import { Genome } from "../population";

export type CrossoverFunction = (genome1: Genome, genome2: Genome) => [Genome, Genome]
const splitAt = (index: number) => (array: any[]) => [array.slice(0, index), array.slice(index)]

const swapAt = (index: number) => (arrays: [any[], any[]]) => {
    const arraySplitted = arrays.map(splitAt(index));

    const child1 = [...arraySplitted[0][0], ...arraySplitted[1][1]]
    const child2 = [...arraySplitted[1][0], ...arraySplitted[0][1]]

    return [child1, child2];
};


// Get 2 points within an array length one after the other
const getRandomFixPoints = (length: number, amount: number): number[] => {
    if (length < 1) {
        throw new RangeError("The number of fix points should be at least 1")
    }

    let fixCrossPoints = [randomInRange(length - 1)]

    for (let i = 1; i < amount; i++) {
        fixCrossPoints.push(randomInRange(fixCrossPoints[i - 1] + 1, length - 1))
    }

    return fixCrossPoints;
};

// Function that will create X amount of fix points and do cross over of 2 individuals over them
export const xPointCrossOver= (x: number) : CrossoverFunction => (genome1, genome2) => {
    let children = [genome1, genome2]

    if (!Array.isArray(genome1)) {
        children = children.map(Object.entries)
    }

    const fixCrossPoints = getRandomFixPoints(children[0].length, x);
    for (let crosspointIndex = 0; crosspointIndex < fixCrossPoints.length; crosspointIndex++) {
        children = swapAt(fixCrossPoints[crosspointIndex])(children as [any[], any[]])
      }

    if (Array.isArray(genome1)) {
        return children as [Genome, Genome]
    }
    
    return children.map(Object.fromEntries as any) as [Genome, Genome]
};

export const twoPointCrossOver = xPointCrossOver(2)

export const onePointCrossOver = xPointCrossOver(1)