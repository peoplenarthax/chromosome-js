import { times } from 'ramda';
import { generateIndividual } from './Individual';

const byFitness = (a, b) => (a.fitness < b.fitness ? 1 : -1);

/**
* Maybe Population is not needed
*/
export default function generatePopulation(genotype, fitness, size) {
    return times(() => generateIndividual(genotype, fitness), size)
        .sort(byFitness);
}
