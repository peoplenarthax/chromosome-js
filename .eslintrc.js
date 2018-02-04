module.exports = {
    'extends': 'airbnb-base',
    'root': true,
    'env': {
        'browser': false,
        'es6': true,
    },
    'rules': {
        indent: ['error', 4, {
            SwitchCase: 1,
        }],
        'linebreak-style': 'off',
        'padded-blocks': [
            'error',
            {
                'blocks': 'never',
                'classes': 'always',
                'switches': 'never'
            }
        ],
        'max-len': [
            'error',
            120,
            4,
            {
                'ignoreUrls': true,
                'ignoreComments': false,
                'ignoreRegExpLiterals': true,
                'ignoreStrings': true,
                'ignoreTemplateLiterals': true
            }
        ],
        'no-underscore-dangle': [
            'error',
            {
                'allowAfterThis': true,
                'allowAfterSuper': false,
                'enforceInMethodNames': false
            }
        ],
        'no-use-before-define': [
            'error',
            {
                'functions': false
            }
        ],
        'no-bitwise': 0,
    },
    'overrides': [
        {
            'files': [
                '**/__tests__/**/*.spec.js'
            ],
            'env': {
                'browser': true,
                'jest': true
            },
            'rules': {
                'func-names': ['error', 'as-needed'],
            }
        }
    ]
}
