// Example of usage without auto runner Run build before executing them by the moment
const generatePopulation = require('../dist/population/population').default;
const { generateIndividualWith } = require('../dist/population/individual');
const {
    append,
    clone,
    sort,
    times,
} = require('ramda');
const randomInRange = require('../dist/utils/random/randomInRange').default;
const { selectByTournament, selectPopulation, selectBest } = require('../dist/selection/selection');
const { onePointCrossOver } = require('../dist/crossover/crossover');
const { flipMutation } = require('../dist/mutation/mutation');


// TODO: Create class genetic algorithm with lifecycle and builder parameters.
const MAX_N_GENERATIONS = 999;
const POPULATION_SIZE = 100;
const CROSSOVER_PROB = 0.50;
const SIZE_IND = 300;
const MUTATION_PROBABILITY = 0.5;

const sum = list => list.reduce((acc, val) => acc + val, 0);

const mean = fitnesses => sum(fitnesses) / fitnesses.length;
const sum2 = fitnesses => sum(fitnesses.map(fitness => Math.pow(fitness, 2)));
const std = fitnesses => Math.pow(Math.abs((sum2(fitnesses) / fitnesses.length) - Math.pow(mean(fitnesses), 2)), 0.5);

const printPopulationData = (generationNumber, population) => {
    console.log(`----- Generation number:${generationNumber} -----`);
    console.log('BEST INDIVIDUAL:\n', population[0].fitness);
    const fitnessList = population.map(({ fitness }) => fitness);
    console.log('Min: ', Math.min(...fitnessList));
    console.log('Max: ', Math.max(...fitnessList));
    console.log('Avg: ', mean(fitnessList));
    console.log('Std: ', std(fitnessList));
};

const safePush = (value, list) => (list.length + 1 > POPULATION_SIZE ? list : append(value, list));
const generateList = (fx, amount) => () => times(fx, amount);
// Genotypes creates a blueprint function for generating individuals
// RandomInt, RandomDecimal, createListOf, oneOfEnum
// Support object genotype and list genotype
const genotype = generateList(() => randomInRange(0, 1), SIZE_IND);

// Fitness is a function that can evaluate the result of the genotype
const fitness = sum;
const generateOneMaxIndividual = generateIndividualWith(fitness);

const byFitness = (a, b) => (a.fitness < b.fitness ? 1 : -1);
const sortByFitness = sort(byFitness);

// Generate Population only runs X times the given genotype to generate individuals
let generationNumber = 0;
// TODO: Init population as web worker
const initPopulation = generatePopulation(genotype, fitness, POPULATION_SIZE);

printPopulationData(generationNumber, initPopulation);
let population = clone(initPopulation);

for (
    generationNumber = 1;
    generationNumber < MAX_N_GENERATIONS && population[0].fitness < SIZE_IND;
    generationNumber += 1
) {
    let newPopulation = [...selectPopulation(selectBest, 30, population)]; // Saving best individual
    // TODO: Next generation as web worker
    while (newPopulation.length < POPULATION_SIZE) {
        const [parent1, parent2] = selectPopulation(selectByTournament, 2, population, { tournamentSize: 10 });

        if (Math.random() < CROSSOVER_PROB) {
            let [child1, child2] = onePointCrossOver(parent1, parent2);

            child1 = flipMutation(MUTATION_PROBABILITY, child1);
            child2 = flipMutation(MUTATION_PROBABILITY, child2);

            newPopulation = safePush(generateOneMaxIndividual(child1), newPopulation);
            newPopulation = safePush(generateOneMaxIndividual(child2), newPopulation);
        } else {
            newPopulation = safePush(parent1, newPopulation);
            newPopulation = safePush(parent2, newPopulation);
        }
    }
    population = sortByFitness(newPopulation);
}


printPopulationData(generationNumber, population);

