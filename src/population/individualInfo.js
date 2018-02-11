export default function individualInfo(features) {
    return {
        features,
        toIndividualObject: individualArray => individualArray
            .reduce((individualObject, element, index) => ({
                ...individualObject,
                [features[index].name]: element,
            }), {}),

    };
}
