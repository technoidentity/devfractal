module.exports = {
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  extends: ['srtp'],
  rules: {
    'no-console': 'off',
    '@typescript-eslint/unbound-method': 'off',
  },
}
