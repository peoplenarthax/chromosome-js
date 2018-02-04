import { AutoBuilder } from 'testier';

const sumReducer = (accumulator, currentValue) => accumulator + currentValue;
export default class IndividualBuilder extends AutoBuilder {

    static binaryIndividual(genes = [0b0, 0b1, 0b1, 0b0]) {
        return new IndividualBuilder()
            .withFeatures(genes)
            .build();
    }

    constructor() {
        super({
            features: [1, 2],
            fitness: 3,
            fitnessFunction: features => features.reduce(sumReducer, 0),
        });
    }

    generateWithFeatures(features) {
        this.features = features;
        this.fitness = this.fitnessFunction(features);
        return this;
    }

}
