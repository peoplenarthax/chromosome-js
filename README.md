![npm bundle size (version)](https://img.shields.io/bundlephobia/minzip/chromosome-js/0.5.0)

# ChromosomeJS 🐒

A small library to help curious people to develop their own Genetic Algorithms. 

General
======

ChromosomeJS has arrived to the town to help you develop in a easier / faster-paced way your own [Genetic Algorithms](https://en.wikipedia.org/wiki/Genetic_algorithm). In order to achieve this goals, this open-project try to help you in 3 different ways: 
- Learn what is a Genetic Algorithm and how does an implementation look by bringing good [documentation](#documentation), references and clear examples. 
- Having a serie of [utility functions](#utils) so you do not have to implement from zero things like [Tournament selection](https://en.wikipedia.org/wiki/Tournament_selection) or [Cycle Crossover](https://www.hindawi.com/journals/cin/2017/7430125/). 
- Providing a [framework](#chromosome-framework) so you just worry about implementing the different operations within the [Genetic Algorithm cycle](https://cdn-images-1.medium.com/max/1600/1*HP8JVxlJtOv14rGLJfXEzA.png).

## Documentation
__The documentation is under development__

An essential part of ChromosomeJS is to help people understand better Genetic Algorithms by example. The documentation does not exclusively aim to cover the developer API but also to offer a nice introduction to genetic algorithms, present the library through examples and contain references to good sources of information.

### How to contribute?
Do you know about Genetic Algorithms and want to explain some concept? Are you eager to help us improve the language that we use? Do you have any doubt or something that we could make clearer? Please open an issue starting with ```[Documentation]```

---

## Utils
__Utility library is still expanding for the first version__
ChromosomeJS offers a serie of utility functions to help out with different part of your Genetic Algorithm. 

#### Individual Generation and Population Generation

- ```generateIndividual - (genotype: Genotype, fitnessFunction: FitnessFunction): Individual``` - Given a genotype and a fitness function it will return an evaluated individual
- ```generateIndividualWith - (fitness: FitnessFunction): IndividualGenerator``` - Returns a function that only requires a chromosome/genotype to get an individual
- ```generatePopulation -  (genotype: Genotype, fitness: FitnessFunction, size: number) => Individual[]``` - Given a genotype, fitness and a number of individuals it will create a first generation

#### Crossover `CrossoverFunction = (genome1: Genome, genome2: Genome) => [Genome, Genome]`

- ```xPointCrossover - (x: number) => CrossoverFunction``` - Create X amount of fixed points and swap values between 2 individuals 
- ```onePointCrossover - CrossoverFunction``` - Two individuals generate two offsprings by swapping values at a random point.
- ```twoPointCrossover - CrossoverFunction``` - Same as one point crossover but with two points

#### Mutation `MutationFunction = (probability: number, genome: Genome) => Genome`

- ```flipMutation - MutationFunction``` - Flips bit from true to false and viceversa
- ```intInRangeMutation - MutationFunction``` - Generate a new integer within the genotype limits

#### Selection `SelectionFunction = (amount: number, population: Individual[], options?: object) : Individual[]`

- ```selectRandom``` - Get individuals randomly from the population
- ```selectBest``` - Get X individuals from the best ones of the population
- ```selectWorst``` - Get X individuals from the worst ones of the population
- ```selectByTournament - `options: {tournamentSize}` ``` - Select N random individuals from the population and select the best one of those, will be done as many times as individuals are required.
- ```selectRoulette``` - Choose individuals by the proportion of their fitness to the total fitness, so individuals with higher fitness have more chances to be selected.

### How to contribute?
You can help ChromosomeJS to extend the utils functions library, define a better API to interact with it or simply make a feature request. Just open an issue starting with ```[Utils]```.

---

## Chromosome Framework
__The framework is under development__
ChromosomeJS also makes easy to 'plug-n-play', so we just choose/define our genetic algorithm and it will take care of run it for you interacting through callbacks. It needs you to define the different cycle functions (Crossover, mutation...) and constants (probabilities, population and individual size...) and then just run your algorithm. Right now there is a very rough implementation that does not consider many aspects. The plan is to try to abstract it to being able to run it on a Worker, abstract you from your types and complex operations reducing it to array operations, make it more efficient for node and browser environments.

### Genetic Algorithm Class

The Genetic Algorithm will instanciate a new Genetic Algorithm (you specify seed, mutation, crossover, fitness, selection), the meta parameters (probabilities, population size, options for the selectors...) and hooks (onGeneration). It enables you to do a simple step using your parameters.
### Runner
Runner is just an abstraction on top of genetic algorithm that helps you run your GA Class asynchronously (specially thought for the browser) until it meets certain conditions (number of generations).

### How to contribute?
To help ChromosomeJS offer a more performant framework, improve the API, extend it to fit other Evolutionary Algorithms you could start by opening an issue starting with ```[Framework]```.

---
