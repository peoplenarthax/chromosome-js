import randomInRange from '../utils/random/randomInRange';
import {Genome} from "../__tests__/builders/IndividualBuilder";
import {map} from 'ramda';

export type MutationFunction = (probability: number, genome: Genome) => Genome

export const flipMutation = (mutationProbability: number, genome: number[]) : number[] => {
    return genome
        .map(gene => ((Math.random() < mutationProbability) ? gene ^ 1 : gene));
}

export const intInRangeMutation = (range: [number, number]) => (mutationProbability :number, genome: number[]) => {
    return map(feature => ((Math.random() < mutationProbability)
        ? randomInRange(...range) : feature))(genome)
}


