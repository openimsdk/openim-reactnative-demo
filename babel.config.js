module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './src',
            config: './config',
          },
        },
      ],
      ['import', { libraryName: '@ant-design/react-native' }],
      'react-native-worklets/plugin',
    ],
  };
};
