

const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
const crossover_1 = require('./lib/crossover/crossover');

exports.onePointCrossOver = crossover_1.onePointCrossOver;
exports.twoPointCrossOver = crossover_1.twoPointCrossOver;
const mutation_1 = require('./lib/mutation/mutation');

exports.flipMutation = mutation_1.flipMutation;
const individual_1 = require('./lib/population/individual');

exports.generateIndividual = individual_1.generateIndividual;
exports.generateIndividualWith = individual_1.generateIndividualWith;
const population_1 = __importDefault(require('./lib/population/population'));

exports.generatePopulation = population_1.default;
const selection_1 = require('./lib/selection/selection');

exports.selectRandom = selection_1.selectRandom;
exports.selectBest = selection_1.selectBest;
exports.selectWorst = selection_1.selectWorst;
exports.selectByTournament = selection_1.selectByTournament;
exports.selectRoulette = selection_1.selectRoulette;
exports.selectPopulation = selection_1.selectPopulation;
// # sourceMappingURL=index.js.map
