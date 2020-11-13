import {
    takeLast,
    reverse,
    compose,
    remove,
    reduce,
    range,
} from 'ramda';
import { randomInRange } from '../../utils/random';
import { Individual } from "../population";

type SelectionFunction = (amount: number, population: Individual[], options?: any) => Individual[]

const random: SelectionFunction = (amount, population) => {
    return [...new Array(amount)]
        .map(() => population[randomInRange(population.length - 1)]);
};

const best: SelectionFunction = (amount, population) => {
    return population
        .slice(0, amount);
};

const worst: SelectionFunction = (amount, population) => {
    return compose<Individual[], Individual[], Individual[]>(
        reverse,
        takeLast(amount),
    )(population)
};

type IndexedIndividual = {
    index: number
} & Individual

// TOURNAMENT FUNCTIONS
const selectAndRemoveWinners = (removeWinners: boolean, population: Individual[], selected: Individual[]) =>
    ({ index, ...selectedIndividual }: IndexedIndividual) =>
        ({
            selected: [...selected, selectedIndividual],
            availablePopulation: removeWinners
                ? remove(index, 1, population)
                : population,
        });

const tournamentOf = (tournamentSize: number) => (population: Individual[]): IndexedIndividual => Array(tournamentSize)
    .fill(undefined)
    .map((__, index) => ({
        ...population[randomInRange(population.length)],
        index,
    }))
    .reduce((winner, ind) => (ind.fitness > winner.fitness ? ind : winner), {
        fitness: 0
    } as IndexedIndividual);

type TournamentObject = {
    selected: Individual[],
    availablePopulation: Individual[]
}
const tournament: SelectionFunction = (amount, population, {
    tournamentSize,
    removeWinners
}: {
    tournamentSize: number,
    removeWinners: boolean
} = {
        tournamentSize: 2,
        removeWinners: false
    }) => {
    const {
        selected: selectedIndividuals
    } = reduce(
        ({
            selected,
            availablePopulation
        }: TournamentObject) =>
            compose<Individual[], IndexedIndividual, TournamentObject>(
                selectAndRemoveWinners(removeWinners, availablePopulation, selected),
                tournamentOf(tournamentSize),
            )(availablePopulation), {
                selected: [],
                availablePopulation: population
            } as TournamentObject,
        range(0, amount),
    );

    return selectedIndividuals;
};

const roulette: SelectionFunction = (amount, population) => {
    const maxFitness = population[0].fitness;
    let selected: Individual[] = [];
    for (let k = 0; k < amount; k++) { // eslint-disable-line no-plusplus
        let index;
        while (true) { // eslint-disable-line no-constant-condition
            index = randomInRange(population.length - 1);
            if (Math.random() <= (population[index].fitness / maxFitness)) break;
        }
        selected = [...selected, population[index]];
    }

    return selected;
};

// Function to check if we are trying to select more individuals than the one available in the population
const rangeCheckedFunction: any = (...args: any[]) => {
    if (args[0] > args[1].length) {
        throw new RangeError('You cannot select more individuals than the population size');
    }
    return args[args.length - 1](...args);
};

// Randomly give you N individuals
export const selectRandom: SelectionFunction = (...args) => rangeCheckedFunction(...args, random);

// Select the N first individuals sorted by fitness
export const selectBest: SelectionFunction = (...args) => rangeCheckedFunction(...args, best);

// Select the N last individuals sorted by fitness
export const selectWorst: SelectionFunction = (...args) => rangeCheckedFunction(...args, worst);

/*
 * Selects N individuals randomly from the population and only the best one of them
 * gets selected
 * Select N individuals by performing tournaments of X size
 */
export const selectByTournament: SelectionFunction = (...args) => rangeCheckedFunction(...args, tournament);

/*
* Selects N using roulette algorithm where a individual's possibility to be chosen
* is proporcional to his fitness in comparison with the total fitness of the population
*/
export const selectRoulette: SelectionFunction = (...args) => rangeCheckedFunction(...args, roulette);

export const selectPopulation = (selection: SelectionFunction, size: number, population: Individual[], options: any) => {
    return selection(size, population, options);
}
