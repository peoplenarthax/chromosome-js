import { DECREASING, INCREASING } from '../constants/rank';

export function selectRandom(amount, { population }) {
    if (amount > population.length) {
        throw new RangeError('You cannot select more individuals than the population size');
    }
    return [...new Array(amount)]
        .map(() => population[Math.round(Math.random() * (population.length - 1))]);
}

export function selectBest(amount, { population, rank }) {
    if (amount > population.length) {
        throw new RangeError('You cannot select more individuals than the population size');
    }
    if (rank === DECREASING) {
        return population.slice(0, amount);
    }
    const { length } = population;

    return population.slice(length - amount, length).reverse();
}

export function selectWorst(amount, { population, rank }) {
    if (amount > population.length) {
        throw new RangeError('You cannot select more individuals than the population size');
    }
    if (rank === INCREASING) {
        return population.slice(0, amount);
    }
    const { length } = population;

    return population.slice(length - amount, length).reverse();
}

export function selectByTournament(amount, tournamentSize, { population }, { removeWinners } = {}) {
    if (amount > population.length || tournamentSize > population.length) {
        throw new RangeError('You cannot select more individuals than the population size');
    }
    const selected = [];
    const availablePopulation = population;
    for (let k = 0; k < amount; k++) { // eslint-disable-line no-plusplus
        const tournamentWinner = Array(tournamentSize)
            .fill()
            .map((participant, index) =>
                ({
                    ...availablePopulation[Math.floor(Math.random() * availablePopulation.length)],
                    index,
                }))
            .reduce((best, ind) => (ind.fitness > best.fitness ? ind : best), { fitness: 0 });

        const { index, ...selectedIndividual } = tournamentWinner;
        selected.push(selectedIndividual);

        if (removeWinners) {
            availablePopulation.splice(index, 1);
        }
    }

    return selected;
}
