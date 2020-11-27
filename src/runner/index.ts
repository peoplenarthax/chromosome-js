/** 
 * The runner has the purpose of automating the evolution lifecycles.
 * if you need to hook to different parts or change the algorithm
 * you can overwrite the step method in GeneticAlgorithm class
 */

import { GeneticAlgorithm, GeneticAlgorithmConstructor } from './GeneticAlgorithm'

 export const GARunner = async <T>(parameters: GeneticAlgorithmConstructor<T>) => {
	const geneticAlgorithm = new GeneticAlgorithm(parameters)

	for (let i = 0; i < parameters.config.generations; i++) {
		/*
		*	We rather use setTimeout over promises due to problems with
		* 	promises being continuosly solve block the miniTask queue preventing
		*	macro task queue (like UI) from working
		*/
		setTimeout(() => geneticAlgorithm.step(), 0)
	}
 }