import { createBuilder } from '../../src/utils/builder'
import { Individual } from '../../src/lib/population';

export const IndividualBuilder = () =>
    createBuilder<Individual>({
        genome: [1, 2],
        fitness: 3,
    })
