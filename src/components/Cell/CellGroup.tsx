import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type CellGroupProps = {
  children: React.ReactNode;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
}

export function CellGroup({ children, borderRadius, style }: CellGroupProps) {
  return (
    <View style={[styles.container, { borderRadius }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});
