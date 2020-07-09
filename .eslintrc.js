module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "space-before-function-paren": 0,
    "indent": [2, 4],
    'indent': 'off',
    'key-spacing': 'off',
    'keyword-spacing': 'off',
    'space-before-blocks': 'off',
    'no-unused-vars': 'off',
    'spaced-comment': 'off',
    'eqeqeq': 'off',
    'no-useless-escape': 'off',
    'eol-last': 'off',
    'comma-spacing': 'off',
    'object-curly-spacing': 'off',
    'quotes': 'off',
    'semi': 'off',
    "no-trailing-spaces": 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
