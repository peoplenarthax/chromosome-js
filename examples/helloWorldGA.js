// Example of usage without auto runner
const generatePopulation = require('../dist/population/Population').default;
const { generateIndividualWith } = require('../dist/population/Individual');
const {
    __,
    append,
    clone,
    sort,
    until,
    length,
    equals,
    update,
} = require('ramda');
const randomInRange = require('../dist/utils/random/randomInRange').default;
const { selectRoulette, selectPopulation, selectBest } = require('../dist/selection/selection');
const { onePointCrossOver } = require('../dist/crossover/crossover');
const { flipMutation } = require('../dist/mutation/mutation');

const MAX_N_GENERATIONS = 999;
const POPULATION_SIZE = 100;
const CROSSOVER_PROB = 0.60;
const SIZE_IND = 300;
const MUTATION_PROBABILITY = 0.5;
const STRING_GOAL = 'Hristo Georgiev';

const sum = list => list.reduce((acc, val) => acc + val, 0);

const mean = fitnesses => sum(fitnesses) / fitnesses.length;
const sum2 = fitnesses => sum(fitnesses.map(fitness => Math.pow(fitness, 2)));
const std = fitnesses => Math.pow(Math.abs((sum2(fitnesses) / fitnesses.length) - Math.pow(mean(fitnesses), 2)), 0.5);

const printPopulationData = (generationNumber, population) => {
    console.log(`----- Generation number:${generationNumber} -----`);
    console.log('BEST INDIVIDUAL:\n', population[0]);
    console.log(population[0].fitness);

    const fitnessList = population.map(({ fitness }) => fitness);
    console.log('Min: ', Math.min(...fitnessList));
    console.log('Max: ', Math.max(...fitnessList));
    console.log('Avg: ', mean(fitnessList));
    console.log('Std: ', std(fitnessList));
};

const safePush = (value, list) => (list.length + 1 > POPULATION_SIZE ? list : append(value, list));
const lengthStringEqualsAmount = amount => string => equals(length(string), amount);
const randomChar = () => String.fromCharCode(randomInRange(32, 130));
const addRandomChar = string => (string + randomChar());
const generateRandomStringOf = amount => () => until(lengthStringEqualsAmount(amount), addRandomChar)('');

// Genotypes creates a blueprint function for generating individuals
// RandomInt, RandomDecimal, createListOf, oneOfEnum
// Support object genotype and list genotype
const genotype = generateRandomStringOf(STRING_GOAL.length);

// Fitness is a function that can evaluate the result of the genotype
const fitness = goal => (gene) => {
    let total = 0;
    for (let i = 0; i < gene.length; i += 1) {
        total += Math.abs(gene.charCodeAt(i) - goal.charCodeAt(i));
    }
    return total;
};
const fromArrayToString = array => array.join('');
const flipCharMutation = (mutationProbability, genome) => {
    if (Math.random() > mutationProbability) { return genome; }

    const index = Math.floor(Math.random() * genome.length);
    const upOrDown = Math.random() <= 0.5 ? -1 : 1;
    const newChar = String.fromCharCode(genome.charCodeAt(index) + upOrDown);

    return update(index, newChar, genome).join('');
};

const generateOneMaxIndividual = generateIndividualWith(fitness(STRING_GOAL));

const byFitness = (a, b) => (a.fitness > b.fitness ? 1 : -1);
const sortByFitness = sort(byFitness);

// Generate Population only runs X times the given genotype to generate individuals
let generationNumber = 0;
const initPopulation = generatePopulation(genotype, fitness(STRING_GOAL), POPULATION_SIZE);
printPopulationData(generationNumber, initPopulation);
let population = clone(initPopulation);

for (
    generationNumber = 1;
    generationNumber < 999 && population[0].fitness !== 0;
    generationNumber += 1
) {
    console.log(population[0].genome);
    let newPopulation = [...selectPopulation(selectBest, 20, population)]; // Saving best individual
    while (newPopulation.length < POPULATION_SIZE) {
        const [parent1, parent2] = selectPopulation(selectRoulette, 20, population);
        if (Math.random() < CROSSOVER_PROB) {
            let [child1, child2] = onePointCrossOver(parent1, parent2).map(fromArrayToString);

            child1 = flipCharMutation(MUTATION_PROBABILITY, child1);
            child2 = flipCharMutation(MUTATION_PROBABILITY, child2);

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

