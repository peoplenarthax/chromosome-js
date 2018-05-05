const withMethods = /with([A-Z]).*/;
const generatedMethods = prop => !withMethods.test(prop);
const toKeyValueTupleWithValuesFrom = obj => prop => [prop, obj[prop]];
const fromTupleToObject = (obj, [key, value]) => ({
    ...obj,
    [key]: value,
});

function withFunctionFor(prop) {
    return function withFunc(value) {
        this[prop] = value;
        return this;
    };
}

// TASK: Small version of testier Builder, change for BuilderWithRequire
export default class Builder {

    constructor(initialProps) {
        if (typeof (initialProps) !== 'object' || Object.keys(initialProps).length === 0) {
            throw new TypeError('You must pass an object to the constructor');
        }

        Object.assign(this, initialProps);

        Object.keys(initialProps).forEach((prop) => {
            const [initialLetter, ...rest] = prop;
            const funcName = `${initialLetter.toUpperCase()}${rest.join('')}`;

            this[`with${funcName}`] = withFunctionFor(prop).bind(this);
        });
    }

    build() {
        const realProps = Object.keys(this)
            .filter(generatedMethods)
            .map(toKeyValueTupleWithValuesFrom(this))
            .reduce(fromTupleToObject, {});

        return realProps;
    }

}
