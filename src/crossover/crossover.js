import generateIndividual from '../population/Individual';

export default function ({ features: features1, fitnessFunction }, { features: features2 }) {
    const fixCrossPoint = Math.round(Math.random() * (features1.length - 1));

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
