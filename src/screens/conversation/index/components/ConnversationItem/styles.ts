import { theme } from "@/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  contentPart: {
    flex: 1,
    alignSelf: 'stretch', // 在交叉轴（垂直方向）上拉伸，替代 height: '100%'
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  contentTop: {
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  contentBottom: {
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nickname: {
    fontSize: 17,
    color: theme.colors.fontBlack,
  },
  message: {
    flex: 1,
    fontSize: 14,
    color: theme.colors.fontGray,
    marginRight: 10,
  },
  time: {
    fontSize: 12,
    color: theme.colors.fontGray,
  },
  notAcceptIcon: {
    width: 14,
    height: 14,
    objectFit: 'contain',
  },
  topTag: {
    borderWidth: 6,
    borderColor: 'transparent',
    borderTopColor: theme.colors.primary,
    borderRightColor: theme.colors.primary,
    position: 'absolute',
    top: 0,
    right: 2,
  },
});