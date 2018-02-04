import { DECREASING, INCREASING } from '../constants/rank';
import randomInRange from '../utils/random/randomInRange';

const rangeCheckedFunction = (...args) => {
    if (args[0] > args[1].population.length) {
        throw new RangeError('You cannot select more individuals than the population size');
    }
    return args[args.length - 1](...args);
};

export const selectRandom = (...args) => rangeCheckedFunction(...args, random);
export const selectBest = (...args) => rangeCheckedFunction(...args, best);
export const selectWorst = (...args) => rangeCheckedFunction(...args, worst);
export const selectByTournament = (...args) => rangeCheckedFunction(...args, tournament);
export const selectRoulette = (...args) => rangeCheckedFunction(...args, roulette);

function random(amount, { population }) {
    return [...new Array(amount)]
        .map(() => population[randomInRange(population.length - 1)]);
}

function best(amount, { population, rank }) {
    if (rank === DECREASING) {
        return population.slice(0, amount);
    }
    const { length } = population;

    return population.slice(length - amount, length).reverse();
}

function worst(amount, { population, rank }) {
    if (rank === INCREASING) {
        return population.slice(0, amount);
    }
    const { length } = population;

    return population.slice(length - amount, length).reverse();
}

function tournament(amount, { population }, tournamentSize, { removeWinners } = {}) {
    const selected = [];
    const availablePopulation = population;
    for (let k = 0; k < amount; k++) { // eslint-disable-line no-plusplus
        const tournamentWinner = Array(tournamentSize)
            .fill()
            .map((participant, index) =>
                ({
                    ...availablePopulation[randomInRange(availablePopulation.length)],
                    index,
                }))
            .reduce((winner, ind) => (ind.fitness > winner.fitness ? ind : winner), { fitness: 0 });

        const { index, ...selectedIndividual } = tournamentWinner;
        selected.push(selectedIndividual);

        if (removeWinners) {
            availablePopulation.splice(index, 1);
        }
    }

    return selected;
}

function roulette(amount, { population }) {
    const maxFitness = population[0].fitness;
    const selected = [];
    for (let k = 0; k < amount; k++) { // eslint-disable-line no-plusplus
        let index;
        while (true) { // eslint-disable-line no-constant-condition
            index = randomInRange(population.length - 1);
            if (Math.random() <= (population[index].fitness / maxFitness)) break;
        }
        selected.push(population[index]);
    }

    return selected;
}
