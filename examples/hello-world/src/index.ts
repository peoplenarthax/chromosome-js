import {
    GARunner,
    Genome,
    Individual,
    MutationFunction,
    onePointCrossOver,
    randomInRange,
    selectRoulette
} from "chromosome-js";

const printPopulationData = ( population: Individual[], generationNumber: number) => {
    console.log(`----- Generation number:${generationNumber} -----`);
    console.log('BEST INDIVIDUAL:\n', population[0].genome.join(''));
    console.log(population[0].fitness);
};

const randomChar = () => String.fromCharCode(randomInRange(0, 255)); //32. 130 reduced space
const generateRandomStringOf = (amount: number) => () => Array.from({length: amount}, randomChar)

const STRING_GOAL = 'chromosome-js'.split('')

// Genotypes creates a blueprint function for generating individuals
const genotype = generateRandomStringOf(STRING_GOAL.length);

// Fitness is a function that can evaluate the result of the genotype
const fitness = (goal: string[]) => (gene: Genome) => {
    let total = 0;
    for (let i = 0; i < gene.length; i += 1) {
        total += Math.abs(gene[i].charCodeAt(0) - goal[i].charCodeAt(0));
    }
    return -total;
};

const flipCharMutation : MutationFunction = (mutationProbability, gene) => {
    if (Math.random() > mutationProbability) { return gene; }
    let newGenome : string[] = Array.from(gene as string[])
    const index = Math.floor(Math.random() * gene.length);
    const upOrDown = Math.random() <= 0.5 ? -1 : 1;
    const newChar = String.fromCharCode((gene[index] as string).charCodeAt(0) + upOrDown);
    newGenome[index] = newChar

    return newGenome
};

    const config = {
        populationSize: 200,
        mutationProbability: 0.2,
        crossoverProbability: 0.4,
        individualValidation: false,
        generations: 9999,
        preventUIBlock: false,
        endCondition: ([first]: Individual[]) => first.genome.join('') === STRING_GOAL.join('')
    }

    GARunner({
            seed: genotype,
            fitness:fitness(STRING_GOAL),
            mutation: flipCharMutation,
            crossover: onePointCrossOver,
            selection: selectRoulette,
            config,
            hooks: {
                onGeneration: printPopulationData
            } })