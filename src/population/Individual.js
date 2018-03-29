import { applySpec, identity, flip, call, map } from 'ramda';
/**
 * Individual represents a possible solution in the problem space.
 * Population is a list of individuals. Every individual has features
 * and a fitness function
 * @abstract
 */

// const throwTypeError = (message) => { throw new TypeError(message); };
// const errorIndividualEmpty = (...args) => { throw TypeError('Individual needs a chromosome genotype'); };
// const errorFitnessEmpty = (...args) => { throw TypeError('Individual needs fitness function'); };


export default function generateIndividual(chromosomeGenerator, fitnessFunction) {
    if (!chromosomeGenerator) { throw TypeError('Individual needs a chromosome genotype'); }
    if (!fitnessFunction) { throw TypeError('Individual needs fitness function'); }

    if (typeof (chromosomeGenerator) === 'function') {
        const chromosome = chromosomeGenerator();
        return {
            chromosome,
            fitness: fitnessFunction(chromosome),
        };
    }
    const individual = applySpec({
        chromosome: identity,
        fitness: flip(call),
    });
    const chromosome = map(call, chromosomeGenerator);

    return individual(chromosome, fitnessFunction);
}
