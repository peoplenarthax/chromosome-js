module.exports = {
    resetMocks: true,
    rootDir: 'src',
    moduleDirectories: [
        'node_modules',
        'src',
    ],
    collectCoverageFrom: [
        '**/*.{js,jsx}',
    ],
    coveragePathIgnorePatterns: [
        'src/index.js',
    ],
    coverageDirectory: '../coverage',
    testRegex: 'spec.js$',

};
