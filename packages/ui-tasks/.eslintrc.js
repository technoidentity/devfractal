module.exports = {
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  extends: ['srtp'],
  rules: {
    'unicorn/filename-case': 'off',
    '@typescript-eslint/naming-convention': 'off',
  },
}
