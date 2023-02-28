module.exports = {
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  extends: ['srtp'],
  rules: {
    '@typescript-eslint/prefer-string-starts-ends-with': 'off',
    '@typescript-eslint/prefer-for-of': 'off',
    'no-undef': 'off',
    'prefer-template': 'off',
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
  },
}
