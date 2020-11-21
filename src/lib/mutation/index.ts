import { mapObjIndexed } from '../../utils/functional';
import { randomInRange } from '../../utils/random';
import { Genome } from '../population';

export type MutationFunction = (probability: number, genome: Genome) => Genome

// Flips the last bit of the number
export const flipMutation = (mutationProbability: number, genome: number[]): number[] => {
    return genome
        .map(gene => ((Math.random() < mutationProbability) ? gene ^ 1 : gene));
}

// Get a new random number from a range
export const intInRangeMutation = (range: [number, number]) => (mutationProbability: number, genome: number[]) => {
    return mapObjIndexed((feature: number) => ((Math.random() < mutationProbability)
        ? randomInRange(...range) : feature), genome)
}


