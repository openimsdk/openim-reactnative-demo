const React = require('react');
const { View } = require('react-native');

const MockNativeView = props => React.createElement(View, props);

jest.mock('react-native-webview', () => ({
  __esModule: true,
  default: MockNativeView,
  WebView: MockNativeView,
}));

jest.mock('react-native-linear-gradient', () => ({
  __esModule: true,
  default: MockNativeView,
}));

jest.mock('react-native-image-picker', () => ({
  launchCamera: jest.fn(),
  launchImageLibrary: jest.fn(),
}));

jest.mock('react-native-localize', () => ({
  getLocales: () => [
    {
      countryCode: 'US',
      isRTL: false,
      languageCode: 'en',
      languageTag: 'en-US',
    },
  ],
}));
