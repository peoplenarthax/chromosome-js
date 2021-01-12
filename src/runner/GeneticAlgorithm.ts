import { CrossoverFunction } from '../lib/crossover';
import { MutationFunction } from '../lib/mutation';
import { byFitness, FitnessFunction, generateIndividualWith, generatePopulation, generatePopulationWithValidation, Genome, Individual } from '../lib/population';
import { SelectionFunction } from '../lib/selection';

type GeneticAlgorithmConfig = { 
	populationSize: number
	generations: number
	mutationProbability: number
	crossoverProbability: number
	individualValidation: boolean
	tournamentSize?: number
	endCondition?: (population: Individual[]) => boolean
	preventUIBlock?: boolean
}

type GeneticAlgorithmHooks = {
	onGeneration: (population: Individual[], generation: number) => void
}

export type GeneticAlgorithmConstructor<T> = {
	seed : () => T | Individual;
	mutation: MutationFunction
	crossover: CrossoverFunction
	selection: SelectionFunction
	fitness: FitnessFunction
	config: GeneticAlgorithmConfig
	hooks?: GeneticAlgorithmHooks
}

// TODO: Document and add test
export class GeneticAlgorithm<T> {
	seed : () => T | Individual;
	mutation: MutationFunction;
	crossover: CrossoverFunction;
	selection: SelectionFunction;
	fitness: FitnessFunction
	config : GeneticAlgorithmConfig = {
		populationSize: 100,
		generations: 999,
		mutationProbability: 0.2,
		crossoverProbability: 0.8,
		individualValidation: false,
		preventUIBlock: false
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

		this.population = !this.config.individualValidation 
			? generatePopulation(this.seed, this.fitness, this.config.populationSize)
			: generatePopulationWithValidation(this.seed as () => Individual, this.config.populationSize)
		this.hooks?.onGeneration(this.population, 0)
	}

	mutate(offspring: [Genome, Genome]) : [Genome, Genome] {
		return offspring.map(individual => {
			return this.mutation(this.config.mutationProbability, individual)
		}) as [Genome, Genome];
	}

	getNewIndividuals(offspring: [Genome, Genome]): Individual[] {
		return this.mutate(offspring)
			.map(!this.config.individualValidation ?
				generateIndividualWith(this.fitness)
				: this.fitness as (genome: Genome) => Individual )
	}

	step() : Promise<boolean> {
		return new Promise(async (resolve) => {
			if (this.generation > this.config.generations || this.config.endCondition?.(this.population)) {
				return resolve(true)
			}

        let nextPopulation = [this.population[0], this.population[1]];
        while (nextPopulation.length !== this.config.populationSize) {
            const [selectedIndividual1, selectedIndividual2] = this.selection(2, this.population, { tournamentSize: this.config.tournamentSize});

            if (Math.random() < this.config.crossoverProbability) {
				const offspring = this.crossover(selectedIndividual2.genome, selectedIndividual1.genome)

				const offSpringIndividual = !this.config.preventUIBlock
					? this.getNewIndividuals(offspring)
					: await new Promise((resolve) => {
						setTimeout(() => resolve(this.getNewIndividuals(offspring)))}) as Individual[]

                nextPopulation = nextPopulation.concat(offSpringIndividual);
            } else {
                nextPopulation = nextPopulation.concat([selectedIndividual1, selectedIndividual2]);
            }
        }

        if (nextPopulation.filter(({fitness}) => this.population[0].fitness === fitness).length > this.config.populationSize/2) {
			const regeneratedPopulation = !this.config.individualValidation 
				? generatePopulation(this.seed, this.fitness, this.config.populationSize - 1)
				: generatePopulationWithValidation(this.seed as () => Individual, this.config.populationSize - 1)

            this.population = [this.population[0], ...regeneratedPopulation];
        } else {
			const sortedPopulation = nextPopulation.sort(byFitness);
			
            this.population = sortedPopulation;
		}

		this.hooks?.onGeneration(this.population, this.generation);
		this.generation++

		return resolve(false)
	})
	}
}