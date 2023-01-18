module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@next/next/recommended',
  ],
  parserOptions: {
    project: 'tsconfig.json',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: ['next/core-web-vitals', 'plugin:@typescript-eslint/recommended'],
  rules: {
    '@typescript-eslint/consistent-type-imports': 'warn',
  },
}
