import { flipMutation } from '../mutation/mutation';
import { selectRoulette } from '../selection/selection';
import Builder from '../utils/builder/Builder';

const noop = () => {};
export class AlgorithmConstants extends Builder {

    constructor() {
        super({
            maxNumberOfGenerations: 999,
            populationSize: 100,
            crossoverProbability: 0.2,
            mutationProbability: 0.25,
        });
    }

}

export class GeneticCycleFunctions extends Builder {

    constructor() {
        super({
            '*fitness': noop,
            '*genotype': noop,
            exitCondition: ({ constants, generationNumber }) => (generationNumber === constants.maxNumberOfGenerations),
            selection: selectRoulette,
            muutation: flipMutation,
            afterGeneration: null,
            beforeGeneration: null,
            geneticAlgorithmDidFinish: null,
        });
    }

}
