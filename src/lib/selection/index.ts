import { randomInRange } from '../../utils/random';
import { Individual, byFitness } from "../population";

interface SelectionFunction<T = {}> { (amount: number, population: Individual[], options?: T) : Individual[] }

// Function to check if we are trying to select more individuals than the one available in the population
const checkRange = (selectAmount: number, population: any[]) => {
    if (selectAmount > population.length) {
        throw new RangeError('You cannot select more individuals than the population size');
    }
};

// Randomly give you N individuals
export const selectRandom: SelectionFunction = (amount, population) => {
    checkRange(amount, population);

    return Array.from({length: amount}, () => population[randomInRange(population.length - 1)])
};

// Select the N first individuals sorted by fitness
export const selectBest: SelectionFunction = (amount, population) => {
    checkRange(amount, population);

    return population.slice(0, amount);
};

// Select the N last individuals sorted by fitness
export const selectWorst: SelectionFunction = (amount, population) => {
    checkRange(amount, population);

    return population.slice(-amount).reverse()
};

/*
 * Select N individuals by performing tournaments of X size
 */
type TournamentOptions = { tournamentSize: number }
export const selectByTournament: SelectionFunction<TournamentOptions> = (amount, population, {
    tournamentSize
} = {
        tournamentSize: 2
    }) => {
        checkRange(amount, population);

        let winners = []

        while (winners.length < amount) {
            const participants = selectRandom(tournamentSize, population).sort(byFitness)

            winners.push(participants[0])
        }

        return winners;
};

/*
* Selects N using roulette algorithm where a individual's possibility to be chosen
* is proporcional to his fitness in comparison with the total fitness of the population
*/
export const selectRoulette: SelectionFunction = (amount, population) => {
    checkRange(amount, population)

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

export const selectPopulation = (selection: SelectionFunction, size: number, population: Individual[], options: any) => {
    return selection(size, population, options);
}
