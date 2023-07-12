module.exports = {
  extends: ['next', 'turbo', 'prettier'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  ignorePatterns: ['node_modules'],
  // rules: { semi: ['error', 'always'] },
  rules: {
    semi: ['error', 'always'],
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn'

    // '@typescript-eslint/semi': ['error', 'always'],
    // '@typescript-eslint/explicit-function-return-type': 'warn',
    // '@typescript-eslint/no-unused-vars': 'warn'
  },
  plugins: ['@typescript-eslint']
  // parserOptions: {
  //   babelOptions: {
  //     presets: [require.resolve('next/babel')]
  //   }
  // }
};
