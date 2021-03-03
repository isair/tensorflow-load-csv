module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: [
    'markdown',
    'import'
  ],
  extends: [
    'eslint:recommended',
    'plugin:json/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:sonarjs/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended', // Make sure this is always the last entry.
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-unused-vars': 'error',
    'import/default': 1,
    'import/no-useless-path-segments': [
      'error',
      {
        noUselessIndex: true,
      },
    ],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
      },
    ],
    'sonarjs/cognitive-complexity': ['error', 18],
  },
  overrides: [
    {
      files: ['tests/**/*.test.ts'],
      env: {
        jest: true,
      },
    },
  ],
};
