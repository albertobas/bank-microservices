module.exports = {
  extends: ['standard-with-typescript', 'prettier'],
  env: {
    node: true,
    es6: true
  },
  ignorePatterns: 'node_modules',
  rules: {
    '@typescript-eslint/semi': ['error', 'always'],
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn'
  },
  parserOptions: {
    ecmaVersion: 'latest',
    project: 'tsconfig.json',
    sourceType: 'module',
    tsConfigRootDir: __dirname
  }
};
