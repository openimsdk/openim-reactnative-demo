module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@': './src',
          'config': './config',
        },
      },
    ],
    'react-native-worklets/plugin',
    ["import", { libraryName: "@ant-design/react-native" }]
  ],
};
