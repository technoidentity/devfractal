module.exports = {
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  extends: ['srtp'],
  rules: {
    'import/no-default-export': 'off',
  },
}
