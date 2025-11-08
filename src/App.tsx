import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './navigation';
import { Provider as AntDesignProvider } from '@ant-design/react-native';
import { ToastProvider } from './components/Toast';
// Initialize i18n
import '@/i18n';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <AntDesignProvider>
        <ToastProvider>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={'transparent'}/>
          <Navigation />
        </ToastProvider>
      </AntDesignProvider>
    </SafeAreaProvider>
  );
}

export default App;
