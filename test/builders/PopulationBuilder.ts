import { createBuilder } from "../../utils/builder/Builder";
import {Individual, IndividualBuilder} from "./IndividualBuilder";


export const PopulationBuilder = () =>
    createBuilder<{ population : Individual[]}>({
        population: [
            IndividualBuilder().fitness(3).build(),
            IndividualBuilder().fitness(2).build(),
            IndividualBuilder().fitness(1).build()
        ]
    })

export const generatePopulationWithIndividuals = ( amount : number ) => {
    let population : Individual[] = []
    let fitness = amount;
    for (let k = 0; k < amount; k++) { // eslint-disable-line no-plusplus
        population.push(IndividualBuilder()
            .fitness(fitness--) // eslint-disable-line no-plusplus
            .build());
    }

    return PopulationBuilder().population(population).build()
}
