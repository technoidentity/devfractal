module.exports = {
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  extends: ['srtp', 'plugin:storybook/recommended'],
  rules: {
    '@typescript-eslint/naming-convention': 'off',
    'unicorn/filename-case': 'off',
    'import/no-default-export': 'off',
  },
}
