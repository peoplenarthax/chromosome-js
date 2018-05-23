import IndividualBuilder from './IndividualBuilder';

export default class PopulationBuilder {

    constructor() {
        this._population = [
            new IndividualBuilder().withFitness(3).build(),
            new IndividualBuilder().withFitness(2).build(),
            new IndividualBuilder().withFitness(1).build(),
        ];
    }

    withIndividuals(amount) {
        this._population = [];
        let fitness = amount;
        for (let k = 0; k < amount; k++) { // eslint-disable-line no-plusplus
            this._population.push(new IndividualBuilder()
                .withFitness(fitness--) // eslint-disable-line no-plusplus
                .build());
        }
        return this;
    }

    build() {
        return this._population.sort((a, b) => (a.fitness < b.fitness ? 1 : -1));
    }

}
