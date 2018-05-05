import Builder from '../utils/builder/Builder';

export default class AlgorithmConstants extends Builder {

    constructor() {
        super({
            maxNumberOfGenerations: 999,
            populationSize: 100,
            crossoverProbability: 0.2,
            mutationProbability: 0.25,
        });
    }

}
