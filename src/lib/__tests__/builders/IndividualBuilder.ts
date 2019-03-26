import { createBuilder } from '../../utils/builder/Builder'
export type Genome = any[] | { [k: string] : any}
export interface Individual {
    genome: Genome,
    fitness: number
}

export const IndividualBuilder = () =>
    createBuilder<Individual>({
        genome: [1, 2],
        fitness: 3,
    })
