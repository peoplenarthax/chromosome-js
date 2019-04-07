import { times } from 'ramda';
import {FitnessFunction, generateIndividual, Genotype, Individual} from './individual';

const byFitness = (a: Individual, b: Individual) => (a.fitness < b.fitness ? 1 : -1);

/**
* Maybe Population is not needed
*/
export default (genotype: Genotype, fitness: FitnessFunction, size: number) => {
    return times(() => generateIndividual(genotype, fitness), size)
        .sort(byFitness);
}
