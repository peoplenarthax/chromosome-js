import { AutoBuilder } from 'testier';

export default class IndividualBuilder extends AutoBuilder {

    constructor() {
        super({
            features: [1, 2],
            fitness: 3,
        });
    }

}
