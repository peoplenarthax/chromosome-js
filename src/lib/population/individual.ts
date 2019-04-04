import {
    applySpec, identity, flip, call, map,
} from 'ramda';

export type Genome = any[] | { [k: string] : any}
export interface Individual {
    genome: Genome,
    fitness: number
}

type GenotypeFunction = () => any
export type Genotype = GenotypeFunction | {[k: string]: GenotypeFunction} | GenotypeFunction[]
export type FitnessFunction = (genome: Genome) => number
/**
 * Individual represents a possible solution in the problem space.
 * Population is a list of individuals. Every individual has features
 * and a fitness function
 * @abstract
 */
export const generateIndividual = (genotype: Genotype, fitnessFunction: FitnessFunction ) : Individual => {
    if (!genotype) { throw TypeError('Individual needs a genotype'); }
    if (!fitnessFunction) { throw TypeError('Individual needs fitness function'); }

    if (typeof (genotype) === 'function') {
        const genome = genotype();
        return {
            genome,
            fitness: fitnessFunction(genome),
        };
    }
    const individual = applySpec<Individual>({
        genome: identity,
        fitness: flip(call),
    });
    const genome = map(call, genotype as any);

    return individual(genome, fitnessFunction);
}

export type IndividualGenerator = (genome: Genome) => Individual

export const generateIndividualWith = (fitness: FitnessFunction) : IndividualGenerator => {
    return (genome: Genome) => ({
        genome,
        fitness: fitness(genome),
    });
}
