module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true,
  },

  extends: [
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
  ],

  parser: '@typescript-eslint/parser',

  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },

  plugins: ['@typescript-eslint', 'prettier'],

  rules: {
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/restrict-plus-operands': 'off',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    '@typescript-eslint/member-ordering': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/no-use-before-define': 'off',

    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
  },
}
