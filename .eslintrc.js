module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    indent: [2, 2],
    'no-tabs': 'off',
    'no-multiple-empty-lines': ['error', { max: 2 }],
    'no-param-reassign': [2, { props: false }],
  },
};
