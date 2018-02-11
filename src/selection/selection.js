import {
    takeLast,
    reverse,
    compose,
    remove,
    reduce,
    range,
} from 'ramda';
import randomInRange from '../utils/random/randomInRange';

function random(amount, population) {
    return [...new Array(amount)]
        .map(() => population[randomInRange(population.length - 1)]);
}

function best(amount, population) {
    return population
        .slice(0, amount);
}

const selectLast = amount => compose(
    reverse,
    takeLast(amount),
);

function worst(amount, population) {
    return selectLast(amount)(population);
}

// TOURNAMENT FUNCTIONS
const selectAndRemoveWinners = (removeWinners, population, selected) =>
    ({ index, ...selectedIndividual }) => ({
        selected: [...selected, selectedIndividual],
        availablePopulation: removeWinners
            ? remove(index, 1, population)
            : population,
    });

const tournamentOf = tournamentSize => population =>
    Array(tournamentSize)
        .fill()
        .map((participant, index) =>
            ({
                ...population[randomInRange(population.length)],
                index,
            }))
        .reduce((winner, ind) => (ind.fitness > winner.fitness ? ind : winner), { fitness: 0 });

function tournament(amount, population, { tournamentSize = 2, removeWinners } = {}) {
    const { selected: selectedIndividuals } = reduce(
        ({ selected, availablePopulation }) =>
            compose(
                selectAndRemoveWinners(removeWinners, availablePopulation, selected),
                tournamentOf(tournamentSize),
            )(availablePopulation)
        ,
        { selected: [], availablePopulation: population },
        range(0, amount),
    );

    return selectedIndividuals;
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

const rangeCheckedFunction = (...args) => {
    if (args[0] > args[1].length) {
        throw new RangeError('You cannot select more individuals than the population size');
    }
    return args[args.length - 1](...args);
};

export const selectRandom = (...args) => rangeCheckedFunction(...args, random);
export const selectBest = (...args) => rangeCheckedFunction(...args, best);
export const selectWorst = (...args) => rangeCheckedFunction(...args, worst);
export const selectByTournament = (...args) => rangeCheckedFunction(...args, tournament);
export const selectRoulette = (...args) => rangeCheckedFunction(...args, roulette);
