import { AutoBuilder } from 'testier';

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
        });
    }

    generateWithFeatures(features) {
        this.features = features;
        return this;
    }

}
