module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: 'standard-with-typescript',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'max-len': [
      'error',
      100,
      {
        ignoreComments: true
      }
    ],
    'max-lines': [
      'error',
      250
    ],
    'max-lines-per-function': [
      'error',
      {
        max: 20,
        skipBlankLines: true,
        skipComments: true
      }
    ],
    'max-params': [
      'error',
      4
    ]
  }
}
