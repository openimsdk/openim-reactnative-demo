import { theme } from "@/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.gray25,
    height: '100%'
  },
  topBg: {
    width: '100%',
  },
  topBgImage: {
    width: '100%',
  },
  mainContent: {
    paddingHorizontal: 16,
    marginTop: -(25 + 48/2),
  },
  userCard: {
    paddingHorizontal: 16,
    paddingVertical: 25,
    borderRadius: 6,
    backgroundColor: '#fff',
    marginBottom: 10,

    display: 'flex',
    flexDirection: 'row'
  },
  userCardContent: {
    marginLeft: 12,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.fontBlack,
  },
  userIdContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  userId: {
    fontSize: 14,
    color: theme.colors.fontGray,
  },
  copyIcon: {
    width: 16,
    height: 16,
  },
  itemContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },
  itemText: {
    fontSize: 17,
    color: theme.colors.fontBlack,
  },
  itemIcon: {
    width: 24,
    height: 24,
  },
});
