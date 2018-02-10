import { takeLast, reverse, compose } from 'ramda';
import randomInRange from '../utils/random/randomInRange';


const rangeCheckedFunction = (...args) => {
    if (args[0] > args[1].length) {
        throw new RangeError('You cannot select more individuals than the population size');
    }
    return args[args.length - 1](...args);
};

const selectLast = amount => compose(
    reverse,
    takeLast(amount),
);
const selectTournamentWinner = tournamentSize => population =>
    Array(tournamentSize)
        .fill()
        .map((participant, index) =>
            ({
                ...population[randomInRange(population.length)],
                index,
            }))
        .reduce((winner, ind) => (ind.fitness > winner.fitness ? ind : winner), { fitness: 0 });

export const selectRandom = (...args) => rangeCheckedFunction(...args, random);
export const selectBest = (...args) => rangeCheckedFunction(...args, best);
export const selectWorst = (...args) => rangeCheckedFunction(...args, worst);
export const selectByTournament = (...args) => rangeCheckedFunction(...args, tournament);
export const selectRoulette = (...args) => rangeCheckedFunction(...args, roulette);

function random(amount, population) {
    return [...new Array(amount)]
        .map(() => population[randomInRange(population.length - 1)]);
}

function best(amount, population) {
    return population
        .slice(0, amount);
}

function worst(amount, population) {
    return selectLast(amount)(population);
}

function tournament(amount, population, { tournamentSize = 2, removeWinners } = {}) {
    const selected = [];
    const availablePopulation = population;
    for (let k = 0; k < amount; k++) { // eslint-disable-line no-plusplus
        const tournamentWinner = selectTournamentWinner(tournamentSize)(availablePopulation);

        const { index, ...selectedIndividual } = tournamentWinner;
        selected.push(selectedIndividual);

        if (removeWinners) {
            availablePopulation.splice(index, 1);
        }
    }

    return selected;
}

function roulette(amount, population) {
    const maxFitness = population[0].fitness;
    let selected = [];
    for (let k = 0; k < amount; k++) { // eslint-disable-line no-plusplus
        let index;
        while (true) { // eslint-disable-line no-constant-condition
            index = randomInRange(population.length - 1);
            if (Math.random() <= (population[index].fitness / maxFitness)) break;
        }
        selected = [...selected, population[index]];
    }

    return selected;
}
