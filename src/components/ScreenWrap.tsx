import { theme } from "@/styles/theme";
import Header, { HeaderProps } from "./Header";
import SafeAreaWrap from "./SafeAreaWrap";
import { StyleSheet, View } from "react-native";

type ScreenWrapProps = {
  children: React.ReactNode;
  headerShown?: boolean;
  header?: HeaderProps;
}

export default function ScreenWrap(props: ScreenWrapProps) {
  const { 
    children,
    headerShown = true,
    header
  } = props;

  return (
    <View>
      {headerShown && <Header {...header} />}
      <SafeAreaWrap insets={headerShown ? ['horizontal', 'bottom'] : ['all']} style={styles.container}>
        {children}
      </SafeAreaWrap>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.gray25,
    height: '100%',
  },
});