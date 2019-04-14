[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/ChromosomeJS/community)

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

- ```generateIndividual``` - Given a genotype and a fitness function it will return an evaluated individual
- ```generateIndividualWith``` - Returns a function that only requires a chromosome/genotype to get an individual
- ```generatePopulation``` - Given a genotype, fitness and a number of individuals it will create a first generation

#### Crossover

- ```onePointCrossover``` - Two individuals generate two offsprings by swapping values at a random point.
- ```twoPointCrossover``` - Same as one point crossover but with two points

#### Mutation

- ```flipMutation``` - Flips bit from true to false and viceversa
- ```intInRangeMutation``` - Generate a new integer within the genotype limits

#### Selection

- ```random``` - Get individuals randomly from the population
- ```best``` - Get X individuals from the best ones of the population
- ```worst``` - Get X individuals from the worst ones of the population
- ```tournament``` - Select N random individuals from the population and select the best one of those, will be done as many times as individuals are required.
- ```roulette``` - Choose individuals by the proportion of their fitness to the total fitness, so individuals with higher fitness have more chances to be selected.

### How to contribute?
You can help ChromosomeJS to extend the utils functions library, define a better API to interact with it or simply make a feature request. Just open an issue starting with ```[Utils]```.

---

## Chromosome Framework
__The framework is under development__
ChromosomeJS also makes easy to 'plug-n-play', so we just choose/define our genetic algorithm and it will take care of run it for you interacting through callbacks. It needs you to define the different cycle functions (Crossover, mutation...) and constants (probabilities, population and individual size...) and then just run your algorithm. 

### How to contribute?
To help ChromosomeJS offer a more performant framework, improve the API, extend it to fit other Evolutionary Algorithms you could start by opening an issue starting with ```[Framework]```.

---
