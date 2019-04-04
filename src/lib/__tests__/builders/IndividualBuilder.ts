import { createBuilder } from '../../utils/builder/Builder'
import {Individual} from '@/lib/population/individual';

export const IndividualBuilder = () =>
    createBuilder<Individual>({
        genome: [1, 2],
        fitness: 3,
    })
