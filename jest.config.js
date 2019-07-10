const glob = require('glob')
const rootPaths = glob.sync('packages/*')

module.exports = {
  verbose: true,
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: './coverage/',
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
  },
  roots: rootPaths,
}
