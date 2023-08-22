module.exports = {
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  extends: ['srtp'],
  rules: {
    'no-void': 'off',
    'import/no-default-export': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
  },
}
