const withMethods = /with([A-Z]).*/;
const requiredMethod = prop => prop.startsWith('*');
const generatedMethodsAndRequiredFields = prop => (!withMethods.test(prop) && !requiredMethod(prop));
const toKeyValueTupleWithValuesFrom = obj => prop => [prop, obj[prop]];
const fromTupleToObject = (obj, [key, value]) => ({
    ...obj,
    [key]: value,
});

function containsAllElements(superset, subset) {
    if (subset.length === 0) {
        return true;
    }
    return subset.every(value => (superset.indexOf(value) >= 0));
}

function withFunctionFor(prop) {
    return function withFunc(value) {
        this[prop] = value;
        return this;
    };
}

export default class Builder {

    constructor(initialProps) {
        if (typeof (initialProps) !== 'object' || Object.keys(initialProps).length === 0) {
            throw new TypeError('You must pass an object to the constructor');
        }

        Object.assign(this, initialProps);
        this['*requiredFields'] = [];

        Object.keys(initialProps).forEach((prop) => {
            let propertyName = prop;
            if (requiredMethod(propertyName)) {
                propertyName = propertyName.substring(1);
                this['*requiredFields'].push(propertyName);
            }
            const [initialLetter, ...rest] = propertyName;

            const funcName = `${initialLetter.toUpperCase()}${rest.join('')}`;

            this[`with${funcName}`] = withFunctionFor(propertyName).bind(this);
        });
    }

    build() {
        const realProps = Object.keys(this)
            .filter(generatedMethodsAndRequiredFields)
            .map(toKeyValueTupleWithValuesFrom(this))
            .reduce(fromTupleToObject, {});

        if (!containsAllElements(Object.keys(realProps), this['*requiredFields'])) {
            throw TypeError('You must specify in the builder all the required fields');
        }

        return realProps;
    }

}
