
// Example of usage without auto runner
// import generateIndividual from './population/Individual';
// import { clone } from 'ramda';

// const MAX_N_GENERATIONS = 999;
// const POPULATION_SIZE = 100;
// const SELECTION_SIZE = 60;
// const MUTATION_PROBABILITY = 0.30;
// // Genotypes creates a blueprint function for generating individuals
// // RandomInt, RandomDecimal, createListOf, oneOfEnum
// // Support object genotype and list genotype
// const genotype = generateGenotype({
// sumSack: generateList(randomInt(0, 1), 100)),
// });

// // Fitness is a function that can evaluate the result of the genotype
// const fitness = ({sumSack}) {
// return sumSack.reduce((acc, val) => acc + val, 0);
// }

// // Define mutation function, have to decide about Maps and what to do with Mutation Prob
// // Probably inject mutation probability always at the end
// const objectMutation = {
// sumSack: sumSack => sumSack.map(gene => Math.random())
// }

// // Generate Population only runs X times the given genotype to generate individuals
// const initPopulation = generatePopulation(genotype, POPULATION_SIZE, fitness);

// let population = clone(initPopulation)

// for(let generationNumber = 0; generation < 999; generationNumber++ ) {
// population = evaluateFitness(population)
// const selectedPopulation = selectPopulation(best, SELECTION_SIZE, population);
// const offspring = generateOffspring(crossPoint, POPULATION_SIZE - SELECTION_SIZE, selectedPopulation);

// const newPopulation = concat(selectedPopulation, offSpring); // Make this immutable

// const mutatedPopulation = mutateIndividuals(objectMutation, MUTATION_PROBABILITY, newPopulation);

// population = clone(mutatedPopulation);
// }
