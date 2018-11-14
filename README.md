# Chromosome-js [WIP]
In progress: Adding basic tools.

A small library to help those curious to develop their own genetic algorithms. Eventhoug it is though to be use in the browser the future is to have 2 different packages in depend of where you want to execute them.

# Utils

ChromosomeJS offers a serie of utility functions to help out with different part of your Genetic Algorithm. The library has to be extended but as it is right now it has the following (To extend with Input and Output definitions):

### Individual Generation and Population Generation

- ```generateIndividual``` - Given a genotype and a fitness function it will return an evaluated individual
- ```generateIndividualWith``` - Returns a function that only requires a chromosome/genotype to get an individual
- ```generatePopulation``` - Given a genotype, fitness and a number of individuals it will create a first generation

### Crossover

- ```onePointCrossover``` - Two individuals generate two offsprings by swapping values at a random point.
- ```twoPointCrossover``` - Same as one point crossover but with two points

### Mutation

- ```flipMutation``` - Flips bit from true to false and viceversa
-```intInRangeMutation``` - Generate a new integer within the genotype limits

### Selection

-```random``` - Get individuals randomly from the population
-```best``` - Get X individuals from the best ones of the population
-```worst``` - Get X individuals from the worst ones of the population
-```tournament``` - Select N random individuals from the population and will select the best one of those, will be done as many times as individuals are required.
-```roulette``` - Choose individuals by the proportion of their fitness to the total fitness, so individuals with higher fitness have more chances to be selected.

## Generic Genetic Algorithm (To Be Defined How)

ChromosomeJS also makes easy to 'plug-n-play', so we just choose/define our genetic algorithm and it will take care of run it for you interacting through callbacks. 


# Final purpose

ChromosomeJS is a way of empowering developers to strugle the less possible with the development of Genetic Algorithms or have easier time when comparing different algorithms.
There is a lot of work in progress in defining a good API that at the same time gives the developer flexibility to extend but not tying them up. 

