import { theme } from "@/styles/theme";
import { StyleSheet, Text, TextProps } from "react-native";

export function CellText({ children, ...props }: TextProps) {
  return (
    <Text style={styles.cellText} {...props}>{children}</Text>
  );
}

const styles = StyleSheet.create({
  cellText: {
    fontSize: 17,
    color: theme.colors.fontBlack,
  }
});