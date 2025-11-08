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
  subtitle: {
    fontSize: 14,
    color: theme.colors.fontGray,
  },
  otpInputContainer: {
    marginTop: 20,
    width: '100%',
  },
  timeCountContainer: {
    marginTop: 7,
    width: '100%',
  },
  timeCount: {
    color: theme.colors.fontGray,
    fontSize: 14,
  },
});
