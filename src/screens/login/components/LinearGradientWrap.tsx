import SafeAreaWrap from "@/components/SafeAreaWrap";
import { StatusBar, StyleProp, StyleSheet, ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";

interface LinearGradientWrapProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function LinearGradientWrap({ children, style }: LinearGradientWrapProps) {
  return (
    <LinearGradient 
      colors={['#e5f3ff', '#ffffff']} 
      start={{ x: 0, y: 0 }} 
      end={{ x: 0, y: 0.4 }} 
      style={{ flex: 1 }}
      locations={[0, 1]}
    >
      <StatusBar barStyle="dark-content" />
      <SafeAreaWrap style={[styles.container, style]}>
        {children}
      </SafeAreaWrap>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    paddingLeft: 32,
    height: '100%',
  },
});
