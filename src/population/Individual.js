/**
 * Individual represents a possible solution in the problem space.
 * Population is a list of individuals. Every individual has features
 * and a fitness function
 * @abstract
 */
export default function generateIndividual(features, fitnessFunction) {
    if (!features) { throw TypeError('Individual needs features'); }
    if (!fitnessFunction) { throw TypeError('Individual needs fitness function'); }

    return {
        features,
        fitness: fitnessFunction(features),
        fitnessFunction,
    };
}
