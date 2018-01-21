import { DECREASING, INCREASING } from '../constants/rank';

const increasingFitness = (a, b) => (a.fitness < b.fitness ? 1 : -1);

const byFitness = rank =>
    (rank === INCREASING ?
        (a, b) => -1 * increasingFitness(a, b)
        : increasingFitness);

export default function generatePopulation(population, { rank = DECREASING } = {}) {
    return {
        population: population.sort(byFitness(rank)),
        rank,
    };
}
