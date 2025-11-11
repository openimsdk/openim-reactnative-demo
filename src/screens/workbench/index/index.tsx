import { StatusBar, Text, View } from "react-native";
import { styles } from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import WebView from "react-native-webview";

export default function WorkbenchScreen() {
  return (
    <View style={styles.container}>
      <WorkbenchHeader />
      <WebView source={{ uri: 'https://docs.openim.io/' }} style={{ flex: 1 }}/>
    </View>
  );
}

function WorkbenchHeader() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true}/>
      <Text style={styles.headerTitle}>工作台</Text>
    </View>
  );
}
