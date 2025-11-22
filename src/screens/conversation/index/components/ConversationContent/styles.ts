import { theme } from "@/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: theme.colors.gray25,
  },
  contentContainer: {
    flexGrow: 1, // for ios scroll bounce effect
  },
});