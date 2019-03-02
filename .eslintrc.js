module.exports = {
  'extends': [
    'react-app',
    'prettier',
  ],
  'globals': {
    'jest': true,
    'expect': true,
    'it': true,
    'describe': true,
    'mount': true,
    'shallow': true,
  },
  'env': {
    'browser': true,
    'node': true
  },
  'plugins': [
    'babel',
    'react',
    'prettier',
  ],
  'rules': {
    'react/forbid-prop-types': [
      0
    ]
  }
}