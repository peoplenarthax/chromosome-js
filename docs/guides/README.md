# Guides
## Vocabulary

ChromesomeJS is a tool that helps you build Genetic Algorithms, so it is highly important to 
understand the different terms that are used both in the code and in this documentation.
To help you understand better these concepts here we provide a small vocabulary list.

__Genetic Algorithm__, is a method to solve optimization problems, 
it is a meta heuristic (in simple words, it transforms the optimization problem into a search problem and can not guarantee the best answer always)
and it is based on the natural selection of Darwin. A problem that we could solve is for example,
given a list of capitals (e.g EU Capitals), find the ones which are the cheapest to travel consecutively (Very helpful if you want to travel cheap and see different capitals).

__Genome__, in most of the other libraries or references this is also known as the individual. Code wise
it is list of values that are unique per individual (if 2 individuals have the same genome, they are the same individual).
For example, if my individual is a list of 3 capitals, each combination of 3 capitals could be a genome
["Madrid", "Berlin", "Paris"], ["Stockholm", "London", "Sofia"]...

__Genotype__, a function or dictionary of functions that can generate the genome for certain problem.
e.g: If all my individuals are made of a list of capitals, the genotype is a function that can give me a 
random capital within the possible values.

__Fitness__, it is a deterministic (for the same input it gives always the same output) function
that defines how good an individual solves a problem). Usually is the hardest part to define in a
Genetic Algorithm and is the one that tell us if our solutions are close (I use a spatial term here because we think 
about the problem as a space of solutions) to the best answer or not. For example, in our problem,
the fitness will take a genome (["Madrid", "Berlin", "Paris"]) calculate the price of the transport from
Madrid to Berlin, and from Berlin to Paris and the fitness will be the total price (since we consider a cheaper option better than the expensive one).

__Individual__, in `code` or as a type definition, an individual is an object with a fitness and a genome.

__Population__, a list of individuals.

__Crossover__, it could be understood as the reproduction method, or how 2 individuals can create new individuals
It is very helpful to continue "exploring" the existing solutions. For example, if the parents are
["Madrid", "Berlin", "Paris"] and ["Stockholm", "London", "Sofia"], and we perform a *one point cross over* 
over the first element the offspring (or new genomes) will be: ["Stockholm", "Berlin", "Paris"] and ["Madrid", "London", "Sofia"].

__Mutation__, sometimes natures randomly introduces new information in the existing population (an exagerated example could be
that humans, get wings). Following the capitals problem, a mutation is that ["Stockholm", "London", "Sofia"], becomes ["Bucharest", "London", "Sofia"].

__Selection__, as in Natural Selection, only the most fit to the environment could continue passing their genetic material
to the offspring or next generations. Codewise this would mean, that selection will tell us which individuals
will be part of the next iteration of our Genetic Algorithm.


## How to help documenting

Do you know about Genetic Algorithms and want to explain some concept? Are you eager to help us improve the language that we use? Do you have any doubt or something that we could make clearer? Please [open an issue](https://github.com/peoplenarthax/chromosome-js/issues) starting with ```[Documentation]```

Once you have started with the issue the next steps if you want to add something or update it in the existing documentation:

- Fork the repo ([How to fork the repo?](https://help.github.com/en/articles/fork-a-repo))
- Add / Update the files that exist within the `docs` directory.
- Create a Pull Request
