import { mapObjIndexed } from '../../utils/functional';

export type Genome = any[] | { [k: string]: any }
export interface Individual {
    genome: Genome,
    fitness: number
}

type GenotypeFunction = () => any
export type Genotype = GenotypeFunction | { [k: string]: GenotypeFunction } | GenotypeFunction[]
export type FitnessFunction = (genome: Genome) => number | Individual

/**
 * Individual represents a possible solution in the problem space
 *
 * Genotype: Function or object with functions that once executed
 * generate one probable individual genome
 * Fitness: Function that given a genome can give a numerical value
 * that correlates with how good the genome solves the problem
 */
export const generateIndividual = (genotype: Genotype, fitnessFunction: FitnessFunction): Individual => {
    if (!genotype) { throw TypeError('Individual needs a genotype'); }
    if (!fitnessFunction) { throw TypeError('Individual needs fitness function'); }

    if (typeof (genotype) === 'function') {
        const genome = genotype();
        return {
            genome,
            fitness: fitnessFunction(genome) as number,
        };
    }

    const genome = mapObjIndexed(fn => fn(), genotype as any);

    return {
        genome,
        fitness: fitnessFunction(genome) as number
    }
}

export type IndividualGenerator = (genome: Genome) => Individual

// Sames as generateIndividual but curryfied with the fitness first
export const generateIndividualWith = (fitness: FitnessFunction): IndividualGenerator => (genome: Genome) => ({
    genome,
    fitness: fitness(genome) as number,
});

export const byFitness = (a: Individual, b: Individual) => (a.fitness < b.fitness ? 1 : -1);

/**
* Maybe Population is not needed
*/
export const generatePopulation = (genotype: Genotype, fitness: FitnessFunction, size: number) => {
    let population = new Array(size)

    for (let i = 0; i < size; i++) {
        population[i] = generateIndividual(genotype, fitness)
    }

    return population.sort(byFitness)
}

export const generatePopulationWithValidation = (genotype: () => Individual, size: number) => {
    let population = new Array(size)

    for (let i = 0; i < size; i++) {
        population[i] = genotype()
    }

    return population.sort(byFitness)
}