/* eslint-disable @typescript-eslint/no-var-requires */
const scopes = require('./commitlint.scopes');

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-empty': [2, 'never'],
    'scope-enum': [2, 'always', scopes],
    'subject-case': [2, 'always', ['sentence-case']],
  },
};
