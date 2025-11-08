import { theme } from "@/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  titleContainer: {
    paddingVertical: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  formContainer: {
    gap: 30,
  },
  buttonContainer: {
    marginTop: 24,
  },
});
