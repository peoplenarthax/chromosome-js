import { AutoBuilder } from 'testier';

export default class IndividualBuilder extends AutoBuilder {

    constructor() {
        super({
            features: {
                sideA: 1,
                sideB: 2,
            },
            fitness: 3,
        });
    }

}
