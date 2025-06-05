module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-underscore-dangle': 'off',
    'max-len': ['error', { code: 120 }],
    'no-param-reassign': 'off',
    'linebreak-style': ['error', 'windows'],
    'consistent-return': 'off',
    'object-curly-newline': ['error', { consistent: true }],
    'prefer-const': ['error', { destructuring: 'all' }],
    'import/newline-after-import': ['error', { count: 1 }],
  },
};
