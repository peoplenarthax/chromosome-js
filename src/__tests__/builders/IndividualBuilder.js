import { AutoBuilder } from 'testier';

export default class IndividualBuilder extends AutoBuilder {

    static binaryIndividual(genes = [0b0, 0b1, 0b1, 0b0]) {
        return new IndividualBuilder()
            .withGenome(genes)
            .build();
    }

    constructor() {
        super({
            genome: [1, 2],
            fitness: 3,
        });
    }

    generatewithGenome(genome) {
        this.genome = genome;
        return this;
    }

}
