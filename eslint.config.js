const { defineConfig, globalIgnores } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const globals = require('globals');

module.exports = defineConfig([
  globalIgnores(['dist/*', 'ios/*', 'android/*']),
  expoConfig,
  {
    files: ['__tests__/**/*.{js,jsx,ts,tsx}', 'jest.setup.js'],
    languageOptions: {
      globals: globals.jest,
    },
  },
  {
    rules: {
      // Animated.Value and other React Native mutable handles are intentionally
      // stored in refs and read while constructing native style props.
      'react-hooks/refs': 'off',
      // Existing controlled inputs synchronize external values in effects.
      'react-hooks/set-state-in-effect': 'off',
    },
  },
]);
