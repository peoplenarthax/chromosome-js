import IndividualBuilder from './IndividualBuilder';
import { DECREASING } from '../../constants/rank';

export default class PopulationBuilder {

    constructor() {
        this._population = [
            new IndividualBuilder().withFitness(3).build(),
            new IndividualBuilder().withFitness(2).build(),
            new IndividualBuilder().withFitness(1).build(),
        ];
        this._rank = DECREASING;
    }

    withIndividuals(amount, rank = DECREASING) {
        this._population = [];
        let fitness = rank === DECREASING ? amount : 1;
        for (let k = 0; k < amount; k++) { // eslint-disable-line no-plusplus
            this._population.push(new IndividualBuilder()
                .withFitness(rank === DECREASING ?
                    fitness-- : fitness++) // eslint-disable-line no-plusplus
                .build());
        }
        this._rank = rank;

        return this;
    }

    withPopulation(population) {
        this._population = population;
        return this;
    }

    build() {
        return {
            population: this._population,
            rank: this._rank,
        };
    }

}
