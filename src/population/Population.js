const byFitness = (a, b) => (a.fitness < b.fitness ? 1 : -1);

/**
* Maybe Population is not needed
*/
export default function generatePopulation(population) {
    return population.sort(byFitness);
}
