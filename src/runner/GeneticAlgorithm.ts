import { CrossoverFunction } from '../lib/crossover';
import { MutationFunction } from '../lib/mutation';
import { byFitness, FitnessFunction, generateIndividualWith, generatePopulation, Genome, Individual } from '../lib/population';
import { SelectionFunction } from '../lib/selection';

type GeneticAlgorithmConfig = { 
	populationSize: number
	generations: number
	mutationProbability: number
	crossoverProbability: number
}
type GeneticAlgorithmHooks {
	onGeneration: (population: Individual[], generation: number) => void
}

type GeneticAlgorithmConstructor<T> = {
	seed : () => T;
	mutation: MutationFunction
	crossover: CrossoverFunction
	selection: SelectionFunction
	fitness: FitnessFunction
	config : GeneticAlgorithmConfig
	hooks?: GeneticAlgorithmHooks
}
export class GeneticAlgorithm<T> {
	seed : () => T;
	mutation: MutationFunction;
	crossover: CrossoverFunction;
	selection: SelectionFunction;
	fitness: FitnessFunction
	config : GeneticAlgorithmConfig = {
		populationSize: 100,
		generations: 999,
		mutationProbability: 0.2,
		crossoverProbability: 0.8
	}
	hooks?: GeneticAlgorithmHooks
	generation: number = 1
	
	population: Individual[]

	constructor({seed, mutation, fitness, crossover, selection, config, hooks} : GeneticAlgorithmConstructor<T>) {
		this.seed = seed
		this.mutation = mutation
		this.crossover = crossover
		this.selection = selection
		this.fitness = fitness
		this.config = config
		this.hooks = hooks

		this.population = generatePopulation(this.seed, this.fitness, this.config.populationSize)
		this.hooks?.onGeneration(this.population, 0)
	}

	crossoverAndMutation(offspring: [Genome, Genome]) : [Individual, Individual] {
		return offspring.map(individual => {
			const individualToTransform = this.mutation(this.config.mutationProbability, individual)
	
			return {genome: individualToTransform, fitness: this.fitness(individualToTransform)};
		}) as [Individual, Individual];
	}

	async step() {
        let nextPopulation = [this.population[0], this.population[1]];
        while (nextPopulation.length !== this.config.populationSize) {
            const [selectedIndividual1, selectedIndividual2] = this.selection(2, this.population);

            if (Math.random() < this.config.crossoverProbability) {
				const offspring = this.crossover(selectedIndividual2, selectedIndividual1)
					.map(generateIndividualWith(this.fitness))
                nextPopulation = nextPopulation.concat(offspring);
            } else {
                nextPopulation = nextPopulation.concat([selectedIndividual1, selectedIndividual2]);
            }
        }

        if (nextPopulation.filter(({fitness}) => this.population[0].fitness === fitness).length > this.config.populationSize/2) {
            this.population = [this.population[0], ...generatePopulation(this.seed, this.fitness, this.config.populationSize - 1)];
        } else {
            const sortedPopulation = nextPopulation.sort(byFitness);
            if (this.population[0].fitness < sortedPopulation[0].fitness ) {
                this.hooks?.onGeneration(this.population, this.generation);
            }
            this.population = sortedPopulation;
        }
	}
}