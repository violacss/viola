module.exports = {
  verbose: true,
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: './coverage/',
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
  },
}
