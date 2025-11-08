module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^config/(.*)$': '<rootDir>/config/$1',
  },
};
