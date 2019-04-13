module.exports = {
    resetMocks: true,
    rootDir: 'src',
    globals: {
        'ts-jest': {
            babelConfig: true,
        },
    },
    transform: {
        '^.+\\.js?$': 'babel-jest', // Adding this line solved the issue
        '^.+\\.ts?$': 'ts-jest',
    },
    moduleDirectories: [
        'node_modules',
        'src',
    ],
    collectCoverageFrom: [
        '**/*.js',
    ],
    coveragePathIgnorePatterns: [
        'src/index.js',
    ],
    coverageDirectory: '../coverage',
    testRegex: 'spec.ts$',

};
