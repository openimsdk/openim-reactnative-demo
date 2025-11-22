import { theme } from "@/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrap: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  errorWrap: {
    backgroundColor: theme.colors.dangerLight,
  },
  loadingWrap: {
    backgroundColor: theme.colors.primaryLight,
  },
  text: {},
  errorText: {
    color: theme.colors.danger,
  },
  loadingText: {
    color: theme.colors.primary,
  },
  icon: {
    width: 12,
    height: 12,
    objectFit: 'contain',
  },
})
