module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ["<rootDir>/build/", "<rootDir>/node_modules/"],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1'
    }
  };