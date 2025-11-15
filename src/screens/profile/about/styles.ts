import { theme } from "@/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginVertical: 8,
    marginHorizontal: 12,
    paddingVertical: 24,
    borderRadius: 6,

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: {
    width: 'auto',
    height: 75,
    aspectRatio: 78 / 55,
    objectFit: 'contain',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 17,
    color: theme.colors.fontBlack,
    fontWeight: 'semibold',
  },
});
