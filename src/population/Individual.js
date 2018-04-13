import { applySpec, identity, flip, call, map } from 'ramda';
/**
 * Individual represents a possible solution in the problem space.
 * Population is a list of individuals. Every individual has features
 * and a fitness function
 * @abstract
 */

// const throwTypeError = (message) => { throw new TypeError(message); };
// const errorIndividualEmpty = (...args) => { throw TypeError('Individual needs a genome genotype'); };
// const errorFitnessEmpty = (...args) => { throw TypeError('Individual needs fitness function'); };


export function generateIndividual(genotype, fitnessFunction) {
    if (!genotype) { throw TypeError('Individual needs a genome genotype'); }
    if (!fitnessFunction) { throw TypeError('Individual needs fitness function'); }

    if (typeof (genotype) === 'function') {
        const genome = genotype();
        return {
            genome,
            fitness: fitnessFunction(genome),
        };
    }
    const individual = applySpec({
        genome: identity,
        fitness: flip(call),
    });
    const genome = map(call, genotype);

    return individual(genome, fitnessFunction);
}

export function generateIndividualWith(fitness) {
    return genome => ({
        genome,
        fitness: fitness(genome),
    });
}
