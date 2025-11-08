import { theme } from "@/styles/theme";
import { PixelRatio, StyleSheet } from "react-native";

const fontScale = PixelRatio.getFontScale();

export const styles = StyleSheet.create({
  inputItem: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    color: theme.colors.fontGray,
    fontSize: 14,
    marginBottom: 6,
  },
  inputContainer: {
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#E8EAEF',
    borderRadius: 8,

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputContent: {
    paddingVertical: 9,
    flex: 1,
  },
  input: {
    fontSize: 16,
    // Calculate the height of the input box based on the font size and font scale
    // RN's fontSize can automatically calculate the height based on the system font size,
    // but other properties will not, so we need to manually calculate.
    height: 24 * fontScale, 
    padding: 0,
  },
  inputRight: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteContainer: {
    position: 'absolute',
    bottom: 0,
    transform: [{ translateY: 18 }],
  },
  errorText: {
    color: theme.colors.danger,
    fontSize: 12,
  },
  noteText: {
    color: theme.colors.fontGray,
    fontSize: 12,
  },
});

export const clearIconStyles = StyleSheet.create({
  clearIcon: {
    width: 24,
    height: 24,
  },
});
