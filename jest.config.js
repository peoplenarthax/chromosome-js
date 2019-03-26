module.exports = {
    resetMocks: true,
    rootDir: 'src',
    transform: {
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
    testRegex: 'spec.{js|ts}$',

};
