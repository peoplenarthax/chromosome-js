# The API
## General

!> The API is being reviewed and this documentation under construction

The first version of the API was developed following the kind of 
APIs other functional libraries have (e.g Ramda). So it does not rely on
general variables, they do not have side effects and all of them return a value
always. One think to consider is that a lot of the methods in this API rely
heavily in randomness and hence they are not deterministic (may not return the
same value twice with the same input). Rather this functions are easy to compose.git s

?> If you do not understand something, maybe is better to take a look at the [Vocabulary](http://localhost:3000/#/guides/?id=vocabulary) first.
## Utils
__Utility library is still expanding for the first version__
ChromosomeJS offers a serie of utility functions to help out with different part of your Genetic Algorithm. 

#### Individual Generation and Population Generation

- ```generateIndividual | (genotype, fitness) => Individual``` - Given a genotype and a fitness function it will return an evaluated individual
- ```generateIndividualWith | (fitness) => (genome) => Individual``` - Returns a function that only requires a chromosome/genotype to get an individual
- ```generatePopulation``` - Given a genotype, fitness and a number of individuals it will create a first generation

#### Crossover
`(Genome, Genome) => [Genome, Genome]` - Crossover functions help us generate new individuals 
from existing ones, there are many ways of doing so, but it is important to remember, 2 parents will
generate 2 different offsprings (or new Genomes)

- ```onePointCrossover``` - Two individuals generate two offsprings by swapping values at a random point.
- ```twoPointCrossover``` - Same as one point crossover but with two points

#### Mutation
`(probability: number, Genome) => Genome` - Mutation function help us to find brand new individuals
from existing ones. It needs a normalized probability (between 0.0 - 1.0) to be passed 
and it will perform (or not), the defined mutation.

!> To make this a consistent API it is likely that the probability will be moved out
since we don't want it to be part of the mutation itself 

- ```flipMutation``` - Flips bit from true to false and viceversa
- ```intInRangeMutation``` - Generate a new integer within the genotype limits

#### Selection
`(amount: number, population: Individual[], options?) => Individual[]` - It returns a 
subset of size `amount` from the population. Since we do not want the same individuals to stay
in the population always and we need to perform the "natural" selection over the existing ones.

- ```random``` - Get individuals randomly from the population
- ```best``` - Get `amount` individuals from the best ones of the population
- ```worst``` - Get `amount` individuals from the worst ones of the population
- ```tournament - {tournamentSize: number, removeWinners: boolean }``` - Select `tournamentSize`
 random individuals from the population and select the best one of those, will be done `amount` times. If `removeWinners` is true, 
 the best individuals won't be selected more than once for a tournament.
- ```roulette``` - Choose individuals by the proportion of their fitness to the total fitness, so individuals with higher fitness have more chances to be selected.



