import randomInRange from '../utils/random/randomInRange';

export function onePointCrossOver({ genome: genome1 }, { genome: genome2 }) {
    const fixCrossPoint = randomInRange(genome1.length - 1);

    const genomeChild1 = [
        ...genome1.slice(0, fixCrossPoint),
        ...genome2.slice(fixCrossPoint),
    ];
    const genomeChild2 = [
        ...genome2.slice(0, fixCrossPoint),
        ...genome1.slice(fixCrossPoint),
    ];
    return [
        genomeChild1,
        genomeChild2,
    ];
}

export function twoPointCrossOver({ genome: genome1 }, { genome: genome2 }) {
    let fixCrossPoint1 = randomInRange(genome1.length - 1);
    let fixCrossPoint2 = randomInRange(genome1.length - 1);

    if (fixCrossPoint1 > fixCrossPoint2) {
        [fixCrossPoint1, fixCrossPoint2] = [fixCrossPoint2, fixCrossPoint1];
    } else if (fixCrossPoint1 === fixCrossPoint2) {
        if (fixCrossPoint2 === genome1.length - 1) {
            fixCrossPoint1 -= 1;
        } else if (fixCrossPoint2 === 0) {
            fixCrossPoint1 = 1;
            fixCrossPoint2 = 2;
        } else {
            fixCrossPoint2 += 1;
        }
    }

    const genomeChild1 = [
        ...genome1.slice(0, fixCrossPoint1),
        ...genome2.slice(fixCrossPoint1, fixCrossPoint2),
        ...genome1.slice(fixCrossPoint2),
    ];
    const genomeChild2 = [
        ...genome2.slice(0, fixCrossPoint1),
        ...genome1.slice(fixCrossPoint1, fixCrossPoint2),
        ...genome2.slice(fixCrossPoint2),
    ];
    return [
        genomeChild1,
        genomeChild2,
    ];
}
