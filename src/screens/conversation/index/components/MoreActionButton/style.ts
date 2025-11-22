import { theme } from "@/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  moreWrap: {
    width: 28,
    height: 28,
  },
  moreIcon: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
  },
  floatWrap: {
    position: 'absolute',
    zIndex: 100,
  },
  actionList: {
    minWidth: 120,
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  actionListItem: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionListItemSeparator: {
    height: 1,
    backgroundColor: theme.colors.gray200,
    marginHorizontal: 12,
  },
  actionListItemIcon: {
    width: 20,
    height: 20,
    objectFit: 'contain',
  },
  actionListItemPressed: {
    opacity: 0.7,
  },
  actionListItemText: {
    fontSize: 16,
    color: theme.colors.fontBlack,
  },
})