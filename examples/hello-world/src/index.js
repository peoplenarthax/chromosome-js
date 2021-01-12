"use strict";
exports.__esModule = true;
var chromosome_js_1 = require("chromosome-js");
var printPopulationData = function (population, generationNumber) {
    console.log("----- Generation number:" + generationNumber + " -----");
    console.log('BEST INDIVIDUAL:\n', population[0].genome.join(''));
    console.log(population[0].fitness);
};
var randomChar = function () { return String.fromCharCode(chromosome_js_1.randomInRange(0, 255)); }; //32. 130 reduced space
var generateRandomStringOf = function (amount) { return function () { return Array.from({ length: amount }, randomChar); }; };
var STRING_GOAL = 'chromosome-js'.split('');
// Genotypes creates a blueprint function for generating individuals
var genotype = generateRandomStringOf(STRING_GOAL.length);
// Fitness is a function that can evaluate the result of the genotype
var fitness = function (goal) { return function (gene) {
    var total = 0;
    for (var i = 0; i < gene.length; i += 1) {
        total += Math.abs(gene[i].charCodeAt(0) - goal[i].charCodeAt(0));
    }
    return -total;
}; };
var flipCharMutation = function (mutationProbability, gene) {
    if (Math.random() > mutationProbability) {
        return gene;
    }
    var newGenome = Array.from(gene);
    var index = Math.floor(Math.random() * gene.length);
    var upOrDown = Math.random() <= 0.5 ? -1 : 1;
    var newChar = String.fromCharCode(gene[index].charCodeAt(0) + upOrDown);
    newGenome[index] = newChar;
    return newGenome;
};
var config = {
    populationSize: 200,
    mutationProbability: 0.2,
    crossoverProbability: 0.4,
    individualValidation: false,
    generations: 9999,
    preventUIBlock: true,
    endCondition: function (_a) {
        var first = _a[0];
        return first.genome.join('') === STRING_GOAL.join('');
    }
};
chromosome_js_1.GARunner({
    seed: genotype,
    fitness: fitness(STRING_GOAL),
    mutation: flipCharMutation,
    crossover: chromosome_js_1.onePointCrossOver,
    selection: chromosome_js_1.selectRoulette,
    config: config,
    hooks: {
        onGeneration: printPopulationData
    }
});
