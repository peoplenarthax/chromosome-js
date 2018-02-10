import generateIndividual from '../population/Individual';
import randomInRange from '../utils/random/randomInRange';

export function onePointCrossOver(fitnessFunction, { features: features1 }, { features: features2 }) {
    const fixCrossPoint = randomInRange(features1.length - 1);

    const featuresChild1 = [
        ...features1.slice(0, fixCrossPoint),
        ...features2.slice(fixCrossPoint),
    ];
    const featuresChild2 = [
        ...features2.slice(0, fixCrossPoint),
        ...features1.slice(fixCrossPoint),
    ];
    return [
        generateIndividual(featuresChild1, fitnessFunction),
        generateIndividual(featuresChild2, fitnessFunction),
    ];
}

export function twoPointCrossOver(fitnessFunction, { features: features1 }, { features: features2 }) {
    let fixCrossPoint1 = randomInRange(features1.length - 1);
    let fixCrossPoint2 = randomInRange(features1.length - 1);

    if (fixCrossPoint1 > fixCrossPoint2) {
        [fixCrossPoint1, fixCrossPoint2] = [fixCrossPoint2, fixCrossPoint1];
    } else if (fixCrossPoint1 === fixCrossPoint2) {
        if (fixCrossPoint2 === features1.length - 1) {
            fixCrossPoint1 -= 1;
        } else if (fixCrossPoint2 === 0) {
            fixCrossPoint1 = 1;
            fixCrossPoint2 = 2;
        } else {
            fixCrossPoint2 += 1;
        }
    }

    const featuresChild1 = [
        ...features1.slice(0, fixCrossPoint1),
        ...features2.slice(fixCrossPoint1, fixCrossPoint2),
        ...features1.slice(fixCrossPoint2),
    ];
    const featuresChild2 = [
        ...features2.slice(0, fixCrossPoint1),
        ...features1.slice(fixCrossPoint1, fixCrossPoint2),
        ...features2.slice(fixCrossPoint2),
    ];
    return [
        generateIndividual(featuresChild1, fitnessFunction),
        generateIndividual(featuresChild2, fitnessFunction),
    ];
}
