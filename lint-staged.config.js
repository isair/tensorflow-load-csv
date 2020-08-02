module.exports = {
  '*.{js,ts,json}': ['eslint --fix', 'jest --findRelatedTests'],
  '*.md': 'eslint --fix',
};
