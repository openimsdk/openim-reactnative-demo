import { StatusBar, Text, View } from 'react-native';
import { styles } from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import { useTranslation } from 'react-i18next';

export default function WorkbenchScreen() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <WorkbenchHeader />
      <WebView
        source={{ uri: t('workbench.index.webUrl') }}
        style={styles.webView}
      />
    </View>
  );
}

function WorkbenchHeader() {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  return (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <Text style={styles.headerTitle}>{t('workbench.index.title')}</Text>
    </View>
  );
}
