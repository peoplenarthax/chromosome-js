module.exports = {
    resetMocks: true,
    rootDir: 'src',
    moduleDirectories: [
        'node_modules',
        'src',
    ],
    collectCoverageFrom: [
        '**/__tests__/**/*.spec.js',
    ],
    testRegex: 'spec.js$',

};
